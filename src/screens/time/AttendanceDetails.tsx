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
} from 'store/time/attendance/actions';
import {
  DaySelectorSingleDay,
  AttendanceRequest,
  EMPLOYEE_ATTENDANCE,
  MY_ATTENDANCE,
} from 'store/time/attendance/types';
import {
  selectAttendanceRecords,
  selectLeaveRecords,
  selectAttendanceGraphRecords,
  selectHolidays,
} from 'store/time/attendance/selectors';
import {fetchWorkWeek} from 'store/leave/common-screens/actions';
import {selectWorkWeek} from 'store/leave/common-screens/selectors';
import withGlobals, {WithGlobals} from 'lib/hoc/withGlobals';
import {selectCurrentRoute} from 'store/globals/selectors';
import moment from 'moment';
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
  convertDateObjectToStringFormat,
  getWeekDayFromIndex,
} from 'lib/helpers/attendance';
class AttendanceDetails extends React.Component<
  AttendanceDetailsProps,
  AttendanceDetailsState
> {
  constructor(props: AttendanceDetailsProps) {
    super(props);
    const {params: {selectedDate} = {}} = this.props.route;
    this.state = {
      selectedDate: selectedDate ? selectedDate : undefined,
    };
  }

  componentDidMount() {
    const {employeeAttendance} = this.props.route.params;
    const attendanceRequest: AttendanceRequest = {
      fromDate: convertDateObjectToStringFormat(
        getWeekDayFromIndex(this.props.route.params.startDayIndex),
        'YYYY-MM-DD',
      ),
      toDate: convertDateObjectToStringFormat(
        getWeekDayFromIndex(this.props.route.params.startDayIndex + 6),
        'YYYY-MM-DD',
      ),
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

  onRefresh = () => {
    this.componentDidMount();
  };

  selectDate = (day: moment.Moment) => {
    this.setState({
      selectedDate: day,
    });
  };

  componentDidUpdate = () => {
    if (this.state.selectedDate === undefined) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState({
        selectedDate: getWeekDayFromIndex(
          this.props.route.params.startDayIndex,
        ),
      });
      /* eslint-enable react/no-did-update-set-state */
    }
  };

  setDefaultDate = () => {
    const {startDayIndex} = this.props.route.params;
    if (this.state.selectedDate === undefined) {
      this.setState({
        selectedDate: getWeekDayFromIndex(startDayIndex),
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
      if (
        selectedDate !== undefined &&
        convertDateObjectToStringFormat(singleDay.date, 'ddd') ===
          convertDateObjectToStringFormat(selectedDate, 'ddd')
      ) {
        duration = singleDay.duration;
      }
    });
    const {theme} = this.props;
    return (
      <MainLayout onRefresh={this.onRefresh}>
        <View>
          <View
            style={[
              styles.rowFlexDirection,
              {
                backgroundColor: theme.palette.backgroundSecondary,
              },
            ]}>
            {dateSelectorData.map((singleDate: DaySelectorSingleDay, key) => {
              return (
                <AttendanceDetailedHeaderComponent
                  key={key}
                  isActive={
                    convertDateObjectToStringFormat(singleDate.date, 'ddd') ===
                    convertDateObjectToStringFormat(
                      this.state.selectedDate,
                      'ddd',
                    )
                  }
                  day={singleDate.date}
                  selectDate={this.selectDate}
                  hours={singleDate.duration}
                />
              );
            })}
          </View>
          <View style={{paddingTop: theme.spacing * 4}}>
            <AttendanceDetailedViewDurationEmployeeDetailsCardComponent
              date={
                selectedDate
                  ? convertDateObjectToStringFormat(
                      selectedDate,
                      'ddd, DD MMM YYYY',
                    )
                  : '--'
              }
              duration={duration}
              holidays={selectedHolidays}
              leaves={selectedLeaveRecords}
              workweekResult={selectedWorkWeekResult}
              employeeName={this.props.route.params.employeeName}
              mode={
                this.props.route.params.employeeName !== undefined
                  ? EMPLOYEE_ATTENDANCE
                  : MY_ATTENDANCE
              }
            />
          </View>
          <Divider />
          <View>
            <AttendanceTimelineComponent
              attendanceRecords={selectedAttendanceRecords}
            />
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
