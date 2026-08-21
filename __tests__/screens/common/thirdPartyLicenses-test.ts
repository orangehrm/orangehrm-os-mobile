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

import manifest from 'screens/common/data/thirdPartyLicenses.json';
import {compareByCodeUnit} from '../../../scripts/generate-licenses';

const PACKAGE_KEYS = [
  'name',
  'version',
  'license',
  'licenseFile',
  'licenseTextId',
  'licenseTextSource',
  'repository',
];

describe('committed thirdPartyLicenses.json', () => {
  test('test manifest::holds exactly the texts and packages keys', () => {
    expect(Object.keys(manifest).sort()).toEqual(['packages', 'texts']);
  });

  test('test manifest::every package record has the expected keys', () => {
    expect(manifest.packages.length).toBeGreaterThan(0);
    manifest.packages.forEach((licensePackage) => {
      expect(Object.keys(licensePackage).sort()).toEqual(
        [...PACKAGE_KEYS].sort(),
      );
      expect(licensePackage.name.length).toBeGreaterThan(0);
      expect(licensePackage.version.length).toBeGreaterThan(0);
    });
  });

  test('test manifest::every licenseTextId resolves to a non empty text', () => {
    const texts: {[key: string]: string} = manifest.texts;
    manifest.packages.forEach((licensePackage) => {
      if (licensePackage.licenseTextId !== null) {
        expect(typeof texts[licensePackage.licenseTextId]).toBe('string');
        expect(texts[licensePackage.licenseTextId].length).toBeGreaterThan(0);
      }
    });
  });

  test('test manifest::licenseTextSource follows the license file', () => {
    manifest.packages.forEach((licensePackage) => {
      if (licensePackage.licenseFile === null) {
        expect(licensePackage.licenseTextId).toBeNull();
        expect(licensePackage.licenseTextSource).toBe('spdx-id-only');
      } else {
        expect(licensePackage.licenseTextSource).toBe('license-file');
        expect(licensePackage.licenseTextId).not.toBeNull();
      }
    });
  });

  test('test manifest::packages are sorted by name', () => {
    const names = manifest.packages.map(
      (licensePackage) => licensePackage.name,
    );
    expect(names).toEqual([...names].sort(compareByCodeUnit));
  });

  test('test manifest::text ids are 12 hex character hashes', () => {
    Object.keys(manifest.texts).forEach((id) => {
      expect(id).toMatch(/^[0-9a-f]{12}$/);
    });
  });

  test('test manifest::no text is orphaned', () => {
    const referenced = new Set(
      manifest.packages
        .map((licensePackage) => licensePackage.licenseTextId)
        .filter((id) => id !== null),
    );
    Object.keys(manifest.texts).forEach((id) => {
      expect(referenced.has(id)).toBe(true);
    });
  });
});
