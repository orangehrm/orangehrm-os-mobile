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
import {MY_LEAVE_ENTITLEMENT_AND_USAGE, MY_LEAVE} from 'screens';
import HeaderMenuIcon from 'components/HeaderMenuIcon';
import HeaderBackIcon from 'components/HeaderBackIcon';
import {getHeaderStyle} from 'lib/helpers/header';

const Stack = createStackNavigator();

class MyLeaveUsageNavigator extends React.Component<
  MyLeaveUsageNavigatorProps
> {
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
        }}
        keyboardHandlingEnabled={false}>
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
      </Stack.Navigator>
    );
  }
}

interface MyLeaveUsageNavigatorProps extends WithTheme {
  navigation: NavigationProp<ParamListBase>;
}

export default withTheme<MyLeaveUsageNavigatorProps>()(MyLeaveUsageNavigator);
