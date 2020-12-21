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
import FullScreenInfo from 'screens/common/FullScreenInfo';
import {FULL_SCREEN_INFO} from 'screens';
import HeaderMenuIcon from 'components/HeaderMenuIcon';
import {getHeaderStyle} from 'lib/helpers/header';

const Stack = createStackNavigator<FullScreenInfoNavigatorParamList>();

class FullScreenInfoNavigator extends React.Component<FullScreenInfoNavigatorProps> {
  render() {
    const {theme, navigation} = this.props;
    const header = getHeaderStyle(theme);
    const headerMenuIcon = {
      headerLeft: () => <HeaderMenuIcon navigation={navigation} />,
    };

    return (
      <Stack.Navigator
        initialRouteName={FULL_SCREEN_INFO}
        screenOptions={{
          ...header,
          ...headerMenuIcon,
        }}
        keyboardHandlingEnabled={false}>
        <Stack.Screen
          name={FULL_SCREEN_INFO}
          component={FullScreenInfo}
          options={{
            title: '',
          }}
        />
      </Stack.Navigator>
    );
  }
}

interface FullScreenInfoNavigatorProps extends WithTheme {
  navigation: NavigationProp<ParamListBase>;
}

export type FullScreenInfoNavigatorParamList = {
  [FULL_SCREEN_INFO]: {};
};

export default withTheme<FullScreenInfoNavigatorProps>()(
  FullScreenInfoNavigator,
);
