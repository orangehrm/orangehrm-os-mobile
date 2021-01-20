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

export const helpRequestForMobile = {
  mode: 'category',
  query: 'Mobile',
};

export interface HelpRequest {
  query: string;
  mode: string;
  labels?: string[];
  categories?: string[];
}

export interface HelpState {
  help?: Help;
}

export interface ArticleObject {
  name: string;
  url: string;
}

export interface Help {
  defaultRedirectUrl: string;
  redirectUrls: ArticleObject[];
}

export const FETCH_HELP = 'HELP_FETCH_HELP';
export const FETCH_HELP_FINISHED = 'HELP_FETCH_HELP_FINISHED';

export interface FetchHelpAction {
  type: typeof FETCH_HELP;
  payload: HelpRequest;
}

export interface FetchHelpFinishedAction {
  type: typeof FETCH_HELP_FINISHED;
  payload?: Help;
  error: boolean;
}

export type HelpActionTypes = FetchHelpAction | FetchHelpFinishedAction;
