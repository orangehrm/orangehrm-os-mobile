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

import 'react-native';
import {getHeaderStyle} from 'lib/helpers/header';
import theme from 'theme/default';

describe('lib/helpers/header', () => {
  test('check return object', () => {
    const headerStyle = getHeaderStyle(theme);
    expect(headerStyle).toStrictEqual({
      headerStyle: {
        backgroundColor: theme.palette.header,
      },
      headerTitleStyle: {
        fontSize: theme.typography.headerFontSize,
        color: theme.typography.secondaryColor,
        marginLeft: -theme.spacing * 2,
      },
    });
  });
});
