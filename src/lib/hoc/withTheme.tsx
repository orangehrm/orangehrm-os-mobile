/**
 * OrangeHRM is a comprehensive Human Resource Management (HRM) System that captures
 * all the essential functionalities required for any enterprise.
 * Copyright (C) 2006 OrangeHRM Inc., http://www.orangehrm.com
 *
 * OrangeHRM is free software; you can redistribute it and/or modify it under the terms of
 * the GNU General Public License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * OrangeHRM is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program;
 * if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
 * Boston, MA  02110-1301, USA
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
