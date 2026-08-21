/*
 * This file is part of OrangeHRM
 *
 * Copyright (C) 2020 onwards OrangeHRM (https://www.orangehrm.com/)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * Builds the third party license manifest rendered by the Licenses screen.
 *
 * `yarn licenses:generate` writes src/screens/common/data/thirdPartyLicenses.json,
 * `yarn licenses:check` fails when the committed manifest no longer matches the
 * installed dependencies, so a dependency change cannot ship without its
 * attribution.
 */

/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const projectRoot = process.cwd();
const manifestPath = path.join(
  projectRoot,
  'src',
  'screens',
  'common',
  'data',
  'thirdPartyLicenses.json',
);

// Ordered by precedence, matched case-insensitively against the files a package ships.
const CANDIDATE_LICENSE_FILES = [
  'LICENSE',
  'LICENSE.md',
  'LICENSE.txt',
  'LICENCE',
  'LICENCE.md',
  'LICENCE.txt',
];

// Declared in package.json#dependencies but shipped in neither the JS bundle nor either native
// build, so no attribution is owed for them:
//
//   @jest/globals - the jest assertion API, misfiled into dependencies rather than
//                   devDependencies. Verified 2026-08-21: nothing under src/ or __tests__/
//                   imports it, and the package ships no android/, ios/ or .podspec.
//
// Careful when adding to this list: absent from the JS bundle is NOT the same as absent from the
// app. A package can contribute no JS and still ship native code, so verify against the native
// builds too, never the bundle alone.
const NOT_SHIPPED_PACKAGES = ['@jest/globals'];

// Exact-name match only, so a differently named package is never caught by a prefix.
const isShipped = (name) => !NOT_SHIPPED_PACKAGES.includes(name);

// Plain code-unit comparator, never localeCompare, which is locale dependent and would order
// names differently across machines.
const compareByCodeUnit = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

// Picks the highest precedence license-like filename from a package folder's file list.
// Deterministic on case-sensitive filesystems where both 'LICENSE' and 'license' could exist.
const pickLicenseFileName = (fileNames) => {
  const byLowercase = new Map();
  [...fileNames].sort(compareByCodeUnit).forEach((name) => {
    const lower = name.toLowerCase();
    if (!byLowercase.has(lower)) {
      byLowercase.set(lower, name);
    }
  });

  const candidate = CANDIDATE_LICENSE_FILES.find((licenseFile) =>
    byLowercase.has(licenseFile.toLowerCase()),
  );
  return candidate === undefined
    ? null
    : byLowercase.get(candidate.toLowerCase());
};

// The stored license text stays byte identical to the file it was read from, so nothing here
// trims, re-wraps, strips a BOM or converts line endings. The hash is taken over those exact
// bytes, which is what lets two packages shipping the same license share one entry in `texts`.
const hashLicenseText = (rawText) =>
  crypto
    .createHash('sha256')
    .update(rawText, 'utf8')
    .digest('hex')
    .slice(0, 12);

const normalizeRepository = (repositoryField) => {
  if (typeof repositoryField === 'string') {
    return repositoryField;
  }
  if (repositoryField && typeof repositoryField.url === 'string') {
    return repositoryField.url;
  }
  return null;
};

const normalizeSpdxId = (licenseField) => {
  if (typeof licenseField === 'string') {
    return licenseField;
  }
  if (licenseField && typeof licenseField.type === 'string') {
    return licenseField.type;
  }
  return null;
};

/**
 * Builds the {texts, packages} manifest. Order independent: packages are sorted and license texts
 * are deduplicated by a digest of their exact bytes, so the same dependencies always produce the
 * same file.
 */
