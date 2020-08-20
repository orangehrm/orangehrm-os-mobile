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
import {
  Holiday,
  WorkWeek,
  WORK_WEEK_FULL,
  WORK_WEEK_NON,
  RECURRING_TRUE,
} from 'store/leave/common-screens/types';

const MAP = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
};

const PAST_SCROLL_RANGE = 24;
const FUTURE_SCROLL_RANGE = 24;

const Calendar = (props: CalendarProps) => {
  const {
    theme,
    fromDate,
    toDate,
    setFromDate = () => {},
    setToDate = () => {},
    holidays,
    workWeek,
    ...restProps
  } = props;
  const [markedDates, setMarkedDates] = useState<
    $PropertyType<PeriodMarkingProps, 'markedDates'>
  >({});
  const [markedHolidays, setMarkedHolidays] = useState<
    $PropertyType<PeriodMarkingProps, 'markedDates'>
  >({});
  const currentDate = getDateString(new Date());
  const commonProps = {
    color: theme.palette.secondary,
    textColor: theme.typography.lightColor,
  };

  useEffect(() => {
    const markedHolidaysObj: {[key: string]: any} = {};
    holidays?.forEach((holiday) => {
      markedHolidaysObj[holiday.date] = {
        startingDay: true,
        endingDay: true,
        color:
          holiday.length === WORK_WEEK_FULL
            ? theme.palette.defaultDark
            : theme.palette.default,
      };
      if (holiday.recurring === RECURRING_TRUE) {
        for (let i = 0; i < PAST_SCROLL_RANGE / 12; i++) {
          const holidayDate = new Date(holiday.date);
          holidayDate.setFullYear(holidayDate.getFullYear() - (i + 1));
          markedHolidaysObj[holidayDate.toISOString().slice(0, 10)] =
            markedHolidaysObj[holiday.date];
        }
        for (let i = 0; i < FUTURE_SCROLL_RANGE / 12; i++) {
          const holidayDate = new Date(holiday.date);
          holidayDate.setFullYear(holidayDate.getFullYear() + i + 1);
          markedHolidaysObj[holidayDate.toISOString().slice(0, 10)] =
            markedHolidaysObj[holiday.date];
        }
      }
    });

    const today = new Date();
    const minDate = new Date();
    const maxDate = new Date();
    minDate.setMonth(today.getMonth() - PAST_SCROLL_RANGE);
    maxDate.setMonth(today.getMonth() + FUTURE_SCROLL_RANGE);

    const markedNonWorkingDaysObj: {[key: string]: any} = {};
    const dates = getDatesWithinPeriod(minDate, maxDate);
    if (workWeek !== undefined) {
      dates.forEach((date) => {
        const day = date.getUTCDay();
        const workDay =
          workWeek[MAP[day as keyof typeof MAP] as keyof WorkWeek];
        if (workDay !== WORK_WEEK_FULL) {
          markedNonWorkingDaysObj[getDateString(date)] = {
            startingDay: true,
            endingDay: true,
            color:
              workDay === WORK_WEEK_NON
                ? theme.palette.defaultDark
                : theme.palette.default,
          };
        }
      });
    }

    setMarkedHolidays({...markedNonWorkingDaysObj, ...markedHolidaysObj});
  }, [holidays, workWeek, theme]);

  useEffect(() => {
    setMarkedDates({
      ...markedHolidays,
      ...markedDates,
    });
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [markedHolidays]);
  /* eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    if (fromDate !== undefined && toDate === undefined) {
      setMarkedDates({
        ...markedHolidays,
        [fromDate]: {
          startingDay: true,
          endingDay: true,
          ...commonProps,
        },
      });
    } else if (fromDate !== undefined && toDate !== undefined) {
      if (fromDate === toDate) {
        setMarkedDates({
          ...markedHolidays,
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
        setMarkedDates({
          ...markedHolidays,
          ...getMarkedDatesForPeriod(dates),
        });
      }
    } else {
      setMarkedDates({...markedHolidays});
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [fromDate, toDate]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const onDayPress: DateCallbackHandler = (day) => {
    const selectedDate = day.dateString;

    if (fromDate === selectedDate) {
      setToDate(selectedDate);
      setMarkedDates({
        ...markedHolidays,
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

      setMarkedDates({
        ...markedHolidays,
        ...getMarkedDatesForPeriod(dates),
      });
    } else {
      setFromDate(selectedDate);
      setToDate(undefined);
      setMarkedDates({
        ...markedHolidays,
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
      pastScrollRange={PAST_SCROLL_RANGE}
      futureScrollRange={FUTURE_SCROLL_RANGE}
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
  holidays?: Holiday[];
  workWeek?: WorkWeek;
}

export default withTheme<CalendarProps>()(Calendar);
