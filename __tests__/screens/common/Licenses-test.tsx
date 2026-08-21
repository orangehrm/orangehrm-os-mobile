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

import 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-native-testing-library';
import configureStore from 'store/configureStore';
import Licenses, {
  splitLicenseText,
  toLicenseRows,
  getLicenseRows,
  LicenseManifest,
} from 'screens/common/Licenses';

const mockStore = configureStore();

const manifest = {
  texts: {
    aaaaaaaaaaaa: 'MIT license text',
    bbbbbbbbbbbb: 'ISC license text',
  },
  packages: [
    {
      name: 'first-library',
      version: '1.0.0',
      license: 'MIT',
      licenseFile: 'LICENSE',
      licenseTextId: 'aaaaaaaaaaaa',
      licenseTextSource: 'license-file',
      repository: 'https://github.com/example/first-library',
    },
    {
      name: 'second-library',
      version: '2.0.0',
      license: 'ISC',
      licenseFile: 'LICENSE.md',
      licenseTextId: 'bbbbbbbbbbbb',
      licenseTextSource: 'license-file',
      repository: null,
    },
    {
      name: 'third-library',
      version: '3.0.0',
      license: 'MIT',
      licenseFile: null,
      licenseTextId: null,
      licenseTextSource: 'spdx-id-only',
      repository: null,
    },
  ],
} as LicenseManifest;

describe('screens/common/Licenses::splitLicenseText', () => {
  const text = 'first line\nsecond line\nthird line\n';

  test('test splitLicenseText::joins back to exactly the original string', () => {
    expect(splitLicenseText(text, 5).join('')).toBe(text);
  });

  test('test splitLicenseText::cuts only at newline boundaries', () => {
    splitLicenseText(text, 5)
      .slice(0, -1)
      .forEach((chunk) => {
        expect(chunk.endsWith('\n')).toBe(true);
      });
  });

  test('test splitLicenseText::returns a single chunk for short text', () => {
    expect(splitLicenseText(text, 1000)).toEqual([text]);
  });

  test('test splitLicenseText::does not split text without a newline', () => {
    expect(splitLicenseText('one single line', 4)).toEqual(['one single line']);
  });

  test('test splitLicenseText::falls back to the default chunk size', () => {
    expect(splitLicenseText(text, 0)).toEqual([text]);
  });

  test('test splitLicenseText::returns nothing for absent text', () => {
    expect(splitLicenseText('')).toEqual([]);
    expect(splitLicenseText(null)).toEqual([]);
  });
});

describe('screens/common/Licenses::toLicenseRows', () => {
  let consoleError: jest.SpyInstance;

  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  test('test toLicenseRows::maps a healthy manifest into rows', () => {
    expect(toLicenseRows(manifest)).toEqual([
      {
        name: 'first-library',
        license: 'MIT',
        licenseText: 'MIT license text',
      },
      {
        name: 'second-library',
        license: 'ISC',
        licenseText: 'ISC license text',
      },
      {name: 'third-library', license: 'MIT', licenseText: null},
    ]);
    expect(consoleError).not.toHaveBeenCalled();
  });

  test('test toLicenseRows::empty list instead of a crash on a malformed manifest', () => {
    expect(toLicenseRows({} as LicenseManifest)).toEqual([]);
    expect(consoleError).toHaveBeenCalled();
  });

  test('test toLicenseRows::reports an unresolved licenseTextId', () => {
    const rows = toLicenseRows({
      texts: {},
      packages: manifest.packages,
    } as LicenseManifest);

    expect(rows.map((row) => row.licenseText)).toEqual([null, null, null]);
    expect(consoleError).toHaveBeenCalledTimes(2);
  });
});

describe('screens/common/Licenses', () => {
  test('test Licenses::discloses the committed manifest', () => {
    const rows = getLicenseRows();
    const {queryAllByText} = render(
      <Provider store={mockStore}>
        <Licenses />
      </Provider>,
    );

    expect(rows.length).toBeGreaterThan(0);
    // Only initialNumToRender rows are laid out up front, the rest arrive as the list is scrolled
    // and paged. A licence text can be shared by several packages, so a match is expected once or
    // more, never exactly once.
    rows.slice(0, 5).forEach((row) => {
      expect(queryAllByText(row.name).length).toBeGreaterThan(0);
      expect(
        queryAllByText(
          row.licenseText === null
            ? 'License text not provided by this library'
            : row.licenseText,
        ).length,
      ).toBeGreaterThan(0);
    });
  });

  test('test Licenses::every committed package carries a license', () => {
    getLicenseRows().forEach((row) => {
      expect(typeof row.license).toBe('string');
      expect(row.license).not.toHaveLength(0);
    });
  });
});
