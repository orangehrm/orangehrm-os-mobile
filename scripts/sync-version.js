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

const version = require('../package.json').version;
const semver = require('semver');
const fs = require('fs');
const path = require('path');
const gradlePropertiesPath = path.join(
  __dirname,
  '..',
  'android/gradle.properties',
);

fs.readFile(gradlePropertiesPath, 'utf8', (error, gradleProperties) => {
  if (error) {
    /* eslint-disable no-console */
    return console.error(error);
    /* eslint-enable no-console */
  }

  let updatedGradleProperties = gradleProperties.replace(
    /ORANGEHRM_VERSION_NAME=.+\n/g,
    `ORANGEHRM_VERSION_NAME=${version}\n`,
  );

  const debug = process.argv[2];
  if (debug) {
    // The greatest value Google Play allows for versionCode is 2100000000.
    // https://developer.android.com/studio/publish/versioning
    const uniqueVersionCode =
      parseInt(Date.now().toString().slice(0, -3), 10) - 1595397950;
    updatedGradleProperties = updatedGradleProperties.replace(
      /ORANGEHRM_VERSION_CODE=.+\n/g,
      `ORANGEHRM_VERSION_CODE=${uniqueVersionCode}\n`,
    );
  }

  fs.writeFile(gradlePropertiesPath, updatedGradleProperties, 'utf8', (err) => {
    if (err) {
      /* eslint-disable no-console */
      return console.error(err);
      /* eslint-enable no-console */
    }

    /* eslint-disable no-console */
    console.log(`Successfully synced Android version name to ${version}`);
    /* eslint-enable no-console */
  });
});

const projectpbxprojPath = path.join(
  __dirname,
  '..',
  'ios/OrangeHRM.xcodeproj/project.pbxproj',
);

fs.readFile(projectpbxprojPath, 'utf8', (error, projectpbxproj) => {
  if (error) {
    /* eslint-disable no-console */
    return console.error(error);
    /* eslint-enable no-console */
  }

  // iOS does not support prerelease tags
  const iOSVer = semver.coerce(version).version;
  const projectpbxprojUpdated = projectpbxproj.replace(
    /MARKETING_VERSION = .+\n/g,
    `MARKETING_VERSION = ${iOSVer};\n`,
  );

  fs.writeFile(projectpbxprojPath, projectpbxprojUpdated, 'utf8', (err) => {
    if (err) {
      /* eslint-disable no-console */
      return console.error(err);
      /* eslint-enable no-console */
    }

    /* eslint-disable no-console */
    console.log(`Successfully synced iOS version name to ${iOSVer}`);
    /* eslint-enable no-console */
  });
});
