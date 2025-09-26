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
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'components/DefaultIcon';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

type FabPosition = 'bottomRight' | 'bottomLeft' | 'topRight' | 'topLeft';

interface DefaultFabProps extends TouchableOpacityProps, WithTheme {
  iconName: string;
  primary?: boolean;
  secondary?: boolean;
  position?: FabPosition;
  containerStyle?: ViewStyle;
  size?: 'small' | 'large' | 'regular';
}

const DefaultFab = (props: DefaultFabProps) => {
  const {
    iconName,
    primary,
    secondary,
    theme,
    style,
    containerStyle,
    position = 'bottomRight',
    size = 'regular',
    ...restProps
  } = props;
  const insets = useSafeAreaInsets();

  // Determine FAB color
  let backgroundColor: string = theme.palette.default;
  if (primary) {
    backgroundColor = theme.palette.primary;
  } else if (secondary) {
    backgroundColor = theme.palette.secondary;
  }

  // Size calculations
  const fabSize = size === 'small' ? 40 : size === 'large' ? 64 : 56;
  const iconSize = size === 'small' ? 20 : size === 'large' ? 28 : 24;

  // Position styles
  const getPositionStyle = (): ViewStyle => {
    const spacing = theme.spacing * 4;
    const bottomSpacing = spacing + insets.bottom;
    switch (position) {
      case 'bottomRight':
        return {
          position: 'absolute',
          bottom: bottomSpacing,
          right: spacing,
        };
      case 'bottomLeft':
        return {
          position: 'absolute',
          bottom: bottomSpacing,
          left: spacing,
        };
      case 'topRight':
        return {
          position: 'absolute',
          top: spacing,
          right: spacing,
        };
      case 'topLeft':
        return {
          position: 'absolute',
          top: spacing,
          left: spacing,
        };
      default:
        return {
          position: 'absolute',
          bottom: bottomSpacing,
          right: spacing,
        };
    }
  };

  const fabStyles = [
    styles.fab,
    {
      width: fabSize,
      height: fabSize,
      borderRadius: fabSize / 2,
      backgroundColor,
    },
    getPositionStyle(),
    style,
  ].filter(Boolean);

  const containerStyles: ViewStyle[] = [
    styles.container,
    ...(Array.isArray(containerStyle)
      ? containerStyle.filter(Boolean)
      : containerStyle
      ? [containerStyle]
      : []),
  ];

  return (
    <View style={containerStyles}>
      <TouchableOpacity style={fabStyles} activeOpacity={0.8} {...restProps}>
        <Icon
          name={iconName}
          style={{
            fontSize: iconSize,
            color: theme.typography.secondaryColor,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  fab: {
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  fabSpace: {
    // Fab width = height = 56 (regular size)
    padding: 28,
  },
});

export default withTheme<DefaultFabProps>()(DefaultFab);

export const FabSpace = () => {
  return <View style={styles.fabSpace} />;
};
