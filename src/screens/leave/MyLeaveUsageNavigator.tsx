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
import {
  NavigationProp,
  ParamListBase,
  DrawerActions,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import MyLeaveEntitilementsAndUsage from 'screens/leave/MyLeaveUsage';
import {MY_LEAVE_ENTITLEMENT_AND_USAGE} from 'screens';
import IconButton from 'components/DefaultIconButton';

const Stack = createStackNavigator();

class MyLeaveUsageNavigator extends React.Component<
  MyLeaveUsageNavigatorProps
> {
  render() {
    const {theme, navigation} = this.props;
    const header = {
      headerStyle: {
        backgroundColor: theme.palette.header,
      },
      headerTitleStyle: {
        fontSize: theme.typography.headerFontSize,
        color: theme.typography.secondaryColor,
        marginLeft: -theme.spacing * 2,
      },
      headerLeft: () => (
        <IconButton
          buttonProps={{
            onPress: () => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            },
          }}
          iconProps={{
            name: 'menu',
            style: {
              fontSize: theme.typography.headerIconSize,
              color: theme.typography.secondaryColor,
            },
          }}
        />
      ),
    };

    return (
      <Stack.Navigator initialRouteName={MY_LEAVE_ENTITLEMENT_AND_USAGE}>
        <Stack.Screen
          name={MY_LEAVE_ENTITLEMENT_AND_USAGE}
          component={MyLeaveEntitilementsAndUsage}
          options={{
            title: 'My Leave Usage',
            ...header,
          }}
        />
      </Stack.Navigator>
    );
  }
}

interface MyLeaveUsageNavigatorProps
  extends WithTheme,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withTheme<MyLeaveUsageNavigatorProps>()(
  connector(MyLeaveUsageNavigator),
);
