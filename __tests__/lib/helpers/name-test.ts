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
import {getNameLetters} from 'lib/helpers/name';

describe('lib/helpers/name', () => {
  test('with first name', () => {
    const result = getNameLetters('Employee');
    expect(result).toBe('E');
  });

  test('with first and last name', () => {
    const result = getNameLetters('Employee Name');
    expect(result).toBe('EN');
  });

  test('with full name', () => {
    const result = getNameLetters('Employee Full Name');
    expect(result).toBe('EN');
  });

  test('name with more spaces', () => {
    const result = getNameLetters('Employee  Name');
    expect(result).toBe('EN');
  });
});
