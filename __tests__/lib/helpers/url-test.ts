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
import {checkDomain, checkUrl} from 'lib/helpers/url';

describe('lib/helpers/url', () => {
  test('checkDomain::check is valid domain name', () => {
    let result = checkDomain('example.com');
    expect(result).toBeTruthy();
    result = checkDomain('https://example.com');
    expect(result).toBeFalsy();
    result = checkDomain('');
    expect(result).toBeFalsy();
  });

  test('checkUrl::check is valid url with path and protocol', () => {
    let result = checkUrl('https://example.com');
    expect(result).toBeTruthy();
    result = checkUrl('https://example.com/path');
    expect(result).toBeTruthy();
    result = checkUrl('http://example.com/path');
    expect(result).toBeFalsy();
    result = checkUrl('https://example.com:8080/path');
    expect(result).toBeTruthy();
    result = checkUrl('https://example.com:8080/path/');
    expect(result).toBeFalsy();
    result = checkUrl('https://example.com https://example.com');
    expect(result).toBeFalsy();
    result = checkUrl('https://example.com/path/index.php');
    expect(result).toBeTruthy();
  });

  test('checkUrl::check is valid url without path and but with protocol', () => {
    let result = checkUrl('https://example.com', false);
    expect(result).toBeTruthy();
    result = checkUrl('https://example.com/path', false);
    expect(result).toBeFalsy();
  });

  test('checkUrl::check is valid url without protocol and but with path', () => {
    let result = checkUrl('example.com/path', true, false);
    expect(result).toBeTruthy();
    result = checkUrl('https://example.com/path', true, false);
    expect(result).toBeFalsy();
    result = checkUrl('example.com/path', true, false);
    expect(result).toBeTruthy();
    result = checkUrl('example.com:8080/path', true, false);
    expect(result).toBeTruthy();
  });

  test('checkUrl::check is valid url without both path and protocol', () => {
    let result = checkUrl('example.com/path', false, false);
    expect(result).toBeFalsy();
    result = checkUrl('https://example.com/path', false, false);
    expect(result).toBeFalsy();
    result = checkUrl('example.com:8080', false, false);
    expect(result).toBeTruthy();
    result = checkUrl('example.com:8080/path', false, false);
    expect(result).toBeFalsy();
  });

  test('checkUrl::check support unicode urls', () => {
    let result = checkUrl('https://xn--msic-0ra.example/motörhead');
    expect(result).toBeTruthy();
    result = checkUrl('https://www.müsic.example/motörhead');
    expect(result).toBeTruthy();
  });
});
