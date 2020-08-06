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

import {SUBHEADER_LEAVE} from 'screens';
import {DrawerNavigationState} from 'layouts/DrawerContent';
import {DrawerDescriptorMap} from '@react-navigation/drawer/lib/typescript/src/types';

type DrawerItem = {
  name: string;
  key: string;
  label: string;
  subheader?: string;
  subheaderIcon?: {name: string; type?: string};
};

export const getDrawerItems = (
  drawerNavigationState: DrawerNavigationState,
  drawerDescriptors: DrawerDescriptorMap,
) => {
  const items: DrawerItem[] = [];
  const subheaders: {[key: string]: undefined} = {};
  drawerNavigationState.routes.forEach((route) => {
    const item: DrawerItem = {
      name: route.name,
      key: route.key,
      label: drawerDescriptors[route.key].options.drawerLabel,
      subheader: undefined,
      subheaderIcon: undefined,
    };
    if (!subheaders.hasOwnProperty(route.params.subheader)) {
      item.subheader = route.params.subheader;
      item.subheaderIcon = SUBHEADER_ICONS[route.params.subheader];
      subheaders[route.params.subheader] = undefined;
    }

    items.push(item);
  });
  return items;
};

export const SUBHEADER_ICONS = {
  [SUBHEADER_LEAVE]: {name: 'briefcase'},
};