const buildManifest = (records) => {
  const sortedRecords = [...records].sort((a, b) => {
    const byName = compareByCodeUnit(a.name, b.name);
    return byName !== 0 ? byName : compareByCodeUnit(a.version, b.version);
  });

  const textsById = new Map();
  const packages = sortedRecords.map((record) => {
    let licenseTextId = null;
    let licenseTextSource = 'spdx-id-only';

    if (record.licenseFile) {
      licenseTextId = hashLicenseText(record.licenseText);
      licenseTextSource = 'license-file';
      if (!textsById.has(licenseTextId)) {
        textsById.set(licenseTextId, record.licenseText);
      }
    }

    return {
      name: record.name,
      version: record.version,
      license: record.license,
      licenseFile: record.licenseFile,
      licenseTextId: licenseTextId,
      licenseTextSource: licenseTextSource,
      repository: record.repository,
    };
  });

  const texts = {};
  [...textsById.keys()].sort(compareByCodeUnit).forEach((id) => {
    texts[id] = textsById.get(id);
  });

  return {texts: texts, packages: packages};
};

const serializeManifest = (manifest) =>
  JSON.stringify(manifest, null, 2) + '\n';

/**
 * Returns the package names that were added, removed or changed between two manifests. No
 * normalization on either side, so a license file that changes only its line endings is a real
 * reported change.
 */
const diffManifests = (committedManifest, generatedManifest) => {
  const committedByName = new Map(
    committedManifest.packages.map((committedPackage) => [
      committedPackage.name,
      committedPackage,
    ]),
  );
  const generatedByName = new Map(
    generatedManifest.packages.map((generatedPackage) => [
      generatedPackage.name,
      generatedPackage,
    ]),
  );

  const added = [];
  const removed = [];
  const changed = [];

  generatedByName.forEach((generatedPackage, name) => {
    if (!committedByName.has(name)) {
      added.push(name);
    }
  });

  committedByName.forEach((committedPackage, name) => {
    if (!generatedByName.has(name)) {
      removed.push(name);
      return;
    }

    const generatedPackage = generatedByName.get(name);
    const fieldChanged = [
      'version',
      'license',
      'licenseFile',
      'licenseTextId',
      'licenseTextSource',
      'repository',
    ].some((field) => committedPackage[field] !== generatedPackage[field]);

    const committedText = committedPackage.licenseTextId
      ? committedManifest.texts[committedPackage.licenseTextId]
      : null;
    const generatedText = generatedPackage.licenseTextId
      ? generatedManifest.texts[generatedPackage.licenseTextId]
      : null;

    if (fieldChanged || committedText !== generatedText) {
      changed.push(name);
    }
  });

  return {
    added: added.sort(compareByCodeUnit),
    removed: removed.sort(compareByCodeUnit),
    changed: changed.sort(compareByCodeUnit),
  };
};

const formatDiffSummary = (diff) => {
  const lines = [];
  if (diff.added.length) {
    lines.push(`  added:   ${diff.added.join(', ')}`);
  }
  if (diff.removed.length) {
    lines.push(`  removed: ${diff.removed.join(', ')}`);
  }
  if (diff.changed.length) {
    lines.push(`  changed: ${diff.changed.join(', ')}`);
  }
  return lines.join('\n');
};

const readDirectDependencyNames = (root, fsLike = fs) => {
  const packageJson = JSON.parse(
    fsLike.readFileSync(path.join(root, 'package.json'), 'utf8'),
  );
  return Object.keys(packageJson.dependencies || {});
};

/**
 * Reads one package's installed metadata and license file. Returns null (and logs) when the
 * package is not installed, so one missing package cannot abort the whole run. `fsLike` is the
 * only injection seam in this file, which keeps this function unit testable.
 */
const collectPackageRecord = (root, name, fsLike = fs) => {
  const packageDirectory = path.join(root, 'node_modules', name);
  const packageJsonPath = path.join(packageDirectory, 'package.json');

  if (!fsLike.existsSync(packageJsonPath)) {
    console.error(`Package not installed, skipping: ${name}`);
    return null;
  }

  const packageJson = JSON.parse(fsLike.readFileSync(packageJsonPath, 'utf8'));
  const fileNames = fsLike
    .readdirSync(packageDirectory, {withFileTypes: true})
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);
  const licenseFile = pickLicenseFileName(fileNames);

  return {
    name: name,
    version: packageJson.version,
    license: normalizeSpdxId(packageJson.license),
    licenseFile: licenseFile,
    licenseText: licenseFile
      ? fsLike.readFileSync(path.join(packageDirectory, licenseFile), 'utf8')
      : null,
    repository: normalizeRepository(packageJson.repository),
  };
};

