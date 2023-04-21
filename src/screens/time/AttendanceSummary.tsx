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
  fetchAttendanceConfiguration,
  fetchJobRole,
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
  selectAttendanceConfiguration,
  selectStartDay,
  selectEndDay,
  selectJobRole,
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
import {getFirstAndLastNames} from 'lib/helpers/name';

class AttendanceSummary extends React.Component<
  AttendanceSummaryProps,
  AttendanceSummaryState
> {
  constructor(props: AttendanceSummaryProps) {
    super(props);
    this.state = {
      startDayIndex: props.weekStartDay,
      singleLeaveTypeData: [],
      graphWorkData: startGraphWorkData,
      graphLeaveData: [],
      configFetched: false,
      resetted: true,
    };
  }

  getWeekEndDayIndex = (
    weekStartDayIndex: number = this.state.startDayIndex,
  ) => {
    return weekStartDayIndex + 6;
  };

  getWeekStartDate = (weekStartDayIndex: number = this.state.startDayIndex) => {
    return getWeekDayFromIndex(weekStartDayIndex);
  };

  getWeekEndDate = (weekStartDayIndex: number = this.state.startDayIndex) => {
    return getWeekDayFromIndex(this.getWeekEndDayIndex(weekStartDayIndex));
  };

  componentDidMount() {
    this.props.fetchAttendanceConfiguration();
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
        ? getFirstAndLastNames(this.props.route.params.employeeAttendance)
        : undefined,
      selectedDate: selectedDate,
      leaveTypesInputData: this.props.graphRecords?.totalLeaveTypeHours,
    });
  };

  componentDidUpdate = (prevProps: AttendanceSummaryProps) => {
    const {currentRoute, route, weekStartDay} = this.props;
    // Since this screen using both `MyAttendanceSummary` and `EmployeeAttendanceSummary` screens,
    // Have to check current route to identify instance
    if (currentRoute === route.name) {
      if (this.state.configFetched && this.state.resetted) {
        // This block only call once config fetching finished
        // Or screen changed to somewhere except attendance details screen

        const startDayIndex = route.params
          ? route.params.startDayIndex
          : weekStartDay;

        this.setState({startDayIndex: startDayIndex, resetted: false}, () => {
          this.fetchData(this.getWeekStartDate(), this.getWeekEndDate());
        });
      }
    } else if (
      !this.state.resetted &&
      !(
        currentRoute === ATTENDANCE_DETAILS ||
        currentRoute === EMPLOYEE_ATTENDANCE_DETAILS
      )
    ) {
      // Move away from current screen
      this.setState({resetted: true});
    }

    if (
      this.props.attendanceConfiguration !== prevProps.attendanceConfiguration
    ) {
      // Update state when attendance configuration fetched
      this.setState({configFetched: true});
    }

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
      const leaveResult = calculateGraphData(
        this.props.graphRecords,
        this.state.startDayIndex,
      );
      const workResult = calculateWorkData(
        this.props.graphRecords,
        this.state.startDayIndex,
      );

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
          parseFloat(String(leaveTypesInputData[i].hours)),
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
      empNumber = employeeAttendance.empNumber;
    }

    const startDate = convertDateObjectToStringFormat(
      weekStartDate,
      'YYYY-MM-DD',
    );
    const endDate = convertDateObjectToStringFormat(weekEndDate, 'YYYY-MM-DD');
    let attendanceRequest: AttendanceRequest;
    if (empNumber !== undefined) {
      this.props.fetchJobRole(empNumber);
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
    this.setState(
      {
        startDayIndex: countStart,
        graphWorkData: startGraphWorkData,
        graphLeaveData: [],
        singleLeaveTypeData: [],
      },
      () => {
        this.fetchData(this.getWeekStartDate(), this.getWeekEndDate());
      },
    );
  };

  goRight = () => {
    const countStart = this.state.startDayIndex + 7;
    if (
      this.props.weekStartDay !== undefined &&
      countStart <= this.props.weekStartDay
    ) {
      this.setState(
        {
          startDayIndex: countStart,
          graphWorkData: startGraphWorkData,
          graphLeaveData: [],
          singleLeaveTypeData: [],
        },
        () => {
          this.fetchData(this.getWeekStartDate(), this.getWeekEndDate());
        },
      );
    }
  };

  onRefresh = () => {
    this.fetchData(this.getWeekStartDate(), this.getWeekEndDate());
  };

  onPressBar = (selectedDay: ShortDay) => {
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
    const {theme, graphRecords, weekStartDay} = this.props;
    const empNumber = this.props.route.params?.employeeAttendance
      ? this.props.route.params.employeeAttendance?.empNumber
      : undefined;
    const employeeName = this.props.route.params?.employeeAttendance
      ? getFirstAndLastNames(this.props.route.params.employeeAttendance)
      : undefined;
    const employeeJobTitle = this.props.jobRole?.jobTitle.title
      ? this.props.jobRole?.jobTitle.title
      : undefined;

    const dateOfMonth = calculateDateOfMonth(
      this.state.startDayIndex,
      this.getWeekEndDayIndex(),
    );
    const weekStartDate = this.getWeekStartDate();
    const weekEndDate = this.getWeekEndDate();
    return (
      <MainLayout
        onRefresh={this.onRefresh}
        header={
          <View style={[{backgroundColor: theme.palette.backgroundSecondary}]}>
            <View>
              <DatePeriodComponent
                startDate={weekStartDate}
                endDate={weekEndDate}
                leftActive={true}
                rightActive={this.state.startDayIndex !== weekStartDay}
                onPressLeft={this.goLeft}
                onPressRight={this.goRight}
              />
            </View>
          </View>
        }>
        <View
          style={[
            styles.flexOne,
            {
              backgroundColor: theme.palette.backgroundSecondary,
              paddingBottom: theme.spacing * 4,
            },
          ]}>
          <View>
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
              mode={
                empNumber !== undefined ? EMPLOYEE_ATTENDANCE : MY_ATTENDANCE
              }
            />

            <AttendanceDailyChartComponent
              graphLeaveData={this.state.graphLeaveData}
              graphWorkData={this.state.graphWorkData}
              dateOfMonth={dateOfMonth}
              onPressBar={this.onPressBar}
              weekStartDayIndex={this.props.weekStartDay}
            />
          </View>
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
  singleLeaveTypeData: GraphLeaveType[];
  graphLeaveData: LeaveTypeGraphData[];
  graphWorkData: GraphDataPoint[];
  employeeName?: string;
  empNumber?: number;
  configFetched: boolean;
  resetted: boolean;
}

const mapStateToProps = (state: RootState) => ({
  attendanceRecords: selectAttendanceRecords(state),
  leaveRecords: selectLeaveRecords(state),
  graphRecords: selectAttendanceGraphRecords(state),
  currentRoute: selectCurrentRoute(state),
  attendanceConfiguration: selectAttendanceConfiguration(state),
  weekStartDay: selectStartDay(state),
  weekEndDay: selectEndDay(state),
  jobRole: selectJobRole(state),
});

const mapDispatchToProps = {
  fetchAttendanceRecords,
  fetchLeaveRecords,
  fetchAttendanceGraphRecords,
  fetchAttendanceConfiguration,
  fetchJobRole,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const AttendanceSummaryWithTheme =
  withTheme<AttendanceSummaryProps>()(AttendanceSummary);

const PunchWithGlobals = withGlobals<AttendanceSummaryProps>()(
  AttendanceSummaryWithTheme,
);
export default connector(PunchWithGlobals);
