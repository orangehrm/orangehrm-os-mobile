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
import {View, StyleSheet, ViewProps} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

function DeafultCard(props: React.PropsWithChildren<DeafultCardProps>) {
  const {children, fullWidth, theme, style, ...restProps} = props;
  return (
    <View
      style={[
        styles.cardStyle,
        fullWidth ? styles.fullWidth : undefined,
        {
          borderRadius: theme.borderRadius,
          backgroundColor: theme.palette.background,
        },
        style,
      ]}
      {...restProps}>
      {children}
    </View>
  );
}

interface DeafultCardProps extends ViewProps, WithTheme {
  fullWidth?: boolean;
}

const styles = StyleSheet.create({
  cardStyle: {
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOffset: {height: 0.5, width: 0},
    elevation: 2,
  },
  fullWidth: {
    width: '100%',
  },
});

export default withTheme<DeafultCardProps>()(DeafultCard);
