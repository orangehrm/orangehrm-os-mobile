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
import ProfilePicture from 'components/ProfilePicture';
import {Provider} from 'react-redux';
import configureStore from 'store/configureStore';
import {render} from 'react-native-testing-library';
const mockStore = configureStore();

describe('components/ProfilePicture', () => {
  test('test ProfilePicture component', () => {
    const node = render(
      <Provider store={mockStore}>
        <ProfilePicture
          employee={{
            empNumber: 1,
            employeeId: '0001',
            firstName: 'Abbey',
            lastName: 'Kyla',
            middleName: '',
            jobTitle: {id: 2, title: 'Accountant', isDeleted: false},
            subunit: {id: null, name: null},
            terminationId: null,
          }}
        />
      </Provider>,
    ).toJSON();
    expect(node).toMatchSnapshot();
  });

  test('test ProfilePicture component: terminated employee', () => {
    const node = render(
      <Provider store={mockStore}>
        <ProfilePicture
          employee={{
            empNumber: 10,
            employeeId: '0005',
            firstName: 'Lynda',
            lastName: 'Jane',
            middleName: '',
            jobTitle: {id: 6, title: 'Manager', isDeleted: false},
            subunit: {id: null, name: null},
            terminationId: 2,
          }}
        />
      </Provider>,
    ).toJSON();
    expect(node).toMatchSnapshot();
  });
});
