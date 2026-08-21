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
import About from 'screens/common/About';
import Licenses from 'screens/common/Licenses';
import {ABOUT, LICENSES, MENU_ITEM_ABOUT, TITLE_LICENSES} from 'screens';
import HeaderMenuIcon from 'components/HeaderMenuIcon';
import HeaderBackIcon from 'components/HeaderBackIcon';
import {getHeaderStyle} from 'lib/helpers/header';

const Stack = createStackNavigator();

class AboutNavigator extends React.Component<AboutNavigatorProps> {
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
        initialRouteName={ABOUT}
        screenOptions={{
          ...header,
          ...headerBackIcon,
          keyboardHandlingEnabled: false,
        }}>
        <Stack.Screen
          name={ABOUT}
          component={About}
          options={{
            title: MENU_ITEM_ABOUT,
            ...headerMenuIcon,
          }}
        />
        <Stack.Screen
          name={LICENSES}
          component={Licenses}
          options={{
            title: TITLE_LICENSES,
            ...headerBackIcon,
          }}
        />
      </Stack.Navigator>
    );
  }
}

interface AboutNavigatorProps extends WithTheme {
  navigation: NavigationProp<ParamListBase>;
}

const AboutNavigatorTheme = withTheme<AboutNavigatorProps>()(AboutNavigator);

export default AboutNavigatorTheme;
