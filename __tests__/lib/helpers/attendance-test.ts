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
import {
  getDateSaveFormatFromDateObject,
  getUTCDateObjectFromSaveFormat,
  calculateDurationBasedOnTimezone,
  NEGATIVE_DURATION,
  formatLastRecordDetails,
} from 'lib/helpers/attendance';

describe('lib/helpers/attendance', () => {
  test('getDateSaveFormatFromDateObject:: check YYYY-MM-DD HH:mm', () => {
    let strDate = '2020-07-14 10:35';
    let date = new Date(strDate);
    let result = getDateSaveFormatFromDateObject(date);
    expect(result).toBe(strDate);

    strDate = '2020-07-14 23:59';
    date = new Date(strDate);
    result = getDateSaveFormatFromDateObject(date);
    expect(result).toBe(strDate);
  });

  test('getUTCDateObjectFromSaveFormat', () => {
    let strDate = '2020-07-14 10:35';
    let result = getUTCDateObjectFromSaveFormat(strDate);
    expect(result).toStrictEqual(new Date(strDate));

    strDate = '2020-07-14 23:35:00';
    result = getUTCDateObjectFromSaveFormat(strDate);
    expect(result).toStrictEqual(new Date(strDate));

    strDate = '2020-07-14 24:35';
    result = getUTCDateObjectFromSaveFormat(strDate);
    expect(result.toString()).toBe('Invalid Date');
  });

  test('calculateDurationBasedOnTimezone', () => {
    let result = calculateDurationBasedOnTimezone(
      '2020-12-21 02:12:00',
      '2020-12-21 17:15',
      -2,
      -11,
    );
    expect(result).toBe('24:03');

    result = calculateDurationBasedOnTimezone(
      '2020-12-21 02:12',
      '2020-12-21 20:15',
      4,
      -11,
    );
    expect(result).toBe('33:03');

    result = calculateDurationBasedOnTimezone(
      '2020-12-21 02:12',
      '2020-12-22 20:59',
      4,
      5,
    );
    expect(result).toBe('41:47');

    result = calculateDurationBasedOnTimezone(
      '2020-12-21 02:12',
      '2020-12-21 01:15',
      5.5,
      5.5,
    );
    expect(result).toBe(NEGATIVE_DURATION);
  });
  test('getDateSaveFormatFromDateObject::check get YYYY-MM-DD hh:mm datetime string from Date object', () => {
    const date = new Date('2020-07-14T21:48');
    const result = getDateSaveFormatFromDateObject(date);
    expect(result).toBe('2020-07-14 21:48');
  });

  test('getUTCDateObjectFromSaveFormat::check get Date object from YYYY-MM-DD hh:mm datetime string', () => {
    const date = new Date('2020-07-14T21:48');
    const dateString = '2020-07-14 21:48';
    const result = getUTCDateObjectFromSaveFormat(dateString);
    expect(result).toStrictEqual(date);
  });

  test('formatLastRecordDetails::check get Time difference between YYYY-MM-DD hh:mm datetime strings', () => {
    const dateString = '2020-07-14 21:48';
    const timezoneOffset = '5.5';
    const result = formatLastRecordDetails(dateString, timezoneOffset);
    expect(result).toBe('July 14, 2020 9:48 PM (GMT+5.5)');
  });
});
