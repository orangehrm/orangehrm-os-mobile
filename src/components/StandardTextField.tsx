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

import React, {useState} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle, TextInput} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import Text from 'components/DefaultText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function StandardTextField(
  props: React.PropsWithChildren<StandardTextFieldProps>,
) {
  const {label, iconName, style, theme, helperText, itemProps, ...restProps} =
    props;
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(
    restProps.value || restProps.defaultValue || '',
  );

  const showLabel = isFocused || value.length > 0;

  return (
    <View style={style}>
      <View style={styles.inputContainer}>
        {showLabel && (
          <Text
            style={[
              styles.floatingLabel,
              {color: theme.typography.primaryColor},
            ]}>
            {label}
          </Text>
        )}
        <View
          style={[styles.inputGroup, itemProps?.error && styles.errorBorder]}>
          <TextInput
            {...restProps}
            placeholder={showLabel ? '' : label}
            onFocus={(e) => {
              setIsFocused(true);
              restProps.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              restProps.onBlur?.(e);
            }}
            onChangeText={(text) => {
              setValue(text);
              restProps.onChangeText?.(text);
            }}
            style={[
              styles.textInput,
              iconName === undefined
                ? undefined
                : {paddingLeft: theme.spacing * 8},
            ]}
          />
          {iconName === undefined ? null : (
            <Icon
              name={iconName}
              style={{
                color: theme.typography.primaryColor,
                fontSize: theme.typography.iconSize,
              }}
            />
          )}
        </View>
      </View>
      {helperText === undefined ? null : (
        <Text
          style={[
            {fontSize: theme.typography.smallFontSize},
            itemProps?.error ? {color: theme.palette.error} : undefined,
          ]}>
          {helperText}
        </Text>
      )}
    </View>
  );
}

interface StandardTextFieldProps
  extends React.ComponentProps<typeof TextInput>,
    WithTheme {
  label: string;
  iconName?: string;
  style?: StyleProp<ViewStyle>;
  helperText?: string;
  itemProps?: {
    error?: boolean;
    [key: string]: any;
  };
}

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  floatingLabel: {
    position: 'absolute',
    top: -8,
    left: 12,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    fontSize: 12,
    zIndex: 1,
  },
  errorBorder: {
    borderBottomColor: 'red',
  },
});

export default withTheme<StandardTextFieldProps>()(StandardTextField);
