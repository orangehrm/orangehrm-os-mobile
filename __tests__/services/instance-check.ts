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
  checkInstanceCompatibility,
  isApiCompatible,
} from 'services/instance-check';

describe('services/instance-check', () => {
  test('checkInstanceCompatibility::check correct', () => {
    const result = checkInstanceCompatibility({version: '2.4.0'});
    expect(result).toBeTruthy();
  });

  test('checkInstanceCompatibility::check with incompatible OrangeHRM API version', () => {
    expect(() => {
      checkInstanceCompatibility({version: '2.1.0'});
    }).toThrow('Incompatible OrangeHRM API version.');
  });

  test('isApiCompatible::check incompatible', () => {
    const result = isApiCompatible('1.1.0', '1.2.0');
    expect(result).toBeFalsy();
  });

  test('isApiCompatible::check compatible', () => {
    let result = isApiCompatible('1.2.0', '1.2.0');
    expect(result).toBeTruthy();
    result = isApiCompatible('1.3.0', '1.2.0');
    expect(result).toBeTruthy();
  });
});
