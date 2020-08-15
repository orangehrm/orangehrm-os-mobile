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
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import ApplyLeave from 'screens/leave/ApplyLeave';
import PickLeaveRequestDaysCalendar from 'screens/leave/PickLeaveRequestDaysCalendar';
import PickLeaveRequestDuration from 'screens/leave/PickLeaveRequestDuration';
import PickLeaveRequestPartialDays from 'screens/leave/PickLeaveRequestPartialDays';
import LeaveRequestSuccess from 'screens/leave/LeaveRequestSuccess';
import {
  APPLY_LEAVE,
  APPLY_LEAVE_PICK_LEAVE_REQUEST_DAYS_CALENDAR,
  APPLY_LEAVE_PICK_LEAVE_REQUEST_DURATION,
  APPLY_LEAVE_PICK_LEAVE_REQUEST_PARTIAL_DAYS,
  LEAVE_REQUEST_SUCCESS,
} from 'screens';
import HeaderMenuIcon from 'components/HeaderMenuIcon';
import HeaderBackIcon from 'components/HeaderBackIcon';
import {getHeaderStyle} from 'lib/helpers/header';
import {LeaveRequestSuccessParamList} from 'screens/leave/navigators';

const Stack = createStackNavigator<ApplyLeaveNavigatorParamList>();

class ApplyLeaveNavigator extends React.Component<ApplyLeaveNavigatorProps> {
  render() {
    const {theme, navigation} = this.props;
    const header = getHeaderStyle(theme);
    const headerMenuIcon = {
      headerLeft: () => <HeaderMenuIcon navigation={navigation} />,
    };
    const headerBackIcon = {
      headerLeft: () => <HeaderBackIcon navigation={navigation} />,
    };

    return (
      <Stack.Navigator
        initialRouteName={APPLY_LEAVE}
        screenOptions={{
          ...header,
          ...headerBackIcon,
        }}
        keyboardHandlingEnabled={false}>
        <Stack.Screen
          name={APPLY_LEAVE}
          component={ApplyLeave}
          options={{
            title: 'Apply Leave',
            ...headerMenuIcon,
          }}
        />
        <Stack.Screen
          name={APPLY_LEAVE_PICK_LEAVE_REQUEST_DAYS_CALENDAR}
          component={PickLeaveRequestDaysCalendar}
          options={{
            title: 'Request Day(s)',
          }}
        />
        <Stack.Screen
          name={APPLY_LEAVE_PICK_LEAVE_REQUEST_DURATION}
          component={PickLeaveRequestDuration}
          options={{
            title: 'Duration',
          }}
        />
        <Stack.Screen
          name={APPLY_LEAVE_PICK_LEAVE_REQUEST_PARTIAL_DAYS}
          component={PickLeaveRequestPartialDays}
          options={{
            title: 'Partial Days',
          }}
        />
        <Stack.Screen
          name={LEAVE_REQUEST_SUCCESS}
          component={LeaveRequestSuccess}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
}

interface ApplyLeaveNavigatorProps extends WithTheme {
  navigation: NavigationProp<ParamListBase>;
}

export type ApplyLeaveNavigatorParamList = {
  [APPLY_LEAVE]: {};
  [APPLY_LEAVE_PICK_LEAVE_REQUEST_DAYS_CALENDAR]: {};
  [APPLY_LEAVE_PICK_LEAVE_REQUEST_DURATION]: {};
  [APPLY_LEAVE_PICK_LEAVE_REQUEST_PARTIAL_DAYS]: {};
} & LeaveRequestSuccessParamList;

export default withTheme<ApplyLeaveNavigatorProps>()(ApplyLeaveNavigator);
