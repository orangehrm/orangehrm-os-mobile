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
import {StyleSheet, Platform} from 'react-native';
import CustomButton from './CustomButton';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

const CardButton = (props: React.PropsWithChildren<CardButtonProps>) => {
  const {children, theme, style, ...restProps} = props;

  return (
    <CustomButton
      style={[
        styles.button,
        {
          backgroundColor: theme.palette.background,
          borderRadius: theme.borderRadius * 2,
        },
        ...(Array.isArray(style) ? style : style ? [style] : []),
      ]}
      rounded
      androidRippleColor={theme.palette.default}
      {...restProps}>
      {children}
    </CustomButton>
  );
};

export interface CardButtonProps
  extends React.ComponentProps<typeof CustomButton>,
    WithTheme {}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'stretch',
    ...Platform.select({
      ios: {
        shadowOpacity: 0.5,
        shadowRadius: 1,
        shadowColor: 'black',
        shadowOffset: {height: 0.5, width: 0},
        elevation: 2,
        alignItems: 'center',
      },
      android: {
        elevation: 2,
      },
    }),
  },
});

export default withTheme<CardButtonProps>()(CardButton);
