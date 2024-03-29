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

import {all, call} from 'redux-saga/effects';
import {loadAsyncStorage, watchSetStorageItem} from 'store/storage/sagas';
import {watchAuthActions} from 'store/auth/sagas';
import {watchLeaveUsageActions} from 'store/leave/leave-usage/sagas';
import {watchApplyLeaveActions} from 'store/leave/apply-leave/sagas';
import {watchLeaveListActions} from 'store/leave/leave-list/sagas';
import {watchAssignLeaveActions} from 'store/leave/assign-leave/sagas';
import {watchCommonScreensActions} from 'store/leave/common-screens/sagas';
import {watchPunchStatusActions} from 'store/time/punch/sagas';
import {watchAttendanceActions} from 'store/time/attendance/sagas';

export default function* rootSaga() {
  yield all([
    call(loadAsyncStorage),
    call(watchSetStorageItem),
    call(watchAuthActions),
    call(watchLeaveUsageActions),
    call(watchApplyLeaveActions),
    call(watchLeaveListActions),
    call(watchAssignLeaveActions),
    call(watchCommonScreensActions),
    call(watchPunchStatusActions),
    call(watchAttendanceActions),
  ]);
}
