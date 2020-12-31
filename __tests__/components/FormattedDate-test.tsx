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
import Text from 'components/DefaultText';
import FormattedDate from 'components/FormattedDate';
import {Provider} from 'react-redux';
import configureStore from 'store/configureStore';
import {render} from 'react-native-testing-library';
const mockStore = configureStore();

describe('components/FormattedDate', () => {
  test('test FormattedDate component', () => {
    const node = render(
      <Provider store={mockStore}>
        <FormattedDate>{'2020-12-20'}</FormattedDate>
      </Provider>,
    ).toJSON();
    expect(node).toMatchSnapshot();
  });

  test('test FormattedDate component: check undefined', () => {
    const node = render(
      <Provider store={mockStore}>
        <FormattedDate>{undefined}</FormattedDate>
      </Provider>,
    ).toJSON();
    expect(node).toMatchSnapshot();
  });

  test('test FormattedDate component: check string', () => {
    const node = render(
      <Provider store={mockStore}>
        <FormattedDate>{'Test'}</FormattedDate>
      </Provider>,
    ).toJSON();
    expect(node).toMatchSnapshot();
  });

  test('test FormattedDate component: check nested', () => {
    const node = render(
      <Provider store={mockStore}>
        <Text style={{color: 'orange'}}>
          <FormattedDate>{'2020-12-20'}</FormattedDate>
        </Text>
        <Text style={{color: 'orange'}}>
          <FormattedDate nested>{'2020-12-20'}</FormattedDate>
          {' to '}
          <FormattedDate nested>{'2020-12-21'}</FormattedDate>
        </Text>
      </Provider>,
    ).toJSON();
    expect(node).toMatchSnapshot();
  });
});
