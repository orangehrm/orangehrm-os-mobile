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

import moment from 'moment';
import {
  isAccessTokenExpired,
  getMessageAlongWithGenericErrors,
  getMessageAlongWithResponseErrors,
} from 'services/api';
import {AuthenticationError} from 'services/errors/authentication';

describe('services/api', () => {
  test('isAccessTokenExpired::check with null', () => {
    const result = isAccessTokenExpired(null);
    expect(result).toBeTruthy();
  });

  test('isAccessTokenExpired::check with now', () => {
    const date = new Date();
    const result = isAccessTokenExpired(date.toUTCString());
    expect(result).toBeTruthy();
  });

  test('isAccessTokenExpired::check with future time', () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 5);
    const result = isAccessTokenExpired(date.toUTCString());
    expect(result).toBeFalsy();
  });

  test('isAccessTokenExpired::check with past time', () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 5);
    const result = isAccessTokenExpired(date.toUTCString());
    expect(result).toBeTruthy();
  });

  test('moment::isAfter::check exactly', () => {
    const now = moment.utc('2023-03-27T06:00:01');
    const expired = moment.utc('2023-03-27T06:00:01');
    expect(now.isAfter(expired)).toBeFalsy();
    expect(now.isBefore(expired)).toBeFalsy();
    expect(now.isSame(expired)).toBeTruthy();
    expect(now.isSameOrAfter(expired)).toBeTruthy();
  });

  test('moment::check isAfter & isBefore', () => {
    const now = moment.utc('2023-03-26T23:59:59');
    const expired = moment.utc('2023-03-27T00:00:00');
    expect(now.isAfter(expired)).toBeFalsy();
    expect(now.isBefore(expired)).toBeTruthy();
  });

  test('getMessageAlongWithGenericErrors::invalid error object + default message', () => {
    let result = getMessageAlongWithGenericErrors({});
    expect(result).toBe('Unexpected Error Occurred.');
    result = getMessageAlongWithGenericErrors([], 'Default Error');
    expect(result).toBe('Default Error');
  });

  test('getMessageAlongWithGenericErrors::check throw from fetch when offline', () => {
    const result = getMessageAlongWithGenericErrors(
      new TypeError('Network request failed'),
    );
    expect(result).toBe('Connection Error! Operation Couldn’t Be Completed.');
  });

  test('getMessageAlongWithGenericErrors::check throw when authentication failed', () => {
    const result = getMessageAlongWithGenericErrors(
      new AuthenticationError('Authentication Failed.'),
    );
    expect(result).toBe('Authentication Failed.');
  });

  test('getMessageAlongWithResponseErrors::api response errors', () => {
    let result = getMessageAlongWithResponseErrors({
      error: {status: '404', text: 'No Records Found'},
    });
    expect(result).toBe('No Records Found.');

    result = getMessageAlongWithResponseErrors({
      error: ['Saving Failed'],
    });
    expect(result).toBe('Saving Failed');

    expect(() => {
      getMessageAlongWithResponseErrors({
        error: ['Employee is terminated'],
      });
    }).toThrow('Employee is terminated');

    expect(() => {
      getMessageAlongWithResponseErrors({
        error: ['Employee not assigned'],
      });
    }).toThrow('Employee not assigned');

    expect(() => {
      getMessageAlongWithResponseErrors({
        error: ['Account disabled'],
      });
    }).toThrow('Account disabled');
  });
});
