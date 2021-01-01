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

import {DEFAULT_FIXED_DRAWER_WIDTH} from 'services/drawer';

// https://reactnavigation.org/docs/drawer-navigator/#drawertype
export const LARGE_SCREEN_BREAKPOINT = 768;

/**
 * Check whether screen is large by window width from Dimensions.get('window').width
 * https://reactnative.dev/docs/dimensions
 * @param {Number} width
 */
export const isLargeScreen = (width: number): boolean => {
  return width >= LARGE_SCREEN_BREAKPOINT;
};

/**
 * Return actual viewport width when drawer in permanent state
 * @param {Number} width
 */
export const getViewportWidth = (width: number): number => {
  if (!isLargeScreen(width)) {
    return width;
  }
  const drawerWidth = width * (parseInt(DEFAULT_FIXED_DRAWER_WIDTH, 10) / 100);
  return Math.trunc(width - drawerWidth);
};
