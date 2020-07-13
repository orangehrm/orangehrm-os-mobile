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
import {
  APPLY_LEAVE,
  PICK_LEAVE_REQUEST_DAYS_CALENDAR,
  PICK_LEAVE_REQUEST_DURATION,
  PICK_LEAVE_REQUEST_PARTIAL_DAYS,
} from 'screens';
import HeaderMenuIcon from 'components/HeaderMenuIcon';
import HeaderBackIcon from 'components/HeaderBackIcon';
import {getHeaderStyle} from 'lib/helpers/header';

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
      <Stack.Navigator initialRouteName={APPLY_LEAVE}>
        <Stack.Screen
          name={APPLY_LEAVE}
          component={ApplyLeave}
          options={{
            title: 'Apply Leave',
            ...header,
            ...headerMenuIcon,
          }}
        />
        <Stack.Screen
          name={PICK_LEAVE_REQUEST_DAYS_CALENDAR}
          component={PickLeaveRequestDaysCalendar}
          options={{
            title: 'Request Day(s)',
            ...header,
            ...headerBackIcon,
          }}
          initialParams={{parent: APPLY_LEAVE}}
        />
        <Stack.Screen
          name={PICK_LEAVE_REQUEST_DURATION}
          component={PickLeaveRequestDuration}
          options={{
            title: 'Duration',
            ...header,
            ...headerBackIcon,
          }}
          initialParams={{parent: APPLY_LEAVE}}
        />
        <Stack.Screen
          name={PICK_LEAVE_REQUEST_PARTIAL_DAYS}
          component={PickLeaveRequestPartialDays}
          options={{
            title: 'Partial Days',
            ...header,
            ...headerBackIcon,
          }}
          initialParams={{parent: APPLY_LEAVE}}
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
  [PICK_LEAVE_REQUEST_DAYS_CALENDAR]: {
    parent: string;
  };
  [PICK_LEAVE_REQUEST_DURATION]: {
    parent: string;
  };
  [PICK_LEAVE_REQUEST_PARTIAL_DAYS]: {
    parent: string;
  };
};

export default withTheme<ApplyLeaveNavigatorProps>()(ApplyLeaveNavigator);
