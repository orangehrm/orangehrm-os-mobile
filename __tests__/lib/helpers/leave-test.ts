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
  assignColorToLeaveType,
  assignColorsToLeaveTypes,
  isSingleDayRequest,
  isMultipleDayRequest,
  getTimeValuesForSlider,
  isFromTimeLessThanToTime,
} from 'lib/helpers/leave';

describe('lib/helpers/leave', () => {
  test('assignColorToLeaveType::check leave type with id 1', () => {
    const leaveType = {
      id: 1,
      name: 'Test Leave Type',
      deleted: false,
    };
    const resultLeaveType = assignColorToLeaveType({leaveType});
    expect(resultLeaveType).toStrictEqual({
      leaveType: {
        ...leaveType,
        color: '#4ece68',
      },
    });
  });

  test('assignColorToLeaveType::check leave type first color', () => {
    const leaveType = {
      id: 10,
      name: 'Test Leave Type',
      deleted: false,
    };
    const resultLeaveType = assignColorToLeaveType({leaveType});
    expect(resultLeaveType).toStrictEqual({
      leaveType: {
        ...leaveType,
        color: '#445abf',
      },
    });
  });

  test('assignColorsToLeaveTypes::assign leave type color in array', () => {
    const leaveType = {
      name: 'Test Leave Type',
      deleted: false,
    };
    const leaveTypeArray = [
      {leaveType: {id: 10, ...leaveType}},
      {leaveType: {id: 9, ...leaveType}},
    ];
    const resultLeaveTypes = assignColorsToLeaveTypes(leaveTypeArray);
    expect(resultLeaveTypes).toStrictEqual([
      {
        leaveType: {
          ...leaveType,
          id: 10,
          color: '#445abf',
        },
      },
      {
        leaveType: {
          ...leaveType,
          id: 9,
          color: '#405040',
        },
      },
    ]);
  });

  test('isSingleDayRequest::check leave request single day by dates', () => {
    let result = isSingleDayRequest('2020-07-14', '2020-07-14');
    expect(result).toBeTruthy();
    result = isSingleDayRequest('2020-07-14', '2020-07-15');
    expect(result).toBeFalsy();
    result = isSingleDayRequest('2020-07-14', undefined);
    expect(result).toBeTruthy();
    result = isSingleDayRequest(undefined, undefined);
    expect(result).toBeFalsy();
  });

  test('assignColorToLeaveType::check leave request single day by dates', () => {
    let result = isMultipleDayRequest('2020-07-14', '2020-07-15');
    expect(result).toBeTruthy();
    result = isMultipleDayRequest('2020-07-14', '2020-07-14');
    expect(result).toBeFalsy();
    result = isMultipleDayRequest('2020-07-14', undefined);
    expect(result).toBeFalsy();
    result = isMultipleDayRequest('2020-07-16', '2020-07-14');
    expect(result).toBeFalsy();
  });

  test('getTimeValuesForSlider::check time values for slider', () => {
    const result = getTimeValuesForSlider();
    expect(result.length).toBe(96);
    expect(result[0]).toBe('00:00');
    expect(result[result.length - 1]).toBe('23:45');
  });

  test('isFromTimeLessThanToTime::check from time less than to time', () => {
    let result = isFromTimeLessThanToTime('11:15', '11:30');
    expect(result).toBeTruthy();
    result = isFromTimeLessThanToTime('11:45', '11:30');
    expect(result).toBeFalsy();
  });
});
