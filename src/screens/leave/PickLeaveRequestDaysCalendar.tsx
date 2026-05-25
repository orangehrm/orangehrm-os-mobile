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
import {
  View,
  StyleSheet,
  Keyboard,
  LayoutChangeEvent,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import SafeAreaLayout from 'layouts/SafeAreaLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {
  selectFromDate,
  selectToDate,
  selectHolidays,
  selectWorkWeek,
} from 'store/leave/common-screens/selectors';
import {
  pickLeaveFromDate,
  pickLeaveToDate,
  setPickedState,
  fetchHolidays,
  fetchWorkWeek,
} from 'store/leave/common-screens/actions';
import Button from 'components/DefaultButton';
import Calendar from 'screens/leave/components/Calendar';

interface PickLeaveRequestDaysState {
  containerHeight?: number;
  footerHeight?: number;
}

class PickLeaveRequestDays extends React.Component<
  PickLeaveRequestDaysProps,
  PickLeaveRequestDaysState
> {
  state: PickLeaveRequestDaysState = {};

  componentDidMount() {
    if (this.props.holidays === undefined) {
      // TODO:: use leave period start date & end date
      const fromDate = new Date();
      fromDate.setMonth(0);
      fromDate.setDate(1);
      const toDate = new Date();
      toDate.setMonth(11);
      toDate.setDate(31);
      this.props.fetchHolidays(
        fromDate.toISOString().split('T')[0],
        toDate.toISOString().split('T')[0],
      );
    }
    if (this.props.workWeek === undefined) {
      this.props.fetchWorkWeek();
    }
    this.props.setPickedState('pickedLeaveDates', false);
    Keyboard.dismiss();
  }

  onContainerLayout = (e: LayoutChangeEvent) => {
    const {height} = e.nativeEvent.layout;
    if (height > 0) {
      this.setState((prev) =>
        prev.containerHeight === height ? null : {containerHeight: height},
      );
    }
  };

  onFooterLayout = (e: LayoutChangeEvent) => {
    const {height} = e.nativeEvent.layout;
    if (height > 0) {
      this.setState((prev) =>
        prev.footerHeight === height ? null : {footerHeight: height},
      );
    }
  };

  onPressContinue = () => {
    if (this.props.fromDate) {
      this.props.navigation.goBack();
      this.props.setPickedState('pickedLeaveDates', true);
    }
  };

  render() {
    const {
      theme,
      fromDate,
      toDate,
      setFromDate,
      setToDate,
      holidays,
      workWeek,
    } = this.props;

    const {containerHeight, footerHeight} = this.state;
    const calendarAreaHeight =
      containerHeight != null &&
      footerHeight != null &&
      containerHeight > footerHeight
        ? containerHeight - footerHeight
        : undefined;
    const calendarStyle =
      calendarAreaHeight != null
        ? [styles.calendarSized, {height: calendarAreaHeight}]
        : styles.calendarFill;

    return (
      <SafeAreaLayout>
        <View style={styles.container} onLayout={this.onContainerLayout}>
          <View
            style={[
              styles.calendarView,
              {backgroundColor: theme.palette.backgroundSecondary},
            ]}>
            <Calendar
              style={calendarStyle}
              fromDate={fromDate}
              toDate={toDate}
              setFromDate={setFromDate}
              setToDate={setToDate}
              holidays={holidays}
              workWeek={workWeek}
            />
          </View>
          <CalendarContinueFooter theme={theme} onLayout={this.onFooterLayout}>
            <Button
              title={'Continue'}
              primary
              fullWidth
              onPress={this.onPressContinue}
            />
          </CalendarContinueFooter>
        </View>
      </SafeAreaLayout>
    );
  }
}

/** RN SafeAreaView pads iOS; Android nav/gesture bar needs extra bottom inset. */
const CalendarContinueFooter = (props: {
  theme: PickLeaveRequestDaysProps['theme'];
  onLayout: (e: LayoutChangeEvent) => void;
  children: React.ReactNode;
}) => {
  const {theme, onLayout, children} = props;
  const insets = useSafeAreaInsets();
  const bottomPad = Platform.OS === 'android' ? insets.bottom : 0;

  return (
    <View
      onLayout={onLayout}
      style={{
        paddingHorizontal: theme.spacing * 12,
        paddingTop: theme.spacing * 2,
        paddingBottom: theme.spacing * 2 + bottomPad,
        backgroundColor: theme.palette.background,
      }}>
      {children}
    </View>
  );
};

interface PickLeaveRequestDaysProps
  extends WithTheme,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // flex + minHeight: calendar gets explicit height from onLayout so CalendarList's FlatList
  // has a bounded height (react-native-calendars only applies flex:1 to the list on web).
  calendarView: {
    flex: 1,
    minHeight: 0,
    width: '100%',
  },
  calendarFill: {
    flex: 1,
    width: '100%',
  },
  calendarSized: {
    width: '100%',
  },
});

const mapStateToProps = (state: RootState) => ({
  fromDate: selectFromDate(state),
  toDate: selectToDate(state),
  holidays: selectHolidays(state),
  workWeek: selectWorkWeek(state),
});

const mapDispatchToProps = {
  setFromDate: pickLeaveFromDate,
  setToDate: pickLeaveToDate,
  setPickedState,
  fetchHolidays,
  fetchWorkWeek,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const PickLeaveRequestDaysWithTheme =
  withTheme<PickLeaveRequestDaysProps>()(PickLeaveRequestDays);

export default connector(PickLeaveRequestDaysWithTheme);
