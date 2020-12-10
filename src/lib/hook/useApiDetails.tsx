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
import {selectApiDetails} from 'store/storage/selectors';
import {isApiCompatible} from 'services/instance-check';
import {ApiDetails as ApiDetailsState} from 'store/storage/types';

const useApiDetails = () => {
  const apiDetails = useSelector(selectApiDetails);
  return {
    ...apiDetails,
    isApiCompatible: (requiredMinimumVersion: string) => {
      return apiDetails.apiVersion
        ? isApiCompatible(apiDetails.apiVersion, requiredMinimumVersion)
        : false;
    },
  };
};

export interface ApiDetails extends ApiDetailsState {
  isApiCompatible: (requiredMinimumVersion: string) => boolean;
}

export default useApiDetails;