/**
 * Collects every named package's record. Throws, rather than silently dropping, when a declared
 * dependency is not installed: an attribution manifest must never quietly shrink. Every offender
 * is named so one `yarn install` fixes them all.
 */
const collectPackageRecords = (root, names, fsLike = fs) => {
  const records = [];
  const missing = [];

  names.filter(isShipped).forEach((name) => {
    const record = collectPackageRecord(root, name, fsLike);
    if (record === null) {
      missing.push(name);
    } else {
      records.push(record);
    }
  });

  if (missing.length) {
    throw new Error(
      `Declared dependencies are not installed: ${missing.join(
        ', ',
      )}. Run \`yarn install\` first.`,
    );
  }
  return records;
};

const generateManifest = ({
  root = projectRoot,
  outPath = manifestPath,
  fsLike = fs,
} = {}) => {
  let records;
  try {
    records = collectPackageRecords(
      root,
      readDirectDependencyNames(root, fsLike),
      fsLike,
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
    return;
  }

  const manifest = buildManifest(records);

  fsLike.mkdirSync(path.dirname(outPath), {recursive: true});
  fsLike.writeFileSync(outPath, serializeManifest(manifest), 'utf8');

  console.log(
    `Wrote ${manifest.packages.length} package(s), ${
      Object.keys(manifest.texts).length
    } distinct license text(s) to ${outPath}`,
  );
};

const checkManifest = ({
  root = projectRoot,
  outPath = manifestPath,
  fsLike = fs,
} = {}) => {
  if (!fsLike.existsSync(outPath)) {
    console.error(`Third party license manifest not found: ${outPath}`);
    console.error('Run `yarn licenses:generate` to create it.');
    process.exitCode = 1;
    return;
  }

  let committedManifest;
  try {
    committedManifest = JSON.parse(fsLike.readFileSync(outPath, 'utf8'));
  } catch (error) {
    console.error(`Third party license manifest is not valid JSON: ${outPath}`);
    console.error(error.message);
    process.exitCode = 1;
    return;
  }

  let records;
  try {
    records = collectPackageRecords(
      root,
      readDirectDependencyNames(root, fsLike),
      fsLike,
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
    return;
  }

  const generatedManifest = buildManifest(records);

  if (
    serializeManifest(committedManifest) ===
    serializeManifest(generatedManifest)
  ) {
    console.log(
      `License manifest is up to date (${generatedManifest.packages.length} packages).`,
    );
    return;
  }

  const diff = diffManifests(committedManifest, generatedManifest);
  if (diff.added.length || diff.removed.length || diff.changed.length) {
    console.error('Third party license manifest is out of date:');
    console.error(formatDiffSummary(diff));
  } else {
    console.error(
      'Third party license manifest content is equivalent, but its serialized form differs.',
    );
  }
  console.error('Run `yarn licenses:generate` to refresh it.');
  process.exitCode = 1;
};

const main = () => {
  if (process.argv.includes('--check')) {
    checkManifest();
  } else {
    generateManifest();
  }
};

module.exports = {
  CANDIDATE_LICENSE_FILES,
  NOT_SHIPPED_PACKAGES,
  isShipped,
  compareByCodeUnit,
  pickLicenseFileName,
  hashLicenseText,
  normalizeRepository,
  normalizeSpdxId,
  buildManifest,
  serializeManifest,
  diffManifests,
  formatDiffSummary,
  readDirectDependencyNames,
  collectPackageRecord,
  collectPackageRecords,
  generateManifest,
  checkManifest,
  main,
};

if (require.main === module) {
  main();
}

/* eslint-enable no-console */
