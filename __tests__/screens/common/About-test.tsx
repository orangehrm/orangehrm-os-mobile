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
import React from 'react';
import {Provider} from 'react-redux';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {render, fireEvent} from 'react-native-testing-library';
import configureStore from 'store/configureStore';
import About from 'screens/common/About';
import {LICENSES, TITLE_LICENSES} from 'screens';
import {version} from '../../../package.json';
import {displayName} from '../../../app.json';

const mockStore = configureStore();

const renderAbout = (navigate: jest.Mock) =>
  render(
    <Provider store={mockStore}>
      <About
        navigation={
          {navigate: navigate} as unknown as NavigationProp<ParamListBase>
        }
      />
    </Provider>,
  );

describe('screens/common/About', () => {
  test('test About::app name, version and copyright', () => {
    const {queryByText} = renderAbout(jest.fn());

    expect(queryByText(displayName)).not.toBeNull();
    expect(queryByText(`Version ${version}`)).not.toBeNull();
    expect(
      queryByText(`© 2005 - ${new Date().getFullYear()} OrangeHRM, Inc.`),
    ).not.toBeNull();
    expect(queryByText('All Rights Reserved.')).not.toBeNull();
  });

  test('test About::navigate to licenses', () => {
    const navigate = jest.fn();
    const {getByText} = renderAbout(navigate);

    fireEvent.press(getByText(TITLE_LICENSES));
    expect(navigate).toHaveBeenCalledWith(LICENSES);
  });
});
