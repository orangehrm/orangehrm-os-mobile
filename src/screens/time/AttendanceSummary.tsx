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
} from 'store/time/attendance/actions';
import {
  AttendanceRequest,
  GraphLeaveType,
  SingleLeave,
  GraphDataPoint,
  ShortDay,
  LeaveTypeGraphData,
  EMPLOYEE_ATTENDANCE,
  MY_ATTENDANCE,
} from 'store/time/attendance/types';
import {
  selectAttendanceRecords,
  selectLeaveRecords,
  selectAttendanceGraphRecords,
} from 'store/time/attendance/selectors';
import AttendanceDailyChartComponent from 'screens/time/components/AttendanceDailyChartComponent';
import AttendanceSummaryWorkLeaveDurationsCardComponent from 'screens/time/components/AttendanceSummaryWorkLeaveDurationsCardComponent';
import DatePeriodComponent from 'screens/time/components/DatePeriodComponent';
import {
  convertDateObjectToStringFormat,
  calculateGraphData,
  calculateWorkData,
  getLeaveColourById,
  getDurationFromHours,
  calculateDateOfMonth,
  getWeekDayFromIndex,
} from 'lib/helpers/attendance';
import withGlobals, {WithGlobals} from 'lib/hoc/withGlobals';
import {selectCurrentRoute} from 'store/globals/selectors';
import moment from 'moment';
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
    const startDayIndex = this.props.route.params
      ? this.props.route.params.startDayIndex
      : 0;
    const endDayIndex = this.props.route.params
      ? this.props.route.params.endDayIndex
      : 6;
    this.state = {
      startDayIndex: startDayIndex,
      endDayIndex: endDayIndex,
      weekStartDate: getWeekDayFromIndex(startDayIndex),
      weekEndDate: getWeekDayFromIndex(endDayIndex),
      singleLeaveTypeData: [],
      dateOfMonth: calculateDateOfMonth(startDayIndex, endDayIndex),
      graphWorkData: startGraphWorkData,
      graphLeaveData: [],
    };
  }

  componentDidMount() {
    this.fetchData(this.state.weekStartDate, this.state.weekEndDate);
  }

  onPressDetails = (selectedDate?: moment.Moment) => {
    const {params: {employeeAttendance} = {}} = this.props.route;
    let route = ATTENDANCE_DETAILS;
    if (employeeAttendance !== undefined) {
      route = EMPLOYEE_ATTENDANCE_DETAILS;
    }
    navigate<AttendanceDetailsScreenParam>(route, {
      startDayIndex: this.state.startDayIndex,
      employeeAttendance,
      employeeName: this.props.route.params?.employeeAttendance
        ? this.props.route.params.employeeAttendance.employeeName
        : undefined,
      selectedDate: selectedDate,
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
      /* eslint-disable react/no-did-update-set-state */
      this.setState({
        graphLeaveData: leaveResult,
        singleLeaveTypeData: cardRresult,
        graphWorkData: workResult,
      });
      /* eslint-enable react/no-did-update-set-state */
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

  onPressBar = (selectedDay: ShortDay) => {
    // TODO:: navigate to detail screen depend on
    let selectedDayObj: moment.Moment | undefined;
    const startDayIndex = this.state.startDayIndex;
    for (let i = startDayIndex; i < startDayIndex + 7; i++) {
      if (
        convertDateObjectToStringFormat(getWeekDayFromIndex(i), 'dd') ===
        selectedDay
      ) {
        selectedDayObj = getWeekDayFromIndex(i);
      }
    }
    this.onPressDetails(selectedDayObj);
  };

  render() {
    const {theme, graphRecords} = this.props;
    const empNumber = this.props.route.params
      ? this.props.route.params.employeeAttendance?.employeeId
      : undefined;
    const employeeName = this.props.route.params
      ? this.props.route.params.employeeAttendance?.employeeName
      : undefined;
    const employeeJobTitle = this.props.route.params
      ? this.props.route.params.employeeAttendance?.jobTitle
      : undefined;
    return (
      <MainLayout
        onRefresh={this.onRefresh}
        header={
          <View style={[{backgroundColor: theme.palette.backgroundSecondary}]}>
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
        }>
        <View
          style={[
            styles.flexOne,
            {backgroundColor: theme.palette.backgroundSecondary},
          ]}>
          <AttendanceSummaryWorkLeaveDurationsCardComponent
            totalLeaveDuration={getDurationFromHours(
              graphRecords?.totalLeaveHours,
            )}
            onPressDetails={this.onPressDetails}
            totalWorkDuration={getDurationFromHours(
              graphRecords?.totalWorkHours,
            )}
            leaveData={this.state.singleLeaveTypeData}
            empNumber={empNumber}
            employeeName={employeeName}
            jobTitle={employeeJobTitle}
            mode={empNumber !== undefined ? EMPLOYEE_ATTENDANCE : MY_ATTENDANCE}
          />

          <AttendanceDailyChartComponent
            graphLeaveData={this.state.graphLeaveData}
            graphWorkData={this.state.graphWorkData}
            dateOfMonth={this.state.dateOfMonth}
            onPressBar={this.onPressBar}
          />
        </View>
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
  employeeName?: string;
  empNumber?: string;
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
