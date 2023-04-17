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

/**
 * @param {string} name
 * @returns {string|undefined}
 */
const getNameLetters = (name: string): string | undefined => {
  const nameChunks = name.split(' ');
  let firstName;
  let lastName;
  if (nameChunks.length > 0) {
    firstName = nameChunks[0].trim();
  }
  if (nameChunks.length > 1) {
    lastName = nameChunks[nameChunks.length - 1].trim();
  }

  const firstLetter = firstName?.charAt(0).toUpperCase();
  const lastLetter = lastName?.charAt(0).toUpperCase();
  return firstLetter?.concat(lastLetter ? lastLetter : '');
};

const getFullName = (employee: {
  firstName: string;
  lastName: string;
  middleName: string;
  terminationId: number | null;
}) => {
  const name =
    employee.firstName +
    ' ' +
    (employee.middleName !== '' ? employee.middleName + ' ' : '') +
    employee.lastName;
  if (
    employee?.terminationId !== undefined &&
    employee.terminationId !== null
  ) {
    return name + ' (Past Employee)';
  }
  return name;
};

const getFirstAndLastNames = (employee: {
  firstName: string;
  lastName: string;
  terminationId: number | null;
}) => {
  const name = employee.firstName + ' ' + employee.lastName;
  if (
    employee?.terminationId !== undefined &&
    employee.terminationId !== null
  ) {
    return name + ' (Past Employee)';
  }
  return name;
};

export {getNameLetters, getFullName, getFirstAndLastNames};
