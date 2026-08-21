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

import {getDrawerItems, SUBHEADER_ICONS} from 'services/drawer';
import {DrawerNavigationState} from 'layouts/DrawerContent';
import {DrawerDescriptorMap} from '@react-navigation/drawer/lib/typescript/src/types';
import {
  ABOUT,
  APPLY_LEAVE,
  ATTENDANCE_SUMMARY,
  FULL_SCREEN_INFO,
  MENU_ITEM_ABOUT,
  MENU_ITEM_APPLY_LEAVE,
  MENU_ITEM_HELP,
  MENU_ITEM_MY_ATTENDANCE,
  MENU_ITEM_MY_LEAVE_USAGE,
  MY_LEAVE_ENTITLEMENT_AND_USAGE,
  SUBHEADER_LEAVE,
  SUBHEADER_MORE,
  SUBHEADER_TIME,
} from 'screens';

const routes = [
  {
    name: APPLY_LEAVE,
    key: `${APPLY_LEAVE}-key`,
    label: MENU_ITEM_APPLY_LEAVE,
    subheader: SUBHEADER_LEAVE,
  },
  {
    name: MY_LEAVE_ENTITLEMENT_AND_USAGE,
    key: `${MY_LEAVE_ENTITLEMENT_AND_USAGE}-key`,
    label: MENU_ITEM_MY_LEAVE_USAGE,
    subheader: SUBHEADER_LEAVE,
  },
  {
    name: ATTENDANCE_SUMMARY,
    key: `${ATTENDANCE_SUMMARY}-key`,
    label: MENU_ITEM_MY_ATTENDANCE,
    subheader: SUBHEADER_TIME,
  },
  {
    name: ABOUT,
    key: `${ABOUT}-key`,
    label: MENU_ITEM_ABOUT,
    subheader: SUBHEADER_MORE,
  },
  // routes without a subheader are not drawer menu items
  {
    name: FULL_SCREEN_INFO,
    key: `${FULL_SCREEN_INFO}-key`,
    label: undefined,
    subheader: undefined,
  },
];

const drawerNavigationState = {
  routes: routes.map((route) => ({
    name: route.name,
    key: route.key,
    params: {subheader: route.subheader},
  })),
} as unknown as DrawerNavigationState;

const drawerDescriptors = routes.reduce(
  (descriptors, route) => ({
    ...descriptors,
    [route.key]: {options: {drawerLabel: route.label}},
  }),
  {},
) as unknown as DrawerDescriptorMap;

describe('services/drawer', () => {
  test('getDrawerItems::group routes by subheader', () => {
    const items = getDrawerItems(drawerNavigationState, drawerDescriptors);

    expect(items.map((item) => item.name)).toEqual([
      APPLY_LEAVE,
      MY_LEAVE_ENTITLEMENT_AND_USAGE,
      ATTENDANCE_SUMMARY,
      ABOUT,
    ]);
    // subheader is set on the first item of each section only
    expect(items.map((item) => item.subheader)).toEqual([
      SUBHEADER_LEAVE,
      undefined,
      SUBHEADER_TIME,
      SUBHEADER_MORE,
    ]);
    expect(items[0].subheaderIcon).toEqual(SUBHEADER_ICONS[SUBHEADER_LEAVE]);
    expect(items[3].subheaderIcon).toEqual(SUBHEADER_ICONS[SUBHEADER_MORE]);
  });

  test('getDrawerItems::link items lead their section', () => {
    const onPress = jest.fn();
    const items = getDrawerItems(drawerNavigationState, drawerDescriptors, [
      {
        key: MENU_ITEM_HELP,
        label: MENU_ITEM_HELP,
        subheader: SUBHEADER_MORE,
        onPress: onPress,
      },
    ]);

    // Help is a link, About is a route, and Help is listed first
    const moreItems = items.slice(-2);
    expect(moreItems.map((item) => item.label)).toEqual([
      MENU_ITEM_HELP,
      MENU_ITEM_ABOUT,
    ]);
    expect(moreItems[0].subheader).toBe(SUBHEADER_MORE);
    expect(moreItems[1].subheader).toBeUndefined();

    moreItems[0].onPress?.();
    expect(onPress).toHaveBeenCalled();
    expect(moreItems[1].onPress).toBeUndefined();
  });

  test('getDrawerItems::link item creates its own section', () => {
    const items = getDrawerItems(drawerNavigationState, drawerDescriptors, [
      {
        key: MENU_ITEM_HELP,
        label: MENU_ITEM_HELP,
        subheader: 'SUPPORT',
        onPress: jest.fn(),
      },
    ]);

    const linkItem = items[items.length - 1];
    expect(linkItem.label).toBe(MENU_ITEM_HELP);
    expect(linkItem.subheader).toBe('SUPPORT');
  });
});
