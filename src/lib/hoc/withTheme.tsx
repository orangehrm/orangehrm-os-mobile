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
import {Subtract} from 'utility-types';
import {shallowEqual, useSelector} from 'react-redux';
import {selectTheme} from 'store/theme/selectors';
import {RootState} from 'store';
import {Theme} from 'theme/default';

const withTheme = <T extends WithTheme = WithTheme>(_options = {}) => {
  return (
    WrappedComponent: React.ComponentType<T>,
  ): React.FC<PropsWithoutTheme<T>> => {
    return (props: PropsWithoutTheme<T>) => {
      const theme = useSelector(
        (state: RootState) => selectTheme(state),
        shallowEqual,
      );
      return <WrappedComponent {...(props as T)} theme={theme} />;
    };
  };
};

export interface WithTheme {
  theme: Theme;
}

type PropsWithoutTheme<T extends WithTheme> = React.PropsWithChildren<
  Subtract<T, WithTheme>
>;

export default withTheme;
