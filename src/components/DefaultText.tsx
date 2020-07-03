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
import {Text, TextProps, StyleSheet} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

function DefaultText(props: React.PropsWithChildren<DefaultTextProps>) {
  const {children, style, theme, bold, ...restProps} = props;
  return (
    <Text
      style={[
        {color: theme.typography.primaryColor},
        bold ? styles.textBold : undefined,
        style,
      ]}
      {...restProps}>
      {children}
    </Text>
  );
}

interface DefaultTextProps extends TextProps, WithTheme {
  bold?: boolean;
}

const styles = StyleSheet.create({
  textBold: {
    fontWeight: 'bold',
  },
});

export default withTheme<DefaultTextProps>()(DefaultText);
