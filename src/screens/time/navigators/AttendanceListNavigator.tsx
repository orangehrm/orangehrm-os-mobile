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
import {createStackNavigator} from '@react-navigation/stack';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import AttendanceSummary from 'screens/time/AttendanceSummary';
import AttendanceDetails from 'screens/time/AttendanceDetails';
import AttendanceList from 'screens/time/AttendanceList';
import AttendancePickEmployee from 'screens/time/AttendancePickEmployee';
import {
  EMPLOYEE_ATTENDANCE_SUMMARY,
  EMPLOYEE_ATTENDANCE_DETAILS,
  ATTENDANCE_LIST,
  ATTENDANCE_PICK_EMPLOYEE,
} from 'screens';
import HeaderMenuIcon from 'components/HeaderMenuIcon';
import HeaderBackIcon from 'components/HeaderBackIcon';
import HeaderIcon from 'components/HeaderIcon';
import {getHeaderStyle} from 'lib/helpers/header';
import {navigate} from 'lib/helpers/navigation';
import {pickSubordinate} from 'store/time/my-attendance/actions';
import {selectPickedSubordinate} from 'store/time/my-attendance/selectors';

const Stack = createStackNavigator();

class AttendanceListNavigator extends React.Component<AttendanceListNavigatorProps> {
  onPressClose = () => {
    this.props.pickSubordinate(undefined);
  };

  render() {
    const {theme, navigation, pickedSubordinate} = this.props;
    const header = getHeaderStyle(theme);
    const headerMenuIcon = {
      headerLeft: () => <HeaderMenuIcon navigation={navigation} />,
    };
    const headerBackIcon = {
      headerLeft: () => <HeaderBackIcon navigation={navigation} />,
    };
    const headerSearchIcon = {
      headerRight: () => (
        <View style={styles.headerRight}>
          {pickedSubordinate !== undefined ? (
            <HeaderIcon name={'close'} onPress={this.onPressClose} />
          ) : null}
          <HeaderIcon
            name={'magnify'}
            onPress={() => {
              navigate(ATTENDANCE_PICK_EMPLOYEE);
            }}
          />
        </View>
      ),
    };
    return (
      <Stack.Navigator
        initialRouteName={ATTENDANCE_LIST}
        screenOptions={{
          ...header,
          ...headerBackIcon,
        }}
        keyboardHandlingEnabled={false}>
        <Stack.Screen
          name={ATTENDANCE_LIST}
          component={AttendanceList}
          options={{
            title: 'Employee Attendance',
            ...headerMenuIcon,
            ...headerSearchIcon,
          }}
        />
        <Stack.Screen
          name={EMPLOYEE_ATTENDANCE_SUMMARY}
          component={AttendanceSummary}
          options={{
            title: 'Employee Attendance Summary',
            ...headerBackIcon,
          }}
        />
        <Stack.Screen
          name={EMPLOYEE_ATTENDANCE_DETAILS}
          component={AttendanceDetails}
          options={{
            title: 'Employee Attendance Details',
            ...headerBackIcon,
          }}
        />
        <Stack.Screen
          name={ATTENDANCE_PICK_EMPLOYEE}
          component={AttendancePickEmployee}
          options={{
            title: 'Select Employee',
            ...headerBackIcon,
          }}
        />
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
  },
});

interface AttendanceListNavigatorProps
  extends WithTheme,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

const mapStateToProps = (state: RootState) => ({
  pickedSubordinate: selectPickedSubordinate(state),
});

const mapDispatchToProps = {
  pickSubordinate,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const AttendanceListNavigatorTheme = withTheme<AttendanceListNavigatorProps>()(
  AttendanceListNavigator,
);

export default connector(AttendanceListNavigatorTheme);
