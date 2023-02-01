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
import {getDateString, getDatesWithinPeriod} from 'lib/helpers/date';

describe('lib/helpers/date', () => {
  test('getDateString::check get YYYY-MM-DD date string from date object', () => {
    const date = new Date('2020-07-14');
    const result = getDateString(date);
    expect(result).toBe('2020-07-14');
  });

  test('getDatesWithinPeriod::check get dates within given period', () => {
    const date1 = new Date('2020-07-14');
    const date2 = new Date('2020-07-17');
    let result = getDatesWithinPeriod(date1, date2);
    expect(result.length).toBe(4);

    const jsonStr =
      '["2020-07-14T00:00:00.000Z","2020-07-15T00:00:00.000Z","2020-07-16T00:00:00.000Z","2020-07-17T00:00:00.000Z"]';
    expect(JSON.stringify(result)).toBe(jsonStr);

    result = getDatesWithinPeriod(date2, date1);
    expect(JSON.stringify(result)).toBe(jsonStr);
  });
});
