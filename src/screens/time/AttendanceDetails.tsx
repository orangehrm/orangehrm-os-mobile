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
import Divider from 'components/DefaultDivider';
import {
  fetchAttendanceRecords,
  fetchLeaveRecords,
  fetchAttendanceGraphRecords,
  fetchHolidays,
} from 'store/time/my-attendance/actions';
import {
  DaySelectorSingleDay,
  AttendanceRequest,
} from 'store/time/my-attendance/types';
import {
  selectAttendanceRecords,
  selectLeaveRecords,
  selectAttendanceGraphRecords,
  selectHolidays,
} from 'store/time/my-attendance/selectors';
import {fetchWorkWeek} from 'store/leave/common-screens/actions';
import {selectWorkWeek} from 'store/leave/common-screens/selectors';
import withGlobals, {WithGlobals} from 'lib/hoc/withGlobals';
import {selectCurrentRoute} from 'store/globals/selectors';
import moment from 'moment';
import {Text} from 'react-native-svg';
import {AttendanceDetailsScreenRouteParams} from 'screens/time/navigators/index';
import AttendanceTimelineComponent from 'screens/time/components/AttendanceTimelineComponent';
import AttendanceDetailedHeaderComponent from 'screens/time/components/AttendanceDetailedHeaderComponent';
import AttendanceDetailedViewDurationEmployeeDetailsCardComponent from 'screens/time/components/AttendanceDetailedViewDurationEmployeeDetailsCardComponent';
import {
  calculateDateSelectorData,
  getAttendanceRecordsOfTheSelectedDate,
  getLeaveRecordsOfTheSelectedDate,
  getHolidayRecordsOfTheSelectedDate,
  getWorkWeekResultOfTheSelectedDate,
} from 'lib/helpers/attendance';
class AttendanceDetails extends React.Component<
  AttendanceDetailsProps,
  AttendanceDetailsState
> {
  constructor(props: AttendanceDetailsProps) {
    super(props);
    this.state = {
      selectedDate: undefined,
    };
  }

  componentDidMount() {
    const {employeeAttendance} = this.props.route.params;
    let attendanceRequest: AttendanceRequest = {
      fromDate: moment()
        .weekday(this.props.route.params.startDayIndex)
        .format('YYYY-MM-DD'),
      toDate: moment()
        .weekday(this.props.route.params.startDayIndex + 6)
        .format('YYYY-MM-DD'),
      empNumber: employeeAttendance
        ? parseInt(employeeAttendance.employeeId, 10)
        : undefined,
    };
    this.props.fetchHolidays(attendanceRequest);
    this.props.fetchWorkWeek();
    this.props.fetchAttendanceRecords(attendanceRequest);
    this.props.fetchLeaveRecords(attendanceRequest);

    this.setDefaultDate();
  }

  onRefresh = () => {};
  selectDate = (day: moment.Moment) => {
    this.setState({
      selectedDate: day,
    });
  };

  componentDidUpdate = (prevProps: AttendanceDetailsProps) => {
    if (prevProps.route !== this.props.route) {
    }
    if (this.state.selectedDate === undefined) {
      this.setState({
        selectedDate: moment().weekday(this.props.route.params.startDayIndex),
      });
    }
  };

  setDefaultDate = () => {
    const {startDayIndex} = this.props.route.params;
    if (this.state.selectedDate === undefined) {
      this.setState({
        selectedDate: moment().weekday(startDayIndex),
      });
    }
  };

  render() {
    const {attendanceRecords, leaveRecords, workweek, holidays} = this.props;
    const {selectedDate} = this.state;
    const selectedAttendanceRecords = getAttendanceRecordsOfTheSelectedDate(
      attendanceRecords,
      selectedDate,
    );
    const selectedLeaveRecords = getLeaveRecordsOfTheSelectedDate(
      leaveRecords,
      selectedDate,
    );
    const selectedHolidays = getHolidayRecordsOfTheSelectedDate(
      holidays,
      selectedDate,
    );

    const selectedWorkWeekResult = getWorkWeekResultOfTheSelectedDate(
      workweek,
      selectedDate,
    );

    const dateSelectorData = calculateDateSelectorData(
      this.props.graphRecords?.workSummary,
      this.props.route.params.startDayIndex,
    );
    let duration: string = '00:00';
    dateSelectorData.forEach((singleDay) => {
      if (singleDay.date.format('ddd') === selectedDate?.format('ddd')) {
        duration = singleDay.duration;
      }
    });
    const {theme} = this.props;
    return (
      <MainLayout onRefresh={this.onRefresh}>
        <View>
          <Text>{'Attendance Details Screen'}</Text>
          <View
            style={[
              styles.rowFlexDirection,
              {
                backgroundColor: theme.palette.backgroundSecondary,
              },
            ]}>
            {dateSelectorData.map((singleDate: DaySelectorSingleDay) => {
              return (
                <AttendanceDetailedHeaderComponent
                  isActive={
                    singleDate.date.format('ddd') ===
                    this.state.selectedDate?.format('ddd')
                  }
                  day={singleDate.date}
                  selectDate={this.selectDate}
                  hours={
                    singleDate.duration
                  }></AttendanceDetailedHeaderComponent>
              );
            })}
          </View>
          <View style={{paddingTop: theme.spacing * 4}}>
            <AttendanceDetailedViewDurationEmployeeDetailsCardComponent
              date={
                selectedDate ? selectedDate.format('ddd, DD MMM YYYY') : '--'
              }
              duration={duration}
              holidays={selectedHolidays}
              leaves={selectedLeaveRecords}
              workweekResult={
                selectedWorkWeekResult
              }></AttendanceDetailedViewDurationEmployeeDetailsCardComponent>
          </View>
          <Divider />
          <View>
            <AttendanceTimelineComponent
              attendanceRecords={
                selectedAttendanceRecords
              }></AttendanceTimelineComponent>
          </View>
        </View>
      </MainLayout>
    );
  }
}

const styles = StyleSheet.create({
  rowFlexDirection: {
    flexDirection: 'row',
  },
});

interface AttendanceDetailsProps
  extends WithTheme,
    WithGlobals,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
  route: AttendanceDetailsScreenRouteParams;
}

interface AttendanceDetailsState {
  selectedDate?: moment.Moment;
}

const mapStateToProps = (state: RootState) => ({
  attendanceRecords: selectAttendanceRecords(state),
  leaveRecords: selectLeaveRecords(state),
  graphRecords: selectAttendanceGraphRecords(state),
  currentRoute: selectCurrentRoute(state),
  holidays: selectHolidays(state),
  workweek: selectWorkWeek(state),
});

const mapDispatchToProps = {
  fetchAttendanceRecords,
  fetchLeaveRecords,
  fetchAttendanceGraphRecords,
  fetchWorkWeek,
  fetchHolidays,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const AttendanceDetailsWithTheme = withTheme<AttendanceDetailsProps>()(
  AttendanceDetails,
);

const AttendanceDetailsWithGlobals = withGlobals<AttendanceDetailsProps>()(
  AttendanceDetailsWithTheme,
);
export default connector(AttendanceDetailsWithGlobals);
