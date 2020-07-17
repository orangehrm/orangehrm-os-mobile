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
import {Platform} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  StackActions,
} from '@react-navigation/native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import IconButton from 'components/DefaultIconButton';

const HeaderBackIcon = (props: HeaderBackIconProps) => {
  const {theme} = props;
  return (
    <IconButton
      buttonProps={{
        onPress: () => {
          props.navigation.dispatch(StackActions.pop());
        },
      }}
      iconProps={{
        name: Platform.OS === 'ios' ? 'ios-arrow-back' : 'arrow-back',
        type: Platform.OS === 'ios' ? 'Ionicons' : 'MaterialIcons',
        style: {
          fontSize: theme.typography.headerIconSize,
          color: theme.typography.secondaryColor,
        },
      }}
    />
  );
};

interface HeaderBackIconProps extends WithTheme {
  navigation: NavigationProp<ParamListBase>;
}

export default withTheme<HeaderBackIconProps>()(HeaderBackIcon);
