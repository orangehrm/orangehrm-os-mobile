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
import {NativeBase} from 'native-base';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconZocial from 'react-native-vector-icons/Zocial';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconFontisto from 'react-native-vector-icons/Fontisto';

import withTheme, {WithTheme} from 'lib/hoc/withTheme';

// Icon type mapping
const iconMap = {
  MaterialCommunityIcons: IconMaterialCommunityIcons,
  FontAwesome: IconFontAwesome,
  FontAwesome5: IconFontAwesome5,
  Ionicons: IconIonicons,
  MaterialIcons: IconMaterialIcons,
  Entypo: IconEntypo,
  Feather: IconFeather,
  AntDesign: IconAntDesign,
  SimpleLineIcons: IconSimpleLineIcons,
  Octicons: IconOcticons,
  Zocial: IconZocial,
  Foundation: IconFoundation,
  EvilIcons: IconEvilIcons,
  Fontisto: IconFontisto,
} as const;

function DefaultIcon(props: IconProps) {
  const {theme, style, ...restProps} = props;

  // Get the icon component or default to MaterialCommunityIcons
  const IconComponent =
    iconMap[restProps.type as keyof typeof iconMap] ||
    IconMaterialCommunityIcons;

  // Common styles
  const iconStyle = [
    {
      color: theme.typography.primaryColor,
      fontSize: theme.typography.iconSize,
    },
    style,
  ];

  return <IconComponent name={restProps.name || 'home'} style={iconStyle} />;
}

export interface IconProps extends NativeBase.Icon, WithTheme {}

export default withTheme<IconProps>()(DefaultIcon);
