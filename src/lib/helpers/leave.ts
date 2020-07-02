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

const getBreakDown = (days: Leave[]) => {
  let order = 0;
  const breakDownObj: {
    [key: string]: {count: number; order: number; name: string};
  } = {};
  days.forEach((leave) => {
    if (leave.status === 'WEEKEND' || leave.status === 'HOLIDAY') {
      return;
    } else if (breakDownObj.hasOwnProperty(leave.status)) {
      const obj = breakDownObj[leave.status];
      breakDownObj[leave.status] = {...obj, count: obj.count + 1};
    } else {
      breakDownObj[leave.status] = {
        count: 1,
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

type LeaveNameCount = {name: string; count: number; key: LeaveStatus};

export {
  assignColorsToLeaveTypes,
  LEAVE_STATUS_MAP,
  getBreakDown,
  sortLeaveArrayByDate,
  isSingleDayRequest,
  isMultipleDayRequest,
};
