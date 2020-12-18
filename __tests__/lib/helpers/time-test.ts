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
import {getDateFromString} from 'lib/helpers/time';

describe('lib/helpers/time', () => {
  test('getDateFromString::check date object from time string', () => {
    const date1 = getDateFromString('11:15');
    const date2 = getDateFromString('12:30');

    expect(date1.getHours()).toBe(date2.getHours() - 1);
    expect(date1.getMinutes()).toBe(date2.getMinutes() - 15);
  });
});
