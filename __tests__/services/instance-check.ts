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

import {
  checkInstanceCompatibility,
  checkRemovedEndpoints,
  checkDeprecatedEndpoints,
  isApiCompatible,
} from 'services/instance-check';

const DUMMY_OPEN_API_DEFINITION = {
  openapi: '3.0.3',
  info: {
    title: 'OrangeHRM Open Source : REST api docs',
    version: '1.1.0',
    'x-base-path': '/api/v1',
  },
  paths: {
    '/myinfo': {get: {}},
    '/leave/my-leave-entitlement': {get: {}},
    '/leave/my-leave-request': {get: {}, post: {}},
    '/leave/leave-list': {get: {}},
    '/leave/leave-request/{id}': {get: {}, post: {}},
    '/subordinate/{id}/leave-entitlement': {get: {}},
    '/subordinate/{id}/leave-request': {post: {}},
    '/employees': {get: {}},
    '/leave/holidays': {get: {}},
    '/leave/work-shift': {get: {}},
    '/leave/work-week': {get: {}},
    '/leave/leave-types': {get: {}},
  },
};

describe('services/instance-check', () => {
  test('checkInstanceCompatibility::check correct', () => {
    const result = checkInstanceCompatibility(DUMMY_OPEN_API_DEFINITION);
    expect(result).toBeTruthy();
  });

  test('checkInstanceCompatibility::check with incompatible OrangeHRM API version', () => {
    expect(() => {
      checkInstanceCompatibility({
        ...DUMMY_OPEN_API_DEFINITION,
        info: {...DUMMY_OPEN_API_DEFINITION.info, version: '1.0.0'},
      });
    }).toThrow('Incompatible OrangeHRM API version.');
  });

  test('checkInstanceCompatibility::check with incompatible OpenAPI version', () => {
    expect(() => {
      checkInstanceCompatibility({
        ...DUMMY_OPEN_API_DEFINITION,
        openapi: '2.0.0',
      });
    }).toThrow('Incompatible OpenAPI version.');
  });

  test('checkRemovedEndpoints::check with removed enpoints', () => {
    expect(() => {
      checkRemovedEndpoints({
        ...DUMMY_OPEN_API_DEFINITION,
        paths: {...DUMMY_OPEN_API_DEFINITION.paths, '/myinfo': {}},
      });
    }).toThrow('Please Update the Application.');
  });

  test('checkRemovedEndpoints::check successfully executed without removing enpoints', () => {
    checkRemovedEndpoints({...DUMMY_OPEN_API_DEFINITION});
  });

  test('checkDeprecatedEndpoints::check with deprecated enpoints', () => {
    const result = checkDeprecatedEndpoints({
      ...DUMMY_OPEN_API_DEFINITION,
      paths: {
        ...DUMMY_OPEN_API_DEFINITION.paths,
        '/myinfo': {
          get: {
            ...DUMMY_OPEN_API_DEFINITION.paths['/myinfo'],
            deprecated: true,
          },
        },
      },
    });
    expect(result).toBeTruthy();
  });

  test('checkDeprecatedEndpoints::check without deprecated enpoints', () => {
    const result = checkDeprecatedEndpoints({...DUMMY_OPEN_API_DEFINITION});
    expect(result).toBeFalsy();
  });

  test('isApiCompatible::check incompatible', () => {
    const result = isApiCompatible('1.1.0', '1.2.0');
    expect(result).toBeFalsy();
  });

  test('isApiCompatible::check compatible', () => {
    let result = isApiCompatible('1.2.0', '1.2.0');
    expect(result).toBeTruthy();
    result = isApiCompatible('1.3.0', '1.2.0');
    expect(result).toBeTruthy();
  });
});
