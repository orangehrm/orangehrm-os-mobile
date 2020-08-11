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
  TextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import useTheme from 'lib/hook/useTheme';

const DefaultTextInput = React.forwardRef<
  TextInput,
  React.PropsWithChildren<TextInputProps>
>((props, ref) => {
  const {viewProps, ...inputProps} = props;
  const theme = useTheme();
  return (
    <View {...viewProps}>
      <TextInput
        ref={ref}
        {...inputProps}
        style={[
          {
            fontSize: theme.typography.fontSize,
            color: theme.typography.primaryColor,
          },
          inputProps.style,
        ]}
      />
    </View>
  );
});

export interface TextInputProps extends RNTextInputProps {
  viewProps?: ViewProps;
}

export default DefaultTextInput;
