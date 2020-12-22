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
import Punch from 'screens/time/Punch';
import PunchRequestSuccess from 'screens/time/PunchRequestSuccess';
import {RootState} from 'store';
import {connect, ConnectedProps} from 'react-redux';
import {selectPunchStatus} from 'store/time/punch/selectors';
import {PUNCHED_IN} from 'store/time/punch/types';
import {PUNCH, PUNCH_REQUEST_SUCCESS} from 'screens';
import HeaderMenuIcon from 'components/HeaderMenuIcon';
import HeaderBackIcon from 'components/HeaderBackIcon';
import {getHeaderStyle} from 'lib/helpers/header';

const Stack = createStackNavigator();

class PunchNavigator extends React.Component<PunchNavigatorProps> {
  render() {
    const {theme, navigation, punchStatus} = this.props;
    const header = getHeaderStyle(theme);
    const headerMenuIcon = {
      headerLeft: () => <HeaderMenuIcon navigation={navigation} />,
    };
    const headerBackIcon = {
      headerLeft: () => <HeaderBackIcon navigation={navigation} />,
    };
    return (
      <Stack.Navigator
        initialRouteName={PUNCH}
        screenOptions={{
          ...header,
          ...headerBackIcon,
        }}
        keyboardHandlingEnabled={false}>
        <Stack.Screen
          name={PUNCH}
          component={Punch}
          options={{
            title:
              punchStatus?.punchState === PUNCHED_IN ? 'Punch Out' : 'Punch In',
            ...headerMenuIcon,
          }}
        />
        <Stack.Screen
          name={PUNCH_REQUEST_SUCCESS}
          component={PunchRequestSuccess}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
}

interface PunchNavigatorProps
  extends WithTheme,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

const mapStateToProps = (state: RootState) => ({
  punchStatus: selectPunchStatus(state),
});

const connector = connect(mapStateToProps);

const PunchNavigatorTheme = withTheme<PunchNavigatorProps>()(PunchNavigator);

export default connector(PunchNavigatorTheme);
