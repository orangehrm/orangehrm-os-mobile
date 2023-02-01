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

import {prepare} from 'services/endpoints';

describe('services/endpoints', () => {
  test('prepare::check happy path', () => {
    let result = prepare('/api/v1/leave/leave-request/{id}', {id: '10'});
    expect(result).toBe('/api/v1/leave/leave-request/10');

    result = prepare('/api/v1/leave/leave-request/{id}', {id: 10});
    expect(result).toBe('/api/v1/leave/leave-request/10');

    result = prepare(
      '/api/v1/leave/leave-request/{id}',
      {id: 10},
      {query: 'param'},
    );
    expect(result).toBe('/api/v1/leave/leave-request/10?query=param');

    result = prepare('/api/v1/leave/leave-request', {}, {query: true});
    expect(result).toBe('/api/v1/leave/leave-request?query=true');
  });

  test('prepare::check with invalid param', () => {
    expect(() => {
      prepare('/api/v1/leave/leave-request/{id}', {idx: 10});
    }).toThrow('Invalid parameter.');
  });

  test('prepare::check with array of query params', () => {
    const result = prepare(
      '/api/v1/leave/leave-request',
      {},
      {param1: 'param1_val', param2: ['param2_val1', 'param2_val2']},
    );
    expect(result).toBe(
      encodeURI(
        '/api/v1/leave/leave-request?param1=param1_val&param2[]=param2_val1&param2[]=param2_val2',
      ),
    );
  });
});
