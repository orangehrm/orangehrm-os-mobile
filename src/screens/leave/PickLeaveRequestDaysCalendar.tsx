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
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import SafeAreaLayout from 'layouts/SafeAreaLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {
  selectFromDate,
  selectToDate,
} from 'store/leave/common-screens/selectors';
import {
  pickLeaveFromDate,
  pickLeaveToDate,
  setPickedState,
} from 'store/leave/common-screens/actions';
import Button from 'components/DefaultButton';
import Calendar from 'screens/leave/components/Calendar';

class PickLeaveRequestDays extends React.Component<PickLeaveRequestDaysProps> {
  componentDidMount() {
    this.props.setPickedState('pickedLeaveDates', false);
  }

  onPressContinue = () => {
    if (this.props.fromDate) {
      this.props.navigation.goBack();
      this.props.setPickedState('pickedLeaveDates', true);
    }
  };

  render() {
    const {theme, fromDate, toDate, setFromDate, setToDate} = this.props;

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
            onPress={this.onPressContinue}
          />
        </View>
      </SafeAreaLayout>
    );
  }
}

interface PickLeaveRequestDaysProps
  extends WithTheme,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

const styles = StyleSheet.create({
  calendarView: {
    flex: 1,
    alignItems: 'center',
  },
});

const mapStateToProps = (state: RootState) => ({
  fromDate: selectFromDate(state),
  toDate: selectToDate(state),
});

const mapDispatchToProps = {
  setFromDate: pickLeaveFromDate,
  setToDate: pickLeaveToDate,
  setPickedState,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const PickLeaveRequestDaysWithTheme = withTheme<PickLeaveRequestDaysProps>()(
  PickLeaveRequestDays,
);

export default connector(PickLeaveRequestDaysWithTheme);
