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
  View,
  ViewProps,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

interface CustomRadioProps
  extends WithTheme,
    Pick<TouchableOpacityProps, 'onPress'>,
    Pick<ViewProps, 'style'> {
  selected?: boolean;
  color?: string;
  selectedColor?: string;
  size?: number;
  disabled?: boolean;
}

function CustomRadio(props: CustomRadioProps) {
  const {
    selected = false,
    color,
    selectedColor,
    size = 20,
    disabled = false,
    onPress,
    style,
    theme,
  } = props;

  const radioColor = selected
    ? selectedColor || theme.palette.secondary
    : color || theme.palette.default;
  const radioSize = size;
  const innerCircleSize = radioSize * 0.5;

  const dynamicStyles = {
    outerCircle: {
      width: radioSize,
      height: radioSize,
      borderColor: radioColor,
      borderWidth: 2,
      borderRadius: radioSize / 2,
    },
    innerCircle: {
      width: innerCircleSize,
      height: innerCircleSize,
      backgroundColor: radioColor,
      borderRadius: innerCircleSize / 2,
    },
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, style]}
      activeOpacity={0.7}>
      <View style={[styles.outerCircle, dynamicStyles.outerCircle]}>
        {selected && (
          <View style={[styles.innerCircle, dynamicStyles.innerCircle]} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    position: 'absolute',
  },
});

export default withTheme<CustomRadioProps>()(CustomRadio);
