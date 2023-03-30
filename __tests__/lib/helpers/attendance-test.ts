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
  formatTimezoneOffset,
  convertDateObjectToStringFormat,
  calculateWorkData,
  calculateGraphData,
  getAttendanceRecordsOfTheSelectedDate,
  getLeaveRecordsOfTheSelectedDate,
  getHolidayRecordsOfTheSelectedDate,
  getWorkWeekResultOfTheSelectedDate,
  getDurationFromHours,
  getWeekdayOrder,
  formatTime,
} from 'lib/helpers/attendance';
import moment from 'moment';
import {
  WorkWeekType,
  WORK_WEEK_FULL,
  WORK_WEEK_HALF,
} from 'store/leave/common-screens/types';
import {LeaveStatus} from 'store/leave/leave-usage/types';

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
    expect(result).toStrictEqual(new Date('2020-07-14T10:35Z'));

    strDate = '2020-07-14 23:35:00';
    result = getUTCDateObjectFromSaveFormat(strDate);
    expect(result).toStrictEqual(new Date('2020-07-14T23:35:00Z'));

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

  test('formatLastRecordDetails', () => {
    const dateString = '2020-07-14 21:48';
    const timezoneOffset = '5.5';
    const result = formatLastRecordDetails(dateString, timezoneOffset);
    expect(result).toBe('July 14, 2020 9:48 PM (GMT+5.5)');
  });

  test('formatTimezoneOffset', () => {
    const timezoneOffset = '5.5';
    const result = formatTimezoneOffset(timezoneOffset);
    expect(result).toBe('  (GMT+5.5)');
  });

  test('convertDateObjectToStringFormat', () => {
    const dateObject = moment('2020-05-20 07:40');
    const format = 'ddd';
    const result = convertDateObjectToStringFormat(dateObject, format);
    expect(result).toBe('Wed');
  });

  test('calculateWorkData', () => {
    const graphRecordsInputData = {
      totalWorkHours: 35.86,
      totalLeaveHours: 6.5,
      totalLeaveTypeHours: [
        {
          typeId: '2',
          type: 'Medical',
          hours: '6.50',
        },
      ],
      workSummary: {
        sunday: {
          workHours: '0',
          leave: [],
        },
        monday: {
          workHours: '0',
          leave: [],
        },
        tuesday: {
          workHours: '0',
          leave: [
            {
              typeId: '2',
              type: 'Medical',
              hours: '2.50',
            },
          ],
        },
        wednesday: {
          workHours: '29.28',
          leave: [
            {
              typeId: '2',
              type: 'Medical',
              hours: '4.00',
            },
          ],
        },
        thursday: {
          workHours: '3.78',
          leave: [],
        },
        friday: {
          workHours: '1.88',
          leave: [],
        },
        saturday: {
          workHours: '0.92',
          leave: [],
        },
      },
    };
    const startDayIndex = 1;
    const result = calculateWorkData(graphRecordsInputData, startDayIndex);
    expect(result).toStrictEqual([
      {x: 'Mo', y: 0},
      {x: 'Tu', y: 0},
      {x: 'We', y: 29.28},
      {x: 'Th', y: 3.78},
      {x: 'Fr', y: 1.88},
      {x: 'Sa', y: 0.92},
      {x: 'Su', y: 0},
    ]);
  });

  test('calculateGraphData', () => {
    const dateleaveTypesInputDataObject = {
      totalWorkHours: 35.86,
      totalLeaveHours: 6.5,
      totalLeaveTypeHours: [
        {
          typeId: '2',
          type: 'Medical',
          hours: '6.50',
        },
      ],
      workSummary: {
        sunday: {
          workHours: '0',
          leave: [],
        },
        monday: {
          workHours: '0',
          leave: [],
        },
        tuesday: {
          workHours: '0',
          leave: [
            {
              typeId: '2',
              type: 'Medical',
              hours: '2.50',
            },
          ],
        },
        wednesday: {
          workHours: '29.28',
          leave: [
            {
              typeId: '2',
              type: 'Medical',
              hours: '4.00',
            },
          ],
        },
        thursday: {
          workHours: '3.78',
          leave: [],
        },
        friday: {
          workHours: '1.88',
          leave: [],
        },
        saturday: {
          workHours: '0.92',
          leave: [],
        },
      },
    };
    const startDayIndex = 1;
    const result = calculateGraphData(
      dateleaveTypesInputDataObject,
      startDayIndex,
    );
    expect(result).toStrictEqual([
      {
        colour: '#c15cb8',
        data: [
          {x: 'Mo', y: 0},
          {x: 'Tu', y: 2.5},
          {x: 'We', y: 4},
          {x: 'Th', y: 0},
          {x: 'Fr', y: 0},
          {x: 'Sa', y: 0},
          {x: 'Su', y: 0},
        ],
        id: '2',
      },
    ]);
  });

  test('getAttendanceRecordsOfTheSelectedDate', () => {
    const selectedDay = moment('2020-12-17 07:40');
    const attendanceObjects = [
      {
        id: '76',
        punchInUtcTime: '2020-12-16 09:45:00',
        punchInNote: '',
        punchInTimeOffset: '5.5',
        punchInUserTime: '2020-12-16 15:15:00',
        punchOutUtcTime: '2020-12-17 15:02:00',
        punchOutNote: '',
        punchOutTimeOffset: '-2',
        punchOutUserTime: '2020-12-17 13:02:00',
        state: 'PUNCHED OUT',
      },
      {
        id: '77',
        punchInUtcTime: '2020-12-17 15:04:00',
        punchInNote: '',
        punchInTimeOffset: '-2',
        punchInUserTime: '2020-12-17 13:04:00',
        punchOutUtcTime: '2020-12-17 15:06:00',
        punchOutNote: '',
        punchOutTimeOffset: '-11',
        punchOutUserTime: '2020-12-17 04:06:00',
        state: 'PUNCHED OUT',
      },
      {
        id: '78',
        punchInUtcTime: '2020-12-17 19:30:00',
        punchInNote: '',
        punchInTimeOffset: '-11',
        punchInUserTime: '2020-12-17 08:30:00',
        punchOutUtcTime: '2020-12-17 23:15:00',
        punchOutNote: '',
        punchOutTimeOffset: '-2',
        punchOutUserTime: '2020-12-17 21:15:00',
        state: 'PUNCHED OUT',
      },
      {
        id: '82',
        punchInUtcTime: '2020-12-18 18:40:00',
        punchInNote: '',
        punchInTimeOffset: '-11',
        punchInUserTime: '2020-12-18 07:40:00',
        punchOutUtcTime: '2020-12-18 18:43:00',
        punchOutNote: '',
        punchOutTimeOffset: '-11',
        punchOutUserTime: '2020-12-18 07:43:00',
        state: 'PUNCHED OUT',
      },
    ];
    const result = getAttendanceRecordsOfTheSelectedDate(
      attendanceObjects,
      selectedDay,
    );
    expect(result).toStrictEqual([
      {
        id: '77',
        punchInNote: '',
        punchInTimeOffset: '-2',
        punchInUserTime: '2020-12-17 13:04:00',
        punchInUtcTime: '2020-12-17 15:04:00',
        punchOutNote: '',
        punchOutTimeOffset: '-11',
        punchOutUserTime: '2020-12-17 04:06:00',
        punchOutUtcTime: '2020-12-17 15:06:00',
        state: 'PUNCHED OUT',
      },
      {
        id: '78',
        punchInNote: '',
        punchInTimeOffset: '-11',
        punchInUserTime: '2020-12-17 08:30:00',
        punchInUtcTime: '2020-12-17 19:30:00',
        punchOutNote: '',
        punchOutTimeOffset: '-2',
        punchOutUserTime: '2020-12-17 21:15:00',
        punchOutUtcTime: '2020-12-17 23:15:00',
        state: 'PUNCHED OUT',
      },
    ]);
  });

  test('getLeaveRecordsOfTheSelectedDate', () => {
    const selectedDay = moment('2020-11-24');
    const leaveObjects = [
      {
        id: '9',
        date: '2020-11-24',
        lengthHours: '4.00',
        lengthDays: '0.5000',
        leaveType: {
          id: 2,
          type: 'Medical',
        },
        startTime: '09:00:00',
        endTime: '13:00:00',
        status: <LeaveStatus>'PENDING APPROVAL',
      },
      {
        id: '2',
        date: '2020-11-25',
        lengthHours: '2.50',
        lengthDays: '0.3125',
        leaveType: {
          id: 1,
          type: 'Test',
        },
        startTime: '09:00:00',
        endTime: '11:30:00',
        status: <LeaveStatus>'TAKEN',
      },
    ];
    const result = getLeaveRecordsOfTheSelectedDate(leaveObjects, selectedDay);
    expect(result).toStrictEqual([
      {
        id: '9',
        date: '2020-11-24',
        lengthHours: '4.00',
        lengthDays: '0.5000',
        leaveType: {
          id: 2,
          type: 'Medical',
        },
        startTime: '09:00:00',
        endTime: '13:00:00',
        status: 'PENDING APPROVAL',
      },
    ]);
  });

  test('getHolidayRecordsOfTheSelectedDate', () => {
    const holidays = [
      {
        id: '1',
        recurring: '0',
        description: 'Poya Day',
        date: '2020-12-03',
        length: <typeof WORK_WEEK_HALF>'4',
      },
      {
        id: '2',
        recurring: '0',
        description: 'Christmas Day',
        date: '2020-12-25',
        length: <typeof WORK_WEEK_FULL>'0',
      },
    ];
    const selectedDay = moment('2020-12-25');
    const result = getHolidayRecordsOfTheSelectedDate(holidays, selectedDay);
    expect(result).toStrictEqual([
      {
        id: '2',
        recurring: '0',
        description: 'Christmas Day',
        date: '2020-12-25',
        length: '0',
      },
    ]);
  });

  test('getWorkWeekResultOfTheSelectedDate', () => {
    const workweek = {
      mon: <WorkWeekType>'0',
      tue: <WorkWeekType>'0',
      wed: <WorkWeekType>'0',
      thu: <WorkWeekType>'0',
      fri: <WorkWeekType>'0',
      sat: <WorkWeekType>'4',
      sun: <WorkWeekType>'8',
    };
    const selectedDay = moment('2020-12-26');
    const result = getWorkWeekResultOfTheSelectedDate(workweek, selectedDay);
    expect(result).toBe('4');
  });

  test('getDurationFromHours', () => {
    const hours = 22.15;
    const result = getDurationFromHours(hours);
    expect(result).toBe('22:09');
  });

  test('formatTime', () => {
    const result = formatTime(new Date('2020-05-20 07:40'));
    expect(result).toBe('07:40 AM');
  });

  test('getWeekdayOrder', () => {
    const result = getWeekdayOrder(1, 'ddd');
    expect(result).toStrictEqual([
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun',
    ]);
  });
});
