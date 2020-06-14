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

const defaultTheme: Theme = {
  palette: {
    default: '#e0e0e0',
    primary: '#00ac51',
    secondary: '#f88400',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
    success: '#4caf50',
    background: '#ffffff',
    statusBar: '#ffffff',
  },
  typography: {
    fontSize: 12,
    headerFontSize: 20,
    primaryColor: '#818181',
    secondaryColor: '#ffffff',
    iconSize: 20,
  },
  borderRadius: 4,
  spacing: 4,
};

export interface Palette {
  default: string;
  primary: string;
  secondary: string;
  error: string;
  warning: string;
  info: string;
  success: string;
  background: string;
  statusBar: string;
}

export interface Typography {
  fontSize: number;
  headerFontSize: number;
  primaryColor: string;
  secondaryColor: string;
  iconSize: number;
}

export interface Theme {
  palette: Palette;
  typography: Typography;
  borderRadius: number;
  spacing: number;
}

export default defaultTheme;
