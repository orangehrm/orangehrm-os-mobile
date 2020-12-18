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
  fetchEmployeeAttendanceList,
} from 'store/time/my-attendance/actions';
import {} from 'store/time/my-attendance/types';
import {
  selectAttendanceRecords,
  selectLeaveRecords,
  selectAttendanceGraphRecords,
  selectHolidays,
  selectEmployeeAttendanceList,
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
class AttendanceList extends React.Component<
  AttendanceListProps,
  AttendanceListState
> {
  constructor(props: AttendanceListProps) {
    super(props);
    this.state = {
      selectedDate: undefined,
    };
  }

  onRefresh = () => {};
  selectDate = (day: moment.Moment) => {
    this.setState({
      selectedDate: day,
    });
  };

  componentDidUpdate = (prevProps: AttendanceListProps) => {};

  render() {
    console.log(this.props.employeeList);
    const {theme} = this.props;
    return (
      <MainLayout onRefresh={this.onRefresh}>
        <View>
          <Text>{'Attendance List Screen'}</Text>
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

interface AttendanceListProps
  extends WithTheme,
    WithGlobals,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
  // route: AttendanceListScreenRouteParams;
}

interface AttendanceListState {
  selectedDate?: moment.Moment;
}

const mapStateToProps = (state: RootState) => ({
  employeeList: selectEmployeeAttendanceList(state),
});

const mapDispatchToProps = {
  fetchEmployeeAttendanceList,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const AttendanceListWithTheme = withTheme<AttendanceListProps>()(
  AttendanceList,
);

const AttendanceListWithGlobals = withGlobals<AttendanceListProps>()(
  AttendanceListWithTheme,
);
export default connector(AttendanceListWithGlobals);
