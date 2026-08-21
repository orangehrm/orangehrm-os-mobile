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

import {SUBHEADER_LEAVE, SUBHEADER_TIME, SUBHEADER_MORE} from 'screens';
import {DrawerNavigationState} from 'layouts/DrawerContent';
import {DrawerDescriptorMap} from '@react-navigation/drawer/lib/typescript/src/types';

type DrawerItem = {
  name: string;
  key: string;
  label: string;
  subheader?: string;
  subheaderIcon?: SubHeaderIcon;
  /** set only on items which are not drawer routes, e.g. external links */
  onPress?: () => void;
};

export type DrawerLinkItem = {
  key: string;
  label: string;
  subheader: string;
  onPress: () => void;
};

interface SubHeaderIcon {
  name: string;
  type?: string;
}

export const getDrawerItems = (
  drawerNavigationState: DrawerNavigationState,
  drawerDescriptors: DrawerDescriptorMap,
  drawerLinkItems: DrawerLinkItem[] = [],
) => {
  const sections: {[key: string]: DrawerItem[]} = {};
  const subheaders: string[] = [];

  const section = (subheader: string) => {
    if (!Object.hasOwn(sections, subheader)) {
      sections[subheader] = [];
      subheaders.push(subheader);
    }
    return sections[subheader];
  };

  drawerNavigationState.routes.forEach((route) => {
    if (route.params?.subheader === undefined) {
      return;
    }

    const label = drawerDescriptors[route.key].options.drawerLabel;
    if (typeof label !== 'string') {
      return;
    }

    section(route.params.subheader).push({
      name: route.name,
      key: route.key,
      label: label,
    });
  });

  // Link items lead the section they belong to, keeping their own relative order, so Help stays
  // above the routes listed under the same subheader.
  const linkItemCounts: {[key: string]: number} = {};
  drawerLinkItems.forEach((linkItem) => {
    const position = linkItemCounts[linkItem.subheader] ?? 0;
    section(linkItem.subheader).splice(position, 0, {
      name: linkItem.key,
      key: linkItem.key,
      label: linkItem.label,
      onPress: linkItem.onPress,
    });
    linkItemCounts[linkItem.subheader] = position + 1;
  });

  const items: DrawerItem[] = [];
  subheaders.forEach((subheader) => {
    sections[subheader].forEach((item, index) => {
      // the subheader is rendered once, along with the first item of a section
      items.push(
        index === 0
          ? {
              ...item,
              subheader: subheader,
              subheaderIcon: SUBHEADER_ICONS[subheader],
            }
          : item,
      );
    });
  });
  return items;
};

export const SUBHEADER_ICONS: {
  [key: string]: SubHeaderIcon;
} = {
  [SUBHEADER_LEAVE]: {name: 'briefcase'},
  [SUBHEADER_TIME]: {name: 'clock'},
  [SUBHEADER_MORE]: {name: 'information'},
};

export const DEFAULT_FIXED_DRAWER_WIDTH = '32%';
