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
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Item, Input, Icon, Label, NativeBase} from 'native-base';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import Text from 'components/DefaultText';

function StandardTextField(
  props: React.PropsWithChildren<StandardTextFieldProps>,
) {
  const {label, iconName, style, theme, helperText, itemProps, ...restProps} =
    props;
  return (
    <View style={style}>
      <Item floatingLabel style={styles.item} {...itemProps}>
        <Label
          style={[
            iconName === undefined
              ? undefined
              : {paddingLeft: theme.spacing * 8},
          ]}>
          {label}
        </Label>
        <Input {...restProps} />
        {iconName === undefined ? null : (
          <Icon
            active
            name={iconName}
            type="MaterialCommunityIcons"
            style={{
              color: theme.typography.primaryColor,
              fontSize: theme.typography.iconSize,
            }}
          />
        )}
      </Item>
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

interface StandardTextFieldProps extends NativeBase.Input, WithTheme {
  label: string;
  iconName?: string;
  style?: StyleProp<ViewStyle>;
  helperText?: string;
  itemProps?: NativeBase.Item;
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row-reverse',
  },
});

export default withTheme<StandardTextFieldProps>()(StandardTextField);
