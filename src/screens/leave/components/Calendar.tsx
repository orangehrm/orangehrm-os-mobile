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

import React, {useState, useEffect} from 'react';
import {
  CalendarList,
  CalendarListBaseProps,
  CalendarMarkingProps,
  PeriodMarkingProps,
  DateCallbackHandler,
} from 'react-native-calendars';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {$PropertyType} from 'utility-types';
import {getDatesWithinPeriod, getDateString} from 'lib/helpers/date';

const Calendar = (props: CalendarProps) => {
  const {
    theme,
    fromDate,
    toDate,
    setFromDate = () => {},
    setToDate = () => {},
    ...restProps
  } = props;
  const [markedDates, setMarkedDates] = useState<
    $PropertyType<PeriodMarkingProps, 'markedDates'>
  >({});
  const currentDate = getDateString(new Date());
  const commonProps = {
    color: theme.palette.secondary,
    textColor: theme.typography.lightColor,
  };

  useEffect(() => {
    if (fromDate !== undefined && toDate === undefined) {
      setMarkedDates({
        [fromDate]: {
          startingDay: true,
          endingDay: true,
          ...commonProps,
        },
      });
    } else if (fromDate !== undefined && toDate !== undefined) {
      if (fromDate === toDate) {
        setMarkedDates({
          [fromDate]: {
            startingDay: true,
            endingDay: true,
            ...commonProps,
          },
        });
      } else {
        const dates = getDatesWithinPeriod(
          new Date(fromDate),
          new Date(toDate),
        );
        setMarkedDates(getMarkedDatesForPeriod(dates));
      }
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  const onDayPress: DateCallbackHandler = (day) => {
    const selectedDate = day.dateString;

    if (fromDate === selectedDate) {
      setToDate(selectedDate);
      setMarkedDates({
        [selectedDate]: {
          startingDay: true,
          endingDay: true,
          ...commonProps,
        },
      });
    } else if (fromDate !== undefined && toDate === undefined) {
      const dates = getDatesWithinPeriod(
        new Date(fromDate),
        new Date(selectedDate),
      );

      if (new Date(fromDate) > new Date(selectedDate)) {
        //swap dates if from date greater than to date
        setToDate(fromDate);
        setFromDate(selectedDate);
      } else {
        setToDate(selectedDate);
      }

      setMarkedDates(getMarkedDatesForPeriod(dates));
    } else {
      setFromDate(selectedDate);
      setToDate(undefined);
      setMarkedDates({
        [selectedDate]: {
          startingDay: true,
          endingDay: true,
          ...commonProps,
        },
      });
    }
  };

  const getMarkedDatesForPeriod = (dates: Date[]) => {
    const newMarkedDates: $PropertyType<PeriodMarkingProps, 'markedDates'> = {};

    newMarkedDates[getDateString(dates[0])] = {
      startingDay: true,
      ...commonProps,
    };
    for (let i = 1; i < dates.length - 1; i++) {
      newMarkedDates[getDateString(dates[i])] = {
        ...commonProps,
      };
    }
    newMarkedDates[getDateString(dates[dates.length - 1])] = {
      endingDay: true,
      ...commonProps,
    };
    return newMarkedDates;
  };

  return (
    <CalendarList
      // pastScrollRange={50}
      // futureScrollRange={50}
      scrollEnabled={true}
      current={currentDate}
      // minDate={undefined}
      // maxDate={undefined}
      onDayPress={onDayPress}
      onDayLongPress={onDayPress}
      monthFormat={'MMMM yyyy'}
      hideExtraDays={true}
      markedDates={markedDates}
      markingType={'period'}
      theme={{
        calendarBackground: theme.palette.backgroundSecondary,
        todayTextColor: theme.palette.secondary,
        selectedDayTextColor: theme.typography.lightColor,
        // https://github.com/wix/react-native-calendars/issues/642
        'stylesheet.day.period': {
          base: {
            overflow: 'hidden',
            height: 34,
            alignItems: 'center',
            width: 38,
          },
        },
      }}
      {...restProps}
    />
  );
};

type CalendarListProps = CalendarListBaseProps & CalendarMarkingProps;

export interface CalendarProps
  extends WithTheme,
    Omit<CalendarListProps, 'theme'> {
  fromDate?: string;
  toDate?: string;
  setFromDate?: (date?: string) => any;
  setToDate?: (date?: string) => any;
}

export default withTheme<CalendarProps>()(Calendar);
