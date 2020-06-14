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
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

function DefaultButton(props: DefaultButtonProps) {
  const {title, primary, style, theme, ...restProps} = props;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {padding: theme.spacing * 2, backgroundColor: theme.palette.default},
        primary ? {backgroundColor: theme.palette.primary} : undefined,
        style,
      ]}
      {...restProps}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

interface DefaultButtonProps extends TouchableOpacityProps, WithTheme {
  title: string;
  primary?: boolean;
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
  },
});

export default withTheme<DefaultButtonProps>()(DefaultButton);
