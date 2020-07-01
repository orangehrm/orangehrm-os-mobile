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

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import SafeAreaLayout from 'layouts/SafeAreaLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {selectFromDate, selectToDate} from 'store/leave/apply-leave/selectors';
import {
  pickLeaveFromDate,
  pickLeaveToDate,
  pickLeaveDates,
} from 'store/leave/apply-leave/actions';
import Button from 'components/DefaultButton';
import Calendar, {CalendarProps} from 'screens/leave/components/Calendar';
import {MyLeaveUsageNavigatorParamList} from 'screens/leave/MyLeaveUsageNavigator';
import {PICK_LEAVE_REQUEST_DAYS_CALENDAR, APPLY_LEAVE} from 'screens';

class PickLeaveRequestDays extends React.Component<PickLeaveRequestDaysProps> {
  render() {
    const {
      theme,
      route,
      applyLeaveFromDate,
      applyLeaveToDate,
      setApplyLeaveFromDate,
      setApplyLeaveToDate,
      pickApplyLeaveDates,
    } = this.props;

    let fromDate;
    let toDate;
    let setFromDate;
    let setToDate;
    let pickLeaveDatesAction;

    if (route.params.parent === APPLY_LEAVE) {
      fromDate = applyLeaveFromDate;
      toDate = applyLeaveToDate;
      setFromDate = setApplyLeaveFromDate;
      setToDate = setApplyLeaveToDate;
      pickLeaveDatesAction = pickApplyLeaveDates;
    }

    return (
      <SafeAreaLayout>
        <View
          style={[
            styles.calendarView,
            {backgroundColor: theme.palette.backgroundSecondary},
          ]}>
          <Calendar
            fromDate={fromDate}
            toDate={toDate}
            setFromDate={setFromDate}
            setToDate={setToDate}
          />
        </View>
        <View
          style={{
            paddingHorizontal: theme.spacing * 12,
            paddingVertical: theme.spacing * 2,
            backgroundColor: theme.palette.background,
          }}>
          <Button
            title={'Continue'}
            primary
            fullWidth
            onPress={pickLeaveDatesAction}
          />
        </View>
      </SafeAreaLayout>
    );
  }
}

interface PickLeaveRequestDaysProps
  extends WithTheme,
    ConnectedProps<typeof connector>,
    CalendarProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<
    MyLeaveUsageNavigatorParamList,
    typeof PICK_LEAVE_REQUEST_DAYS_CALENDAR
  >;
}

const styles = StyleSheet.create({
  calendarView: {
    flex: 1,
    alignItems: 'center',
  },
});

const mapStateToProps = (state: RootState) => ({
  applyLeaveFromDate: selectFromDate(state),
  applyLeaveToDate: selectToDate(state),
});

const mapDispatchToProps = {
  setApplyLeaveFromDate: pickLeaveFromDate,
  setApplyLeaveToDate: pickLeaveToDate,
  pickApplyLeaveDates: pickLeaveDates,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const PickLeaveRequestDaysWithTheme = withTheme<PickLeaveRequestDaysProps>()(
  PickLeaveRequestDays,
);

export default connector(PickLeaveRequestDaysWithTheme);
