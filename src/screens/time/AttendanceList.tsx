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
import {FlatList, View, RefreshControl, StyleSheet} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import Divider from 'components/DefaultDivider';
import {
  fetchEmployeeAttendanceList,
  fetchAttendanceConfiguration,
} from 'store/time/attendance/actions';
import {
  selectEmployeeAttendanceList,
  selectPickedSubordinate,
  selectStartDay,
  selectEndDay,
  selectAttendanceConfiguration,
} from 'store/time/attendance/selectors';
import moment from 'moment';
import Text from 'components/DefaultText';
import Icon from 'components/DefaultIcon';
import SafeAreaLayout from 'layouts/SafeAreaLayout';
import AttendanceListItem from 'screens/time/components/AttendanceListItem';
import {SingleEmployeeAttendance} from 'store/time/attendance/types';
import {EMPLOYEE_ATTENDANCE_SUMMARY} from 'screens';
import {navigate} from 'lib/helpers/navigation';
import {AttendanceSummaryScreenParams} from 'screens/time/navigators';
import {
  convertDateObjectToStringFormat,
  getWeekDayFromIndex,
} from 'lib/helpers/attendance';
import DatePeriodComponent from 'screens/time/components/DatePeriodComponent';

class AttendanceList extends React.Component<
  AttendanceListProps,
  AttendanceListState
> {
  constructor(props: AttendanceListProps) {
    super(props);
    this.state = {
      selectedDate: undefined,
      startDayIndex: this.props.weekStartDay,
      configFetched: false,
      listFetched: false,
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

  componentDidUpdate(prevProps: AttendanceListProps) {
    if (prevProps.pickedSubordinate !== this.props.pickedSubordinate) {
      this.onRefresh();
    }

    if (this.state.configFetched && !this.state.listFetched) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState(
        {listFetched: true, startDayIndex: this.props.weekStartDay},
        () => {
          this.onRefresh();
        },
      );
      /* eslint-enable react/no-did-update-set-state */
    }

    if (
      this.props.attendanceConfiguration !== prevProps.attendanceConfiguration
    ) {
      // Update state when attendance configuration fetched
      /* eslint-disable react/no-did-update-set-state */
      this.setState({
        configFetched: true,
      });
      /* eslint-enable react/no-did-update-set-state */
    }
  }

  onRefresh = () => {
    this.props.fetchEmployeeAttendanceList({
      fromDate: convertDateObjectToStringFormat(
        this.getWeekStartDate(),
        'YYYY-MM-DD',
      ),
      toDate: convertDateObjectToStringFormat(
        this.getWeekEndDate(),
        'YYYY-MM-DD',
      ),
      ...(this.props.pickedSubordinate !== undefined && {
        empNumber: this.props.pickedSubordinate.empNumber,
      }),
    });
  };

  selectDate = (day: moment.Moment) => {
    this.setState({
      selectedDate: day,
    });
  };

  onPressLeave = (item: SingleEmployeeAttendance) => () => {
    navigate<AttendanceSummaryScreenParams>(EMPLOYEE_ATTENDANCE_SUMMARY, {
      employeeAttendance: item,
      startDayIndex: this.state.startDayIndex,
      endDayIndex: this.getWeekEndDayIndex(),
    });
  };

  goLeft = () => {
    const countStart = this.state.startDayIndex - 7;

    this.setState(
      {
        startDayIndex: countStart,
      },
      () => {
        this.props.fetchEmployeeAttendanceList({
          fromDate: convertDateObjectToStringFormat(
            this.getWeekStartDate(),
            'YYYY-MM-DD',
          ),
          toDate: convertDateObjectToStringFormat(
            this.getWeekEndDate(),
            'YYYY-MM-DD',
          ),
          ...(this.props.pickedSubordinate !== undefined && {
            empNumber: this.props.pickedSubordinate.empNumber,
          }),
        });
      },
    );
  };

  goRight = () => {
    const countStart = this.state.startDayIndex + 7;
    if (countStart <= this.props.weekStartDay) {
      this.setState(
        {
          startDayIndex: countStart,
        },
        () => {
          this.props.fetchEmployeeAttendanceList({
            fromDate: convertDateObjectToStringFormat(
              this.getWeekStartDate(),
              'YYYY-MM-DD',
            ),
            toDate: convertDateObjectToStringFormat(
              this.getWeekEndDate(),
              'YYYY-MM-DD',
            ),
            ...(this.props.pickedSubordinate !== undefined && {
              empNumber: this.props.pickedSubordinate.empNumber,
            }),
          });
        },
      );
    }
  };

  render() {
    const {theme, employeeList, weekStartDay} = this.props;
    return (
      <SafeAreaLayout>
        <View
          style={{
            backgroundColor: theme.palette.backgroundSecondary,
            paddingBottom: theme.spacing * 2,
          }}>
          <DatePeriodComponent
            startDate={this.getWeekStartDate()}
            endDate={this.getWeekEndDate()}
            leftActive={true}
            rightActive={this.state.startDayIndex !== weekStartDay}
            onPressLeft={this.goLeft}
            onPressRight={this.goRight}
          />
        </View>
        <FlatList
          data={employeeList}
          renderItem={({item}) => (
            <>
              <AttendanceListItem
                employeeAttendance={item}
                onPress={this.onPressLeave(item)}
              />
            </>
          )}
          keyExtractor={(item) => item.employeeId}
          ItemSeparatorComponent={() => {
            return (
              <View style={{paddingHorizontal: theme.spacing}}>
                <Divider />
              </View>
            );
          }}
          ListFooterComponent={
            employeeList === undefined || employeeList?.length === 0 ? null : (
              <View
                style={{
                  paddingHorizontal: theme.spacing,
                  paddingBottom: theme.spacing * 4,
                }}>
                <Divider />
              </View>
            )
          }
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
          }
          contentContainerStyle={styles.contentContainer}
          ListEmptyComponent={
            employeeList !== undefined ? (
              <View style={styles.emptyContentView}>
                <Icon
                  name={'info-outline'}
                  type={'MaterialIcons'}
                  style={{
                    fontSize: theme.typography.largeIconSize,
                    paddingBottom: theme.spacing * 2,
                    marginTop: -theme.spacing * 2,
                  }}
                />
                <Text>{'No Records Found.'}</Text>
              </View>
            ) : null
          }
        />
      </SafeAreaLayout>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  emptyContentView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
});

interface AttendanceListProps
  extends WithTheme,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

interface AttendanceListState {
  selectedDate?: moment.Moment;
  startDayIndex: number;
  configFetched: boolean;
  listFetched: boolean;
}

const mapStateToProps = (state: RootState) => ({
  employeeList: selectEmployeeAttendanceList(state),
  pickedSubordinate: selectPickedSubordinate(state),
  weekStartDay: selectStartDay(state),
  weekEndDay: selectEndDay(state),
  attendanceConfiguration: selectAttendanceConfiguration(state),
});

const mapDispatchToProps = {
  fetchEmployeeAttendanceList,
  fetchAttendanceConfiguration,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const AttendanceListWithTheme =
  withTheme<AttendanceListProps>()(AttendanceList);

export default connector(AttendanceListWithTheme);
