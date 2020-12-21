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
import {View, StyleSheet} from 'react-native';
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
  AttendanceRequest,
  GraphLeaveType,
  SingleLeave,
  GraphDataPoint,
  LeaveTypeGraphData,
  EMPLOYEE_ATTENDANCE,
  MY_ATTENDANCE,
} from 'store/time/my-attendance/types';
import {
  selectAttendanceRecords,
  selectLeaveRecords,
  selectAttendanceGraphRecords,
} from 'store/time/my-attendance/selectors';
import AttendanceDailyChartComponent from 'screens/time/components/AttendanceDailyChartComponent';
import AttendanceSummaryWorkLeaveDurationsCardComponent from 'screens/time/components/AttendanceSummaryWorkLeaveDurationsCardComponent';
import DatePeriodComponent from 'screens/time/components/DatePeriodComponent';
import {
  convertDateObjectToStringFormat,
  calculateGraphData,
  calculateWorkData,
  getLeaveColourById,
} from 'lib/helpers/attendance';
import withGlobals, {WithGlobals} from 'lib/hoc/withGlobals';
import {selectCurrentRoute} from 'store/globals/selectors';
import moment from 'moment';
import {
  getDurationFromHours,
  calculateDateOfMonth,
  getWeekDayFromIndex,
} from 'lib/helpers/attendance';
import {navigate} from 'lib/helpers/navigation';
import {ATTENDANCE_DETAILS, EMPLOYEE_ATTENDANCE_DETAILS} from 'screens';
import {
  AttendanceDetailsScreenParam,
  AttendanceSummaryScreenRouteParams,
  EmployeeAttendanceSummaryScreenRouteParams,
} from 'screens/time/navigators';

class AttendanceSummary extends React.Component<
  AttendanceSummaryProps,
  AttendanceSummaryState
