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
  convertDateObjToISOFormat,
  getDateObjFromUTCDateAndTime,
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
  convertDateObjToYmd,
  convertDateObjToHHmm,
} from 'lib/helpers/attendance';
import moment from 'moment';
import {Holiday, WorkWeek} from 'store/leave/common-screens/types';
import {LeaveStatus} from 'store/leave/leave-usage/types';

describe('lib/helpers/attendance', () => {
  test('convertDateObjToISOFormat:: check YYYY-MM-DD HH:mm', () => {
    let strDate = '2020-07-14T10:35';
    let date = new Date(strDate);
    let result = convertDateObjToISOFormat(date);
    expect(result).toBe(strDate);

    strDate = '2020-07-14T23:59';
    date = new Date(strDate);
    result = convertDateObjToISOFormat(date);
    expect(result).toBe(strDate);
  });

  test('getDateObjFromUTCDateAndTime', () => {
    let strDate = '2020-07-14';
    let result = getDateObjFromUTCDateAndTime(strDate, '10:35');
    expect(result).toStrictEqual(new Date('2020-07-14T10:35Z'));

    strDate = '2020-07-14';
    result = getDateObjFromUTCDateAndTime(strDate, '23:35:00');
    expect(result).toStrictEqual(new Date('2020-07-14T23:35:00Z'));

    strDate = '2020-07-14';
    result = getDateObjFromUTCDateAndTime(strDate, '24:35');
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
  test('convertDateObjToISOFormat::check get YYYY-MM-DD hh:mm datetime string from Date object', () => {
    const date = new Date('2020-07-14T21:48');
    const result = convertDateObjToISOFormat(date);
    expect(result).toBe('2020-07-14T21:48');
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

  test('convertDateObjToYmd', () => {
    let result = convertDateObjToYmd(new Date('2020-07-14T10:35'));
    expect(result).toBe('2020-07-14');

    result = convertDateObjToYmd(new Date('2020-02-29 10:35'));
    expect(result).toBe('2020-02-29');

    result = convertDateObjToYmd(new Date('2020-12-31T00:00Z'));
    expect(result).toBe('2020-12-31');
  });

  test('convertDateObjToHHmm', () => {
    let result = convertDateObjToHHmm(new Date('2020-07-14T10:35'));
    expect(result).toBe('10:35');

    result = convertDateObjToHHmm(new Date('2020-02-29 10:59:59'));
    expect(result).toBe('10:59');

    result = convertDateObjToHHmm(new Date('2020-02-29 10:60'));
    expect(result).toBe('Invalid date');
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
        id: 76,
        punchIn: {
          note: '',
          offset: '-11',
          utcDate: '2020-12-17',
          utcTime: '13:04:00',
          userTime: '13:04:00',
          userDate: '2020-12-17',
        },
        punchOut: {
          note: '',
          offset: '-11',
          utcDate: '2020-12-17',
          utcTime: '15:04:00',
          userTime: '15:04:00',
          userDate: '2020-12-17',
        },
        duration: '',
      },
    ];
    const result = getAttendanceRecordsOfTheSelectedDate(
      attendanceObjects,
      selectedDay,
    );
    expect(result).toStrictEqual([
      {
        id: 76,
        punchIn: {
          note: '',
          offset: '-11',
          utcDate: '2020-12-17',
          utcTime: '13:04:00',
          userTime: '13:04:00',
          userDate: '2020-12-17',
        },
        punchOut: {
          note: '',
          offset: '-11',
          utcDate: '2020-12-17',
          utcTime: '15:04:00',
          userTime: '15:04:00',
          userDate: '2020-12-17',
        },
        duration: '',
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
    const holidays: Holiday[] = [
      {
        id: 1,
        recurring: false,
        name: 'Poya Day',
        date: '2020-12-03',
        length: 4,
        lengthName: 'Half Day',
      },
      {
        id: 2,
        recurring: false,
        name: 'Christmas Day',
        date: '2020-12-25',
        length: 0,
        lengthName: 'Full Day',
      },
    ];
    const selectedDay = moment('2020-12-25');
    const result = getHolidayRecordsOfTheSelectedDate(holidays, selectedDay);
    expect(result).toStrictEqual([
      {
        id: 2,
        recurring: false,
        name: 'Christmas Day',
        date: '2020-12-25',
        length: 0,
        lengthName: 'Full Day',
      },
    ]);
  });

  test('getWorkWeekResultOfTheSelectedDate', () => {
    const workweek: WorkWeek = {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 4,
      sunday: 8,
    };
    const selectedDay = moment('2020-12-26');
    const result = getWorkWeekResultOfTheSelectedDate(workweek, selectedDay);
    expect(result).toBe(4);
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
