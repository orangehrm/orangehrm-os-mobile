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
import Date from 'components/FormatedDate';
import {Provider} from 'react-redux';
import configureStore from 'store/configureStore';
import {render} from 'react-native-testing-library';
const mockStore = configureStore();

describe('components/FormatedDate', () => {
  test('test FormatedDate component', () => {
    const node = render(
      <Provider store={mockStore}>
        <Date>{'2020-12-20'}</Date>
      </Provider>,
    ).toJSON();
    expect(node).toMatchSnapshot();
  });

  test('test FormatedDate component: check undefined', () => {
    const node = render(
      <Provider store={mockStore}>
        <Date>{undefined}</Date>
      </Provider>,
    ).toJSON();
    expect(node).toMatchSnapshot();
  });

  test('test FormatedDate component: check string', () => {
    const node = render(
      <Provider store={mockStore}>
        <Date>{'Test'}</Date>
      </Provider>,
    ).toJSON();
    expect(node).toMatchSnapshot();
  });

  test('test FormatedDate component: check nested', () => {
    const node = render(
      <Provider store={mockStore}>
        <Text style={{color: 'orange'}}>
          <Date>{'2020-12-20'}</Date>
        </Text>
        <Text style={{color: 'orange'}}>
          <Date nested>{'2020-12-20'}</Date>
          {' to '}
          <Date nested>{'2020-12-21'}</Date>
        </Text>
      </Provider>,
    ).toJSON();
    expect(node).toMatchSnapshot();
  });
});