> {
  constructor(props: AttendanceSummaryProps) {
    super(props);
    this.state = {
      startDayIndex: 0,
      endDayIndex: 6,
      weekStartDate: getWeekDayFromIndex(0),
      weekEndDate: getWeekDayFromIndex(6),
      singleLeaveTypeData: [],
      dateOfMonth: calculateDateOfMonth(0, 6),
      graphWorkData: startGraphWorkData,
      graphLeaveData: [],
    };
  }

  componentDidMount() {
    this.fetchData(this.state.weekStartDate, this.state.weekEndDate);
  }

  onPressDetails = () => {
    const {params: {employeeAttendance} = {}} = this.props.route;
    let route = ATTENDANCE_DETAILS;
    if (employeeAttendance !== undefined) {
      route = EMPLOYEE_ATTENDANCE_DETAILS;
    }
    navigate<AttendanceDetailsScreenParam>(route, {
      startDayIndex: this.state.startDayIndex,
      employeeAttendance,
      employeeName: undefined,
    });
  };

  componentDidUpdate = (prevProps: AttendanceSummaryProps) => {
    if (
      this.props.graphRecords !== prevProps.graphRecords &&
      this.props.graphRecords
    ) {
      this.calculateDetailsCardTotalLeaveTypesData(
        this.props.graphRecords?.totalLeaveTypeHours,
      );
      const cardRresult = this.calculateDetailsCardTotalLeaveTypesData(
        this.props.graphRecords?.totalLeaveTypeHours,
      );
      const leaveResult = calculateGraphData(this.props.graphRecords);
      const workResult = calculateWorkData(this.props.graphRecords);
      this.setState({
        graphLeaveData: leaveResult,
        singleLeaveTypeData: cardRresult,
        graphWorkData: workResult,
      });
    }
  };

  calculateDetailsCardTotalLeaveTypesData = (
    leaveTypesInputData: SingleLeave[],
  ) => {
    const result = [];
    for (let i = 0; i < leaveTypesInputData.length; i++) {
      const graphLeaveType: GraphLeaveType = {
        typeId: leaveTypesInputData[i].typeId,
        type: leaveTypesInputData[i].type,
        colour: getLeaveColourById(leaveTypesInputData[i].typeId),
        duration: getDurationFromHours(
          parseFloat(leaveTypesInputData[i].hours),
        ),
      };
      result.push(graphLeaveType);
    }
    return result;
  };

  fetchData = (weekStartDate: moment.Moment, weekEndDate: moment.Moment) => {
    const {params: {employeeAttendance} = {}} = this.props.route;
    let empNumber;
    if (employeeAttendance !== undefined) {
      empNumber = parseInt(employeeAttendance.employeeId, 10);
    }

    const startDate = convertDateObjectToStringFormat(
      weekStartDate,
      'YYYY-MM-DD',
    );
    const endDate = convertDateObjectToStringFormat(weekEndDate, 'YYYY-MM-DD');
    let attendanceRequest: AttendanceRequest;
    if (empNumber !== undefined) {
      attendanceRequest = {
        fromDate: startDate,
        toDate: endDate,
        empNumber: empNumber,
      };
    } else {
      attendanceRequest = {
        fromDate: startDate,
        toDate: endDate,
      };
    }
    this.props.fetchAttendanceGraphRecords(attendanceRequest);
  };

  goLeft = () => {
    const countStart = this.state.startDayIndex - 7;
    const countEnd = this.state.endDayIndex - 7;

    this.setState(
      {
        startDayIndex: countStart,
        endDayIndex: countEnd,
        weekStartDate: getWeekDayFromIndex(countStart),
        weekEndDate: getWeekDayFromIndex(countEnd),
        weekStartDate: getWeekDayFromIndex(countStart),
        weekEndDate: getWeekDayFromIndex(countEnd),
        dateOfMonth: calculateDateOfMonth(countStart, countEnd),
        graphWorkData: startGraphWorkData,
        graphLeaveData: [],
      },
      () => {
        this.fetchData(this.state.weekStartDate, this.state.weekEndDate);
      },
    );
  };

  goRight = () => {
    const countStart = this.state.startDayIndex + 7;
    const countEnd = this.state.endDayIndex + 7;
    if (countStart <= 1) {
      this.setState(
        {
          startDayIndex: countStart,
          endDayIndex: countEnd,
          weekStartDate: getWeekDayFromIndex(countStart),
          weekEndDate: getWeekDayFromIndex(countEnd),
          dateOfMonth: calculateDateOfMonth(countStart, countEnd),
          graphWorkData: startGraphWorkData,
          graphLeaveData: [],
        },
        () => {
          this.fetchData(this.state.weekStartDate, this.state.weekEndDate);
        },
      );
    }
  };

  onRefresh = () => {
    this.fetchData(this.state.weekStartDate, this.state.weekEndDate);
  };

  render() {
    const {theme, graphRecords} = this.props;
    const empNumber = 1;
    return (
      <MainLayout onRefresh={this.onRefresh}>
        <View
          style={[
            styles.flexOne,
            {backgroundColor: theme.palette.backgroundSecondary},
          ]}>
          <View>
            <DatePeriodComponent
              startDate={this.state.weekStartDate}
              endDate={this.state.weekEndDate}
              leftActive={true}
              rightActive={this.state.startDayIndex !== 0}
              onPressLeft={this.goLeft}
              onPressRight={this.goRight}
            />
          </View>
        </View>
        <AttendanceSummaryWorkLeaveDurationsCardComponent
          totalLeaveDuration={getDurationFromHours(
            graphRecords?.totalLeaveHours,
          )}
          onPressDetails={this.onPressDetails}
          totalWorkDuration={getDurationFromHours(graphRecords?.totalWorkHours)}
          leaveData={this.state.singleLeaveTypeData}
          empNumber={undefined}
          employeeName={undefined}
          mode={empNumber !== undefined ? EMPLOYEE_ATTENDANCE : MY_ATTENDANCE}
        />
        <AttendanceDailyChartComponent
          graphLeaveData={this.state.graphLeaveData}
          graphWorkData={this.state.graphWorkData}
          dateOfMonth={this.state.dateOfMonth}
        />
      </MainLayout>
    );
  }
}
const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
});

const startGraphWorkData = [
  {x: 'Su', y: 0},
  {x: 'Mo', y: 0},
  {x: 'Tu', y: 0},
  {x: 'We', y: 0},
  {x: 'Th', y: 0},
  {x: 'Fr', y: 0},
  {x: 'Sa', y: 0},
];

interface AttendanceSummaryProps
  extends WithTheme,
    WithGlobals,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
  route:
    | AttendanceSummaryScreenRouteParams
    | EmployeeAttendanceSummaryScreenRouteParams;
}

interface AttendanceSummaryState {
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

const AttendanceSummaryWithTheme = withTheme<AttendanceSummaryProps>()(
  AttendanceSummary,
);

const PunchWithGlobals = withGlobals<AttendanceSummaryProps>()(
  AttendanceSummaryWithTheme,
);
export default connector(PunchWithGlobals);
