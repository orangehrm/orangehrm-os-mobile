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
} from 'store/time/my-attendance/types';
import {MutableKeys} from 'utility-types';
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
const getDateObjectFromSaveFormat = (dateString: string) => {
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
    const punchInDateObj = getDateObjectFromSaveFormat(punchInDatetime);
    const punchOutDateObj = getDateObjectFromSaveFormat(punchOutDatetime);
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

const getDurationFromHours = (hours?: number) => {
  if (hours) {
    let minutes = Math.round(hours * 60);
    let durationHours = setTwoDigits(
      ((minutes - (minutes % 60)) / 60).toString(),
    );
    let durationMinutes = setTwoDigits((minutes % 60).toString());
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
    let displayDatetime = getUTCMomentObjectFromString(datetime).format('LLL');
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

const convertDateObjectToStringFormat = (
  dateObject: moment.Moment,
  format: string,
) => {
  return dateObject.format(format);
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

const calculateWorkData = (graphRecordsInputData: GraphRecordsObject) => {
  const workGraphData: GraphDataPoint[] = [];
  let days = Object.keys(graphRecordsInputData.workSummary);
  days.forEach((day) => {
    const key = <MutableKeys<WorkSummaryObject>>day;
    let hours = graphRecordsInputData.workSummary[key].workHours;
    let data: GraphDataPoint = {
      x: dayMapper[key],
      y: parseFloat(hours),
    };
    workGraphData.push(data);
  });
  return workGraphData;
};

const calculateGraphData = (leaveTypesInputData: GraphRecordsObject) => {
  const leaveGraphData: LeaveTypeGraphData[] = [];

  let leaveTypeIds: string[] = [];
  leaveTypesInputData.totalLeaveTypeHours.forEach((leave) => {
    leaveTypeIds.push(leave.typeId);
  });
  leaveTypeIds.forEach((id) => {
    let leaveTypeGraphData: LeaveTypeGraphData;
    let data: GraphDataPoint[] = [];
    let colour: string = getLeaveColourById(id);

    let days = Object.keys(leaveTypesInputData.workSummary);

    days.forEach((day) => {
      const key = <MutableKeys<WorkSummaryObject>>day;

      let filteredLeaves = leaveTypesInputData.workSummary[key].leave.filter(
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
    leaveTypeGraphData = {
      id: id,
      colour: colour,
      data: data,
    };
    leaveGraphData.push(leaveTypeGraphData);
  });
  return leaveGraphData;
};

export {
  getDateObjectFromSaveFormat,
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
};
