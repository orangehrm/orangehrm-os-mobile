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

import {useSelector} from 'react-redux';
import {selectAuthParams} from 'store/storage/selectors';
import {ENDPOINT_EMPLOYEE_PHOTO, prepare} from 'services/endpoints';
import {ImageSourcePropType} from 'react-native';
import {isAccessTokenExpired} from 'services/api';

const useEmployeePhoto = (empNumber: number | undefined) => {
  const authParams = useSelector(selectAuthParams);
  let source: ImageSourcePropType = require('images/default-photo.png');
  if (empNumber !== undefined && !isAccessTokenExpired(authParams.expiresAt)) {
    const now = new Date();
    const version = Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      getMinuteRange(now.getMinutes()),
      0,
      0,
    );
    const src = prepare(
      authParams.instanceUrl + ENDPOINT_EMPLOYEE_PHOTO,
      {empNumber},
      {v: version},
    );
    source = {
      uri: src,
      headers: {
        Authorization: `Bearer ${authParams.accessToken}`,
      },
      cache: 'force-cache',
    };
  }

  return {
    source,
  };
};

/**
 * @param minute
 * @returns e.g. 0, 15, 30, 45, 60
 */
const getMinuteRange = (minute: number): number => {
  const rangeSize = 15;
  const startMinute = Math.floor(minute / rangeSize) * rangeSize;

  if (minute % rangeSize === 0) {
    return startMinute;
  }

  // Otherwise, return the end minute
  return startMinute + rangeSize;
};

export default useEmployeePhoto;
