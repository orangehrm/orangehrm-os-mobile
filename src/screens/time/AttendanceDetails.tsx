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

import React from 'react';
import {View} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import MainLayout from 'layouts/MainLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {
  fetchAttendanceRecords,
  fetchLeaveRecords,
  fetchAttendanceGraphRecords,
} from 'store/time/my-attendance/actions';
import {
  GraphLeaveType,
  GraphDataPoint,
  LeaveTypeGraphData,
} from 'store/time/my-attendance/types';
import {
  selectAttendanceRecords,
  selectLeaveRecords,
  selectAttendanceGraphRecords,
} from 'store/time/my-attendance/selectors';
import withGlobals, {WithGlobals} from 'lib/hoc/withGlobals';
import {selectCurrentRoute} from 'store/globals/selectors';
import moment from 'moment';
import {Text} from 'react-native-svg';

class AttendanceDetails extends React.Component<
  AttendanceDetailsProps,
  AttendanceDetailsState
> {
  constructor(props: AttendanceDetailsProps) {
    super(props);
    this.state = {
      startDayIndex: 0,
      endDayIndex: 6,
      weekStartDate: moment().weekday(0),
      weekEndDate: moment().weekday(6),
      dateOfMonth: [],
      singleLeaveTypeData: [],
      graphLeaveData: [],
      graphWorkData: [],
    };
  }

  onRefresh = () => {};

  render() {
    return (
      <MainLayout onRefresh={this.onRefresh}>
        <View>
          <Text>{'Attendance Details Screen'}</Text>
        </View>
      </MainLayout>
    );
  }
}

interface AttendanceDetailsProps
  extends WithTheme,
    WithGlobals,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

interface AttendanceDetailsState {
  startDayIndex: number;
  endDayIndex: number;
  weekStartDate: moment.Moment;
  weekEndDate: moment.Moment;
  dateOfMonth: string[];
  singleLeaveTypeData: GraphLeaveType[];
  graphLeaveData: LeaveTypeGraphData[];
  graphWorkData: GraphDataPoint[];
}

const mapStateToProps = (state: RootState) => ({
  attendanceRecords: selectAttendanceRecords(state),
  leaveRecords: selectLeaveRecords(state),
  graphRecords: selectAttendanceGraphRecords(state),
  currentRoute: selectCurrentRoute(state),
});

const mapDispatchToProps = {
  fetchAttendanceRecords,
  fetchLeaveRecords,
  fetchAttendanceGraphRecords,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const AttendanceDetailsWithTheme = withTheme<AttendanceDetailsProps>()(
  AttendanceDetails,
);

const PunchWithGlobals = withGlobals<AttendanceDetailsProps>()(
  AttendanceDetailsWithTheme,
);
export default connector(PunchWithGlobals);
