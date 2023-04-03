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

import moment from 'moment';
import {LEAVE_TYPE_COLORS} from './leave';
import {
  GraphRecordsObject,
  GraphDataPoint,
  WorkSummaryObject,
  LeaveTypeGraphData,
  DaySelectorSingleDay,
  AttendanceObject,
  LeaveObject,
} from 'store/time/attendance/types';
import {MutableKeys} from 'utility-types';
import {WorkWeek, Holiday} from 'store/leave/common-screens/types';
/**
 *
 * @param dateString  // input format '2020-12-25 13:26'
 */
const getUTCMomentObjectFromString = (dateString: string) => {
  return moment(dateString);
};

/**
 *
 * @param number
 */
const setTwoDigits = (number: string) => {
  return number.length < 2 ? '0' + number : number;
};

/**
 * Format given date object to YYYY-MM-DD HH:mm format
 * @param {Date} date
 * @returns {String} YYYY-MM-DD HH:mm formated string
 */
const getDateSaveFormatFromDateObject = (date: Date) => {
  return moment(date).format('YYYY-MM-DD HH:mm');
};

/**
 * @param {String} dateString YYYY-MM-DD HH:mm formated string
 * @return {Date}
 */
const getUTCDateObjectFromSaveFormat = (dateString: string) => {
  const datetime = dateString.split(' ', 2);
  // https://github.com/facebook/react-native/issues/30245
  return new Date(datetime[0] + 'T' + datetime[1] + 'Z');
};

/**
 * @param {String} dateString YYYY-MM-DD HH:mm formated string
 * @return {Date}
 */
const getLocalDateObjectFromSaveFormat = (dateString: string) => {
  return moment(dateString).toDate();
};

const NEGATIVE_DURATION = 'NEGATIVE_DURATION';

/**
 *
 * @param {String} punchInDatetime e.g. 2020-12-21 02:15:00, 2020-12-21 17:14
 * @param {String} punchOutDatetime e.g. 2020-12-21 03:15:00, 2020-12-21 20:14
 * @param {Number} punchInTimeZoneOffset e.g. -2, -11, 4, 5.5
 * @param {Number} punchOutTimeZoneOffset
 * @return {String} HH:mm formatted string
 */
const calculateDurationBasedOnTimezone = (
  punchInDatetime?: string,
  punchOutDatetime?: string,
  punchInTimeZoneOffset?: number,
  punchOutTimeZoneOffset?: number,
) => {
  if (punchInDatetime && punchOutDatetime) {
    const punchInDateObj = getLocalDateObjectFromSaveFormat(punchInDatetime);
    const punchOutDateObj = getLocalDateObjectFromSaveFormat(punchOutDatetime);
    let punchOutTime = punchOutDateObj.getTime();
    let punchInTime = punchInDateObj.getTime();

    if (punchInTimeZoneOffset) {
      punchInTime = moment(punchInDatetime)
        .utcOffset(punchInTimeZoneOffset * 60, true)
        .unix();
    }
    if (punchOutTimeZoneOffset) {
      punchOutTime = moment(punchOutDatetime)
        .utcOffset(punchOutTimeZoneOffset * 60, true)
        .unix();
    }

    const minutes = Math.round((punchOutTime - punchInTime) / 60);
    if (minutes < 0) {
      return NEGATIVE_DURATION;
    }
    const durationHours = setTwoDigits(
      ((minutes - (minutes % 60)) / 60).toString(),
    );
    const durationMinutes = setTwoDigits((minutes % 60).toString());
    return durationHours + ':' + durationMinutes;
  } else {
    return '00:00';
  }
};

/**
 *
 * @param datetime
 * @param timezoneOffset
 */
const formatLastRecordDetails = (
  datetime?: string,
  timezoneOffset?: string,
) => {
  if (datetime && timezoneOffset) {
    const displayDatetime =
      getUTCMomentObjectFromString(datetime).format('LLL');
    let timezone;
    if (parseFloat(timezoneOffset) > 0) {
      timezone =
        '+' + (Math.round(parseFloat(timezoneOffset) * 10) / 10).toString();
    } else {
      timezone = (Math.round(parseFloat(timezoneOffset) * 10) / 10).toString();
    }
    return displayDatetime + ' (GMT' + timezone + ')';
  } else {
    return null;
  }
};

/**
 *
 * @param timezoneOffset
 */
