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
import {fetchEmployeeAttendanceList} from 'store/time/my-attendance/actions';
import {selectEmployeeAttendanceList} from 'store/time/my-attendance/selectors';
import moment from 'moment';
import Text from 'components/DefaultText';
import Icon from 'components/DefaultIcon';
import SafeAreaLayout from 'layouts/SafeAreaLayout';
import AttendanceListItem from 'screens/time/components/AttendanceListItem';
import {SingleEmployeeAttendance} from 'store/time/my-attendance/types';
import {EMPLOYEE_ATTENDANCE_SUMMARY} from 'screens';
import {navigate} from 'lib/helpers/navigation';
import {AttendanceSummaryScreenParams} from 'screens/time/navigators';

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

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = () => {
    this.props.fetchEmployeeAttendanceList();
  };

  selectDate = (day: moment.Moment) => {
    this.setState({
      selectedDate: day,
    });
  };

  onPressLeave = (item: SingleEmployeeAttendance) => () => {
    navigate<AttendanceSummaryScreenParams>(EMPLOYEE_ATTENDANCE_SUMMARY, {
      employeeAttendance: item,
    });
  };

  render() {
    const {theme, employeeList} = this.props;
    return (
      <SafeAreaLayout>
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
          keyExtractor={(item) => item.leaveRequestId}
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

export default connector(AttendanceListWithTheme);
