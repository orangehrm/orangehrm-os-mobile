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
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
  ActivityIndicator,
  View,
} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

export interface CustomButtonProps extends WithTheme {
  children?: React.ReactNode;
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  active?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];

  // Size variants
  large?: boolean;
  small?: boolean;
  block?: boolean;

  // Style variants
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  danger?: boolean;
  warning?: boolean;
  info?: boolean;

  // Visual variants
  transparent?: boolean;
  bordered?: boolean;
  rounded?: boolean;
  vertical?: boolean;

  // Icon variants
  icon?: boolean;
  iconLeft?: boolean;
  iconRight?: boolean;

  // Other props
  color?: string;
  badge?: boolean;
  inputButton?: boolean;
  androidRippleColor?: string;

  // Loading state
  loading?: boolean;
  loadingColor?: string;

  // Test props
  testID?: string;
}

const CustomButton = (props: CustomButtonProps) => {
  const {
    children,
    title,
    onPress,
    disabled = false,
    style,
    textStyle,
    large = false,
    small = false,
    block = false,
    primary = false,
    secondary = false,
    success = false,
    danger = false,
    warning = false,
    info = false,
    transparent = false,
    bordered = false,
    rounded = false,
    vertical = false,
    icon = false,
    color,
    inputButton = false,
    loading = false,
    loadingColor,
    theme,
    testID,
    ...restProps
  } = props;

  // Determine button color based on style variants
  let buttonColor: string | undefined;
  let textColor: string | undefined;

  if (transparent) {
    buttonColor = 'transparent';
    textColor = color || theme.palette.primary;
  } else if (bordered) {
    buttonColor = 'transparent';
    textColor =
      color ||
      getVariantColor(
        primary,
        secondary,
        success,
        danger,
        warning,
        info,
        theme,
      );
  } else if (color) {
    buttonColor = color;
    textColor = theme.typography.primaryColor;
  } else {
    buttonColor = getVariantColor(
      primary,
      secondary,
      success,
      danger,
      warning,
      info,
      theme,
    );
    textColor = theme.typography.primaryColor;
  }

  // Determine text color for different variants
  if (primary || secondary || success || danger || warning || info) {
    textColor = theme.typography.primaryColor;
  }

  // Size calculations
  const paddingVertical = large ? 16 : small ? 8 : 12;
  const paddingHorizontal = large ? 24 : small ? 12 : 16;
  const fontSize = large ? 16 : small ? 12 : 14;
  const borderRadius = rounded ? 25 : theme.borderRadius;

  // Button styles
  const buttonStyles: ViewStyle[] = [
    styles.button,
    {
      backgroundColor: buttonColor,
      paddingVertical,
      paddingHorizontal,
      borderRadius,
      borderWidth: bordered ? 1 : 0,
      borderColor: bordered ? textColor : 'transparent',
      opacity: disabled ? 0.6 : 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: vertical ? 'column' : 'row',
    },
    ...(block ? [styles.block] : []),
    ...(icon ? [styles.iconButton] : []),
    ...(inputButton ? [styles.inputButton] : []),
    ...(Array.isArray(style) ? style : style ? [style] : []),
  ];

  // Text styles
  const textStyles: TextStyle[] = [
    styles.text,
    {
      color: textColor,
      fontSize,
      fontWeight: '600',
    },
    ...(Array.isArray(textStyle) ? textStyle : textStyle ? [textStyle] : []),
  ];

  // Handle press events
  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  // Render content
  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="small"
            color={loadingColor || textColor}
            style={styles.loadingIndicator}
          />
          {title && <Text style={textStyles}>{title}</Text>}
        </View>
      );
    }

    if (children) {
      return children;
    }

    if (title) {
      return <Text style={textStyles}>{title}</Text>;
    }

    return null;
  };

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      testID={testID}
      {...restProps}>
      {renderContent()}
    </TouchableOpacity>
  );
};

// Helper function to get variant color
const getVariantColor = (
  primary: boolean,
  secondary: boolean,
  success: boolean,
  danger: boolean,
  warning: boolean,
  info: boolean,
  theme: any,
): string => {
  if (primary) {
    return theme.palette.primary;
  }
  if (secondary) {
    return theme.palette.secondary;
  }
  if (success) {
    return theme.palette.success || '#28a745';
  }
  if (danger) {
    return theme.palette.danger || '#dc3545';
  }
  if (warning) {
    return theme.palette.warning || '#ffc107';
  }
  if (info) {
    return theme.palette.info || '#17a2b8';
  }
  return theme.palette.default;
};

const styles = StyleSheet.create({
  button: {
    ...Platform.select({
      ios: {
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowColor: 'black',
        shadowOffset: {height: 1, width: 0},
      },
      android: {
        // elevation: 2,
      },
    }),
  },
  block: {
    width: '100%',
  },
  iconButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    minWidth: 48,
    minHeight: 48,
  },
  inputButton: {
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  text: {
    textAlign: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIndicator: {
    marginRight: 8,
  },
});

export default withTheme<CustomButtonProps>()(CustomButton);