const formatTimezoneOffset = (timezoneOffset?: string) => {
  if (timezoneOffset) {
    let timezone;
    if (parseFloat(timezoneOffset) > 0) {
      timezone =
        '+' + (Math.round(parseFloat(timezoneOffset) * 10) / 10).toString();
    } else {
      timezone = (Math.round(parseFloat(timezoneOffset) * 10) / 10).toString();
    }
    return '  (GMT' + timezone + ')';
  } else {
    return null;
  }
};

const convertDateObjectToStringFormat = (
  dateObject?: moment.Moment,
  format?: string,
) => {
  if (dateObject !== undefined && format !== undefined) {
    return dateObject.format(format);
  } else {
    return ' -- ';
  }
};

/**
 * @returns {Number} e.g. -2, -11, 4, 5.5
 */
const getCurrentTimeZoneOffset = () => {
  return moment().utcOffset() / 60;
};

const dayMapper = {
  sunday: 'Su',
  monday: 'Mo',
  tuesday: 'Tu',
  wednesday: 'We',
  thursday: 'Th',
  friday: 'Fr',
  saturday: 'Sa',
};

const getLeaveColourById = (id: string) => {
  return LEAVE_TYPE_COLORS[parseInt(id, 10) % LEAVE_TYPE_COLORS.length];
};

const calculateWorkData = (
  graphRecordsInputData: GraphRecordsObject,
  startDayIndex: number,
) => {
  const workGraphData: GraphDataPoint[] = [];
  const daysInUppercase = getWeekdayOrder(startDayIndex, 'dddd');
  const days = daysInUppercase.map((day: string) => {
    return day.toLocaleLowerCase();
  });
  days.forEach((day) => {
    const key = <MutableKeys<WorkSummaryObject>>day;
    const hours = graphRecordsInputData.workSummary[key].workHours;
    const data: GraphDataPoint = {
      x: dayMapper[key],
      y: parseFloat(hours),
    };
    workGraphData.push(data);
  });
  return workGraphData;
};

const calculateGraphData = (
  leaveTypesInputData: GraphRecordsObject,
  startDayIndex: number,
) => {
  const leaveGraphData: LeaveTypeGraphData[] = [];

  const leaveTypeIds: string[] = [];
  leaveTypesInputData.totalLeaveTypeHours.forEach((leave) => {
    leaveTypeIds.push(leave.typeId);
  });
  leaveTypeIds.forEach((id) => {
    const data: GraphDataPoint[] = [];
    const colour: string = getLeaveColourById(id);
    const daysInUppercase = getWeekdayOrder(startDayIndex, 'dddd');
    const days = daysInUppercase.map((day: string) => {
      return day.toLocaleLowerCase();
    });
    days.forEach((day) => {
      const key = <MutableKeys<WorkSummaryObject>>day;

      const filteredLeaves = leaveTypesInputData.workSummary[key].leave.filter(
        (leave) => {
          return leave.typeId === id;
        },
      );
      let singleData: GraphDataPoint;
      if (filteredLeaves.length === 0) {
        singleData = {
          x: dayMapper[key],
          y: 0,
        };
      } else {
        singleData = {
          x: dayMapper[key],
          y: parseFloat(filteredLeaves[0].hours),
        };
      }
      data.push(singleData);
    });
    const leaveTypeGraphData: LeaveTypeGraphData = {
      id: id,
      colour: colour,
      data: data,
    };
    leaveGraphData.push(leaveTypeGraphData);
  });
  return leaveGraphData;
};

const calculateDateSelectorData = (
  workSummaryObject?: WorkSummaryObject,
  startDayIndex?: number,
) => {
  if (workSummaryObject !== undefined && startDayIndex !== undefined) {
    const selectedWeek: DaySelectorSingleDay[] = [];
    for (let index = startDayIndex; index < startDayIndex + 7; index++) {
      const date = getWeekDayFromIndex(index);
      const day = convertDateObjectToStringFormat(
        date,
        'dddd',
      ).toLocaleLowerCase();
      const key = <MutableKeys<WorkSummaryObject>>day;
      const hours = workSummaryObject[key].workHours;
      const daySelectorSingleDay: DaySelectorSingleDay = {
        date: date,
        duration: getDurationFromHours(parseFloat(hours)),
      };
      selectedWeek.push(daySelectorSingleDay);
    }
    return selectedWeek;
  } else {
    return [];
  }
};

const getAttendanceRecordsOfTheSelectedDate = (
  attendanceObjects?: AttendanceObject[],
  selectedDay?: moment.Moment,
) => {
  if (attendanceObjects !== undefined && selectedDay !== undefined) {
    const selectedAttendanceObjects: AttendanceObject[] = [];
    attendanceObjects.forEach((attendanceObject) => {
      if (
        selectedDay.format('YYYY-MM-DD') ===
        attendanceObject.punchInUserTime.split(' ', 2)[0]
      ) {
        selectedAttendanceObjects.push(attendanceObject);
      }
    });
    return selectedAttendanceObjects;
  } else {
    return [];
  }
};

