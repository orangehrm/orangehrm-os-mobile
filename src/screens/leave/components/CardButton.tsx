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
import {Button, NativeBase} from 'native-base';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

const CardButton = (props: React.PropsWithChildren<CardButtonProps>) => {
  const {children, theme, style, ...restProps} = props;

  return (
    <Button
      style={[
        {
          backgroundColor: theme.palette.background,
          borderRadius: theme.borderRadius * 2,
        },
        style,
      ]}
      androidRippleColor={theme.palette.default}
      {...restProps}>
      {children}
    </Button>
  );
};

interface CardButtonProps extends NativeBase.Button, WithTheme {}

export default withTheme<CardButtonProps>()(CardButton);
