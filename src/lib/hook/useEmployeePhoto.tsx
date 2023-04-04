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
import {useEffect, useState} from 'react';

const useEmployeePhoto = (empNumber: number | undefined) => {
  const authParams = useSelector(selectAuthParams);
  const [source, setSource] = useState<ImageSourcePropType>(
    require('images/default-photo.png'),
  );
  const [lock, setLock] = useState<boolean>(false);

  useEffect(() => {
    if (
      empNumber !== undefined &&
      !isAccessTokenExpired(authParams.expiresAt) &&
      lock === false
    ) {
      setLock(true);
      const src = prepare(authParams.instanceUrl + ENDPOINT_EMPLOYEE_PHOTO, {
        empNumber,
      });

      const headers = new Headers();
      headers.append('Authorization', `Bearer ${authParams.accessToken}`);

      const requestOptions = {
        method: 'GET',
        headers: headers,
      };

      /**
       * - Why used fetch for image?
       * When provide image URI to Image component it will aggressively cache the image.
       * Can add time based version query parameter, then it will grow cache storage
       */
      fetch(src, requestOptions)
        // eslint-disable-next-line no-undef
        .then((response: Response) => {
          response
            .blob()
            .then((blob) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                  setSource({
                    uri: reader.result, // `data:application/octet-stream;base64,${content}`
                  });
                }
              };
              reader.readAsDataURL(blob);
            })
            .catch(() => {})
            .finally(() => {
              setLock(false);
            });
          // TODO:: can handle caching using: response.headers.get('etag')
        })
        .catch(() => {
          setLock(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empNumber, authParams]);

  return {
    source,
  };
};

export default useEmployeePhoto;
