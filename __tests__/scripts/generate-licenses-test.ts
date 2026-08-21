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

import {
  isShipped,
  pickLicenseFileName,
  hashLicenseText,
  normalizeRepository,
  normalizeSpdxId,
  buildManifest,
  serializeManifest,
  diffManifests,
} from '../../scripts/generate-licenses';

const MIT_TEXT = 'MIT License\n\nCopyright (c) 2020 Example\n';
const ISC_TEXT = 'ISC License\n\nCopyright (c) 2020 Example\n';

const record = (name: string, licenseText: string | null) => ({
  name: name,
  version: '1.0.0',
  license: licenseText === MIT_TEXT ? 'MIT' : 'ISC',
  licenseFile: licenseText === null ? null : 'LICENSE',
  licenseText: licenseText,
  repository: `https://github.com/example/${name}`,
});

describe('scripts/generate-licenses', () => {
  test('test isShipped::excludes only the listed packages, by exact name', () => {
    expect(isShipped('@jest/globals')).toBe(false);
    expect(isShipped('@jest/globals-extra')).toBe(true);
    expect(isShipped('react-native')).toBe(true);
  });

  test('test pickLicenseFileName::picks by precedence, case insensitively', () => {
    expect(pickLicenseFileName(['README.md', 'license.md', 'LICENSE'])).toBe(
      'LICENSE',
    );
    expect(pickLicenseFileName(['LICENCE.txt', 'LICENSE.md'])).toBe(
      'LICENSE.md',
    );
    expect(pickLicenseFileName(['README.md', 'package.json'])).toBeNull();
  });

  test('test hashLicenseText::is a 12 hex character digest of the exact bytes', () => {
    expect(hashLicenseText(MIT_TEXT)).toMatch(/^[0-9a-f]{12}$/);
    expect(hashLicenseText(MIT_TEXT)).toBe(hashLicenseText(MIT_TEXT));
    expect(hashLicenseText(MIT_TEXT)).not.toBe(hashLicenseText(`${MIT_TEXT} `));
  });

  test('test normalizeRepository/normalizeSpdxId::accept both package.json shapes', () => {
    expect(normalizeRepository('git+https://example.com/a.git')).toBe(
      'git+https://example.com/a.git',
    );
    expect(normalizeRepository({url: 'https://example.com/b.git'})).toBe(
      'https://example.com/b.git',
    );
    expect(normalizeRepository(undefined)).toBeNull();
    expect(normalizeSpdxId('MIT')).toBe('MIT');
    expect(normalizeSpdxId({type: 'ISC'})).toBe('ISC');
    expect(normalizeSpdxId(undefined)).toBeNull();
  });

  test('test buildManifest::sorts packages and shares one text between identical licenses', () => {
    const manifest = buildManifest([
      record('zeta', MIT_TEXT),
      record('alpha', MIT_TEXT),
      record('beta', ISC_TEXT),
    ]);

    expect(
      manifest.packages.map((entry: {name: string}) => entry.name),
    ).toEqual(['alpha', 'beta', 'zeta']);
    expect(Object.keys(manifest.texts)).toHaveLength(2);
    expect(manifest.packages[0].licenseTextId).toBe(
      manifest.packages[2].licenseTextId,
    );
    expect(manifest.texts[manifest.packages[0].licenseTextId]).toBe(MIT_TEXT);
  });

  test('test buildManifest::is order independent', () => {
    const records = [
      record('alpha', MIT_TEXT),
      record('beta', ISC_TEXT),
      record('zeta', MIT_TEXT),
    ];
    expect(serializeManifest(buildManifest(records))).toBe(
      serializeManifest(buildManifest([...records].reverse())),
    );
  });

  test('test buildManifest::a package without a license file carries no text', () => {
    const manifest = buildManifest([record('alpha', null)]);

    expect(manifest.packages[0].licenseTextId).toBeNull();
    expect(manifest.packages[0].licenseTextSource).toBe('spdx-id-only');
    expect(Object.keys(manifest.texts)).toHaveLength(0);
  });

  test('test diffManifests::reports added, removed and changed packages', () => {
    const committed = buildManifest([
      record('kept', MIT_TEXT),
      record('removed', MIT_TEXT),
      record('changed', MIT_TEXT),
    ]);
    const generated = buildManifest([
      record('kept', MIT_TEXT),
      record('changed', ISC_TEXT),
      record('added', ISC_TEXT),
    ]);

    expect(diffManifests(committed, generated)).toEqual({
      added: ['added'],
      removed: ['removed'],
      changed: ['changed'],
    });
  });

  test('test diffManifests::an unchanged manifest reports nothing', () => {
    const manifest = buildManifest([record('alpha', MIT_TEXT)]);
    expect(diffManifests(manifest, manifest)).toEqual({
      added: [],
      removed: [],
      changed: [],
    });
  });
});
