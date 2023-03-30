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
import MyLeaveEntitilementsAndUsage from 'screens/leave/MyLeaveUsage';
import MyLeave from 'screens/leave/MyLeave';
import MyLeaveDetails from 'screens/leave/MyLeaveDetails';
import LeaveDays from 'screens/leave/LeaveDays';
import LeaveComments from 'screens/leave/LeaveComments';
import {
  MY_LEAVE_ENTITLEMENT_AND_USAGE,
  MY_LEAVE,
  MY_LEAVE_DETAILS,
  LEAVE_DAYS,
  LEAVE_COMMENTS,
} from 'screens';
import HeaderMenuIcon from 'components/HeaderMenuIcon';
import HeaderBackIcon from 'components/HeaderBackIcon';
import {getHeaderStyle} from 'lib/helpers/header';
import {LeaveRequestDetailedModel} from 'store/leave/leave-list/types';
import {LeaveDaysParamList, LeaveCommentsParam} from 'screens/leave/navigators';

const Stack = createStackNavigator<MyLeaveUsageNavigatorParamList>();

class MyLeaveUsageNavigator extends React.Component<MyLeaveUsageNavigatorProps> {
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
        initialRouteName={MY_LEAVE_ENTITLEMENT_AND_USAGE}
        screenOptions={{
          ...header,
          ...headerBackIcon,
          keyboardHandlingEnabled: false,
        }}>
        <Stack.Screen
          name={MY_LEAVE_ENTITLEMENT_AND_USAGE}
          component={MyLeaveEntitilementsAndUsage}
          options={{
            title: 'My Leave Usage',
            ...headerMenuIcon,
          }}
        />
        <Stack.Screen
          name={MY_LEAVE}
          component={MyLeave}
          options={{
            title: 'My Leave',
          }}
        />
        <Stack.Screen
          name={MY_LEAVE_DETAILS}
          component={MyLeaveDetails}
          options={{
            title: 'Leave Details',
          }}
        />
        <Stack.Screen
          name={LEAVE_DAYS}
          component={LeaveDays}
          options={{
            title: 'Leave Days',
          }}
        />
        <Stack.Screen
          name={LEAVE_COMMENTS}
          component={LeaveComments}
          options={{
            title: 'Comments',
          }}
        />
      </Stack.Navigator>
    );
  }
}

interface MyLeaveUsageNavigatorProps extends WithTheme {
  navigation: NavigationProp<ParamListBase>;
}

export type MyLeaveUsageNavigatorParamList = {
  [MY_LEAVE_ENTITLEMENT_AND_USAGE]: {};
  [MY_LEAVE]: {};
  [MY_LEAVE_DETAILS]: MyLeaveDetailsParam;
  [LEAVE_COMMENTS]: LeaveCommentsParam;
} & LeaveDaysParamList;

export interface MyLeaveDetailsParam {
  leaveRequest: LeaveRequestDetailedModel;
}

export default withTheme<MyLeaveUsageNavigatorProps>()(MyLeaveUsageNavigator);
