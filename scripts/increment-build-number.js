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
    return console.eror(error);
    /* eslint-enable no-console */
  }

  const regex = /ORANGEHRM_VERSION_CODE=.+\n/g;
  const versionCodeMatchs = gradleProperties.match(regex);
  let versionCodeStr = versionCodeMatchs[0];
  versionCodeStr = versionCodeStr.replace(/\n/g, '');
  versionCodeStr = versionCodeStr.replace('ORANGEHRM_VERSION_CODE=', '');
  const versionCode = parseInt(versionCodeStr, 10);

  const updatedGradleProperties = gradleProperties.replace(
    regex,
    `ORANGEHRM_VERSION_CODE=${versionCode + 1}\n`,
  );

  fs.writeFile(gradlePropertiesPath, updatedGradleProperties, 'utf8', (err) => {
    if (err) {
      /* eslint-disable no-console */
      return console.eror(err);
      /* eslint-enable no-console */
    }

    /* eslint-disable no-console */
    console.log(
      `Successfully increment Android build number to ${versionCode + 1}`,
    );
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
    return console.eror(error);
    /* eslint-enable no-console */
  }

  const regex = /CURRENT_PROJECT_VERSION = .+\n/g;
  const versionCodeMatchs = projectpbxproj.match(regex);
  let versionCodeStr = versionCodeMatchs[0];
  versionCodeStr = versionCodeStr.replace(/;\n/g, '');
  versionCodeStr = versionCodeStr.replace('CURRENT_PROJECT_VERSION = ', '');
  const versionCode = parseInt(versionCodeStr, 10);

  const projectpbxprojUpdated = projectpbxproj.replace(
    regex,
    `CURRENT_PROJECT_VERSION = ${versionCode + 1};\n`,
  );

  fs.writeFile(projectpbxprojPath, projectpbxprojUpdated, 'utf8', (err) => {
    if (err) {
      /* eslint-disable no-console */
      return console.eror(err);
      /* eslint-enable no-console */
    }

    /* eslint-disable no-console */
    console.log(
      `Successfully increment iOS build number to ${versionCode + 1}`,
    );
    /* eslint-enable no-console */
  });
});
