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

export interface ApplyLeaveState {
  fromDate?: string;
  toDate?: string;
  pickedLeaveDates: boolean;
  comment?: string;
}

export const PICK_FROM_DATE = 'APPLY_LEAVE_PICK_FROM_DATE';
export const PICK_TO_DATE = 'APPLY_LEAVE_PICK_TO_DATE';
export const PICK_LEAVE_DATES = 'APPLY_LEAVE_PICK_LEAVE_DATES';

export interface PickFromDateAction {
  type: typeof PICK_FROM_DATE;
  date?: string;
}

export interface PickToDateAction {
  type: typeof PICK_TO_DATE;
  date?: string;
}

export interface PickDatesAction {
  type: typeof PICK_LEAVE_DATES;
  state: boolean;
}

export type ApplyLeaveActionTypes =
  | PickFromDateAction
  | PickToDateAction
  | PickDatesAction;
