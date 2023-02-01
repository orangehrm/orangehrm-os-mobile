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
import View from 'components/HideableView';
import {render} from 'react-native-testing-library';

describe('components/HideableView', () => {
  test('test HideableView component::default', () => {
    const node = render(
      <View style={{backgroundColor: 'orange'}}>
        <View>
          <View style={{backgroundColor: 'orange'}} />
        </View>
      </View>,
    ).toJSON();
    expect(node).toMatchSnapshot();
  });

  test('test HideableView component::visible true', () => {
    const node = render(
      <View style={{backgroundColor: 'orange'}}>
        <View isVisible={true}>
          <View style={{backgroundColor: 'orange'}} />
        </View>
      </View>,
    ).toJSON();
    expect(node).toMatchSnapshot();
  });

  test('test HideableView component::visible false', () => {
    const node = render(
      <View style={{backgroundColor: 'orange'}}>
        <View isVisible={false}>
          <View style={{backgroundColor: 'orange'}} />
        </View>
      </View>,
    ).toJSON();
    expect(node).toMatchSnapshot();
  });
});
