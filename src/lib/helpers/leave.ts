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

import {Entitlement, Leave, LeaveStatus} from 'store/leave/leave-usage/types';
import {
  SPECIFY_TIME,
  PARTIAL_OPTION_ALL,
  PARTIAL_OPTION_START,
  PARTIAL_OPTION_END,
  PARTIAL_OPTION_START_END,
  MultipleDayPartialOption,
} from 'store/leave/apply-leave/types';
import {getDateFromString} from 'lib/helpers/time';

const LEAVE_TYPE_COLORS = [
  '#445abf',
  '#4ece68',
  '#c15cb8',
  '#982727',
  '#db1580',
  '#037b20',
  '#0288d9',
  '#d76900',
  '#732673',
  '#405040',
];

const LEAVE_STATUS_MAP = {
  REJECTED: 'Rejected',
  CANCELLED: 'Cancelled',
  'PENDING APPROVAL': 'Pending Approval',
  SCHEDULED: 'Scheduled',
  TAKEN: 'Taken',
  WEEKEND: 'Weekend',
  HOLIDAY: 'Holiday',
};

const assignColorsToLeaveTypes = (data: Entitlement[]) => {
  const newEntitlementArray = data.map((item, index) => {
    return {
      ...item,
      leaveType: {
        ...item.leaveType,
        color: LEAVE_TYPE_COLORS[index % LEAVE_TYPE_COLORS.length],
      },
    };
  });
  return newEntitlementArray;
};

const sortLeaveArrayByDate = (days: Leave[]) => {
  const sortedDays = [...days].sort((leave1, leave2) => {
    const leave1Date = new Date(leave1.date);
    const leave2Date = new Date(leave2.date);
    if (leave1Date < leave2Date) {
      return -1;
    }
    if (leave1Date > leave2Date) {
      return 1;
    }
    return 0;
  });
  return sortedDays;
};

const getBreakDown = (days: Leave[], workshift: number = 8) => {
  let order = 0;
  const breakDownObj: {
    [key: string]: {count: number; order: number; name: string};
  } = {};
  days.forEach((leave) => {
    const statusDays = parseFloat(leave.duration) / workshift;
    if (leave.status === 'WEEKEND' || leave.status === 'HOLIDAY') {
      return;
    } else if (breakDownObj.hasOwnProperty(leave.status)) {
      const obj = breakDownObj[leave.status];
      breakDownObj[leave.status] = {
        ...obj,
        count: obj.count + statusDays,
      };
    } else {
      breakDownObj[leave.status] = {
        count: statusDays,
        order: order,
        name: LEAVE_STATUS_MAP[leave.status],
      };
      order++;
    }
  });

  const array: LeaveNameCount[] = [];
  Object.keys(breakDownObj).forEach((leaveStatus) => {
    array.splice(breakDownObj[leaveStatus].order, 0, {
      name: breakDownObj[leaveStatus].name,
      count: breakDownObj[leaveStatus].count,
      key: leaveStatus as LeaveStatus,
    });
  });
  return array;
};

/**
 * Check whether leave request is single date
 * @param {string|undefined} fromDate Date in ISO-8601 format (YYYY-MM-DD)
 * @param {string|undefined} toDate Date in ISO-8601 format (YYYY-MM-DD)
 * @return {boolean}
 */
const isSingleDayRequest = (fromDate?: string, toDate?: string): boolean => {
  if (
    (fromDate !== undefined && toDate === undefined) ||
    (fromDate !== undefined && toDate !== undefined && fromDate === toDate)
  ) {
    return true;
  }
  return false;
};

/**
 * Check whether leave request is multiple days
 * @param {string|undefined} fromDate Date in ISO-8601 format (YYYY-MM-DD)
 * @param {string|undefined} toDate Date in ISO-8601 format (YYYY-MM-DD)
 * @return {boolean}
 */
const isMultipleDayRequest = (fromDate?: string, toDate?: string): boolean => {
  if (
    fromDate !== undefined &&
    toDate !== undefined &&
    new Date(fromDate) < new Date(toDate)
  ) {
    return true;
  }
  return false;
};

/**
 * Return object key as index, values as time(periods of 15min)
 * @returns {string[]}
 */
const getTimeValuesForSlider = (): string[] => {
  const times: string[] = [];
  for (let i = 0; i < 24; i++) {
    let hour = i.toString();
    if (i < 10) {
      hour = '0' + hour;
    }
    times.push(hour + ':00');
    times.push(hour + ':15');
    times.push(hour + ':30');
    times.push(hour + ':45');
  }
  return times;
};

/**
 * Check multiple day partial option specific time valid
 * @param partialOption
 */
const isValidPartialOptionSpecifyTime = (
  partialOption?: MultipleDayPartialOption,
) => {
  if (
    (partialOption?.partialOption === PARTIAL_OPTION_ALL ||
      partialOption?.partialOption === PARTIAL_OPTION_START ||
      partialOption?.partialOption === PARTIAL_OPTION_START_END) &&
    partialOption.startDayType === SPECIFY_TIME
  ) {
    if (
      !isFromTimeLessThanToTime(
        partialOption.startDayFromTime,
        partialOption.startDayToTime,
      )
    ) {
      return false;
    }
  }
  if (
    (partialOption?.partialOption === PARTIAL_OPTION_END ||
      partialOption?.partialOption === PARTIAL_OPTION_START_END) &&
    partialOption.endDayType === SPECIFY_TIME
  ) {
    if (
      !isFromTimeLessThanToTime(
        partialOption.endDayFromTime,
        partialOption.endDayToTime,
      )
    ) {
      return false;
    }
  }
  return true;
};

/**
 * Compare from time less than to time
 * @param {string} fromTime HH:MM format string
 * @param {string} fromTime HH:MM format string
 * @returns {boolean}
 */
const isFromTimeLessThanToTime = (
  fromTime: string,
  toTime: string,
): boolean => {
  return getDateFromString(fromTime) < getDateFromString(toTime);
};

type LeaveNameCount = {name: string; count: number; key: LeaveStatus};

export {
  assignColorsToLeaveTypes,
  LEAVE_STATUS_MAP,
  getBreakDown,
  sortLeaveArrayByDate,
  isSingleDayRequest,
  isMultipleDayRequest,
  getTimeValuesForSlider,
  isValidPartialOptionSpecifyTime,
  isFromTimeLessThanToTime,
};