const getLeaveRecordsOfTheSelectedDate = (
  leaveObjects?: LeaveObject[],
  selectedDay?: moment.Moment,
) => {
  if (leaveObjects !== undefined && selectedDay !== undefined) {
    const selectedLeaveObjects: LeaveObject[] = [];
    leaveObjects.forEach((leaveObject) => {
      if (selectedDay.format('YYYY-MM-DD') === leaveObject.date) {
        selectedLeaveObjects.push(leaveObject);
      }
    });
    return selectedLeaveObjects;
  } else {
    return [];
  }
};

const getHolidayRecordsOfTheSelectedDate = (
  holidays?: Holiday[],
  selectedDay?: moment.Moment,
) => {
  if (holidays !== undefined && selectedDay !== undefined) {
    const selectedHolidays: Holiday[] = [];
    holidays.forEach((holiday) => {
      if (selectedDay.format('YYYY-MM-DD') === holiday.date) {
        selectedHolidays.push(holiday);
      }
    });
    return selectedHolidays;
  } else {
    return [];
  }
};

const getWorkWeekResultOfTheSelectedDate = (
  workweek?: WorkWeek,
  selectedDay?: moment.Moment,
) => {
  if (workweek !== undefined && selectedDay !== undefined) {
    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    let hours;
    days.forEach((day) => {
      if (selectedDay.format('dddd').toLocaleLowerCase() === day) {
        const key = <MutableKeys<WorkWeek>>day;
        hours = workweek[key];
      }
    });
    return hours;
  } else {
    return '-1';
  }
};

const getDurationFromHours = (hours?: number) => {
  if (hours) {
    const minutes = Math.round(hours * 60);
    const durationHours = setTwoDigits(
      ((minutes - (minutes % 60)) / 60).toString(),
    );
    const durationMinutes = setTwoDigits((minutes % 60).toString());
    return durationHours + ':' + durationMinutes;
  } else {
    return '00:00';
  }
};

// to get time as 3:48 PM from JS Date object
const formatTime = (datetime: Date) => {
  const time = datetime.toTimeString();
  const hourMinute = time.substring(0, 5).split(':', 2);
  let timePostFix: string = 'AM';
  let hour: string = hourMinute[0];
  if (parseInt(hourMinute[0], 10) > 12) {
    hour = (parseInt(hourMinute[0], 10) - 12).toString();
    timePostFix = 'PM';
  }
  if (parseInt(hourMinute[0], 10) === 12) {
    timePostFix = 'PM';
  }
  return hour.toString() + ':' + hourMinute[1] + ' ' + timePostFix;
};

const calculateDateOfMonth = (start: number, end: number) => {
  const dateOfMonth = [];
  for (let i = start; i <= end; i++) {
    dateOfMonth.push(
      convertDateObjectToStringFormat(getWeekDayFromIndex(i), 'M/D'),
    );
  }
  return dateOfMonth;
};

/**
 *
 * @param index
 */
const getWeekDayFromIndex = (index: number) => {
  return moment().isoWeekday(index);
};

const getWeekdayOrder = (startDayIndex: number, format: string) => {
  const result: string[] = [];
  for (let i = startDayIndex; i < startDayIndex + 7; i++) {
    result.push(
      convertDateObjectToStringFormat(getWeekDayFromIndex(i), format),
    );
  }
  return result;
};

export {
  getUTCDateObjectFromSaveFormat,
  calculateDurationBasedOnTimezone,
  getDateSaveFormatFromDateObject,
  formatLastRecordDetails,
  getCurrentTimeZoneOffset,
  NEGATIVE_DURATION,
  convertDateObjectToStringFormat,
  getDurationFromHours,
  calculateGraphData,
  calculateWorkData,
  getLeaveColourById,
  getAttendanceRecordsOfTheSelectedDate,
  getLeaveRecordsOfTheSelectedDate,
  calculateDateSelectorData,
  getHolidayRecordsOfTheSelectedDate,
  getUTCMomentObjectFromString,
  getWorkWeekResultOfTheSelectedDate,
  formatTime,
  calculateDateOfMonth,
  getWeekDayFromIndex,
  getWeekdayOrder,
  formatTimezoneOffset,
  getLocalDateObjectFromSaveFormat,
};
