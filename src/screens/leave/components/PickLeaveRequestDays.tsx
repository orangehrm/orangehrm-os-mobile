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
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import Text from 'components/DefaultText';
import CardButton from 'screens/leave/components/CardButton';
import Icon from 'components/DefaultIcon';
import {
  PICK_LEAVE_REQUEST_DAYS_CALENDAR,
  PICK_LEAVE_REQUEST_DURATION,
  PICK_LEAVE_REQUEST_PARTIAL_DAYS,
} from 'screens';
import {navigate} from 'lib/helpers/navigation';
import {isSingleDayRequest, isMultipleDayRequest} from 'lib/helpers/leave';
import {
  FULL_DAY,
  HALF_DAY,
  HALF_DAY_MORNING,
  HALF_DAY_AFTERNOON,
  SPECIFY_TIME,
  PARTIAL_OPTION_NONE,
  PARTIAL_OPTION_ALL,
  PARTIAL_OPTION_START,
  PARTIAL_OPTION_END,
  PARTIAL_OPTION_START_END,
  SingleDayDuration,
  MultipleDayPartialOption,
} from 'store/leave/apply-leave/types';

class PickLeaveRequestDays extends React.Component<PickLeaveRequestDaysProps> {
  onPressRequestDays = () => {
    navigate(PICK_LEAVE_REQUEST_DAYS_CALENDAR, {
      parent: this.props.currentRoute,
    });
  };

  onPressDuration = () => {
    navigate(PICK_LEAVE_REQUEST_DURATION, {
      parent: this.props.currentRoute,
    });
  };

  onPressPartialDays = () => {
    navigate(PICK_LEAVE_REQUEST_PARTIAL_DAYS, {
      parent: this.props.currentRoute,
    });
  };

  getSelectedTextForDuration = () => {
    const {duration} = this.props;
    if (duration.singleType === FULL_DAY) {
      return 'Full Day';
    } else if (
      duration.singleType === HALF_DAY &&
      duration.singleAMPM === HALF_DAY_MORNING
    ) {
      return 'Half Day - Morning';
    } else if (
      duration.singleType === HALF_DAY &&
      duration.singleAMPM === HALF_DAY_AFTERNOON
    ) {
      return 'Half Day - Afternoon';
    } else if (duration.singleType === SPECIFY_TIME) {
      return duration.singleFromTime + ' - ' + duration.singleToTime;
    }
    return undefined;
  };

  getSelectedTextForPrtialOption = () => {
    const {partialOption} = this.props;
    if (partialOption.partialOption === PARTIAL_OPTION_NONE) {
      return 'None';
    } else if (partialOption.partialOption === PARTIAL_OPTION_ALL) {
      return 'All Days';
    } else if (partialOption.partialOption === PARTIAL_OPTION_START) {
      return 'Start Day Only';
    } else if (partialOption.partialOption === PARTIAL_OPTION_END) {
      return 'End Day Only';
    } else if (partialOption.partialOption === PARTIAL_OPTION_START_END) {
      return 'Start and End Day';
    }
    return undefined;
  };

  render() {
    const {theme, fromDate, toDate} = this.props;

    return (
      <>
        <View>
          <CardButton
            style={[styles.cardButton, {height: theme.spacing * 12}]}
            onPress={this.onPressRequestDays}>
            <View style={[styles.cardButtonContent]}>
              <View style={styles.buttonLeftView}>
                <Icon name={'calendar'} />
                <Text style={{paddingTop: theme.spacing * 0.5}}>
                  {'Request Day(s)'}
                </Text>
              </View>
              <Icon name={'chevron-right'} />
            </View>
          </CardButton>
          {fromDate === undefined ? null : (
            <TouchableWithoutFeedback onPress={this.onPressRequestDays}>
              <View
                style={{
                  backgroundColor: theme.palette.background,
                  paddingVertical: theme.spacing * 3,
                  paddingLeft: theme.spacing * 13,
                  paddingRight: theme.spacing * 20,
                }}>
                <View
                  style={[
                    styles.requestDaysTextView,
                    {
                      paddingVertical: theme.spacing,
                    },
                  ]}>
                  <Text>{'From:'}</Text>
                  <Text style={{color: theme.palette.secondary}}>
                    {fromDate}
                  </Text>
                </View>
                <View
                  style={[
                    styles.requestDaysTextView,
                    {
                      paddingVertical: theme.spacing,
                    },
                  ]}>
                  <Text>{'To:'}</Text>
                  <Text style={{color: theme.palette.secondary}}>
                    {isSingleDayRequest(fromDate, toDate) ? fromDate : toDate}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}

          {isSingleDayRequest(fromDate, toDate) ? (
            <CardButton
              style={[styles.cardButton, {height: theme.spacing * 12}]}
              onPress={this.onPressDuration}>
              <View style={[styles.cardButtonContent]}>
                <View style={styles.buttonLeftView}>
                  <Icon name={'clock'} />
                  <Text style={{paddingTop: theme.spacing * 0.5}}>
                    {'Duration'}
                  </Text>
                </View>
                <Text style={{paddingTop: theme.spacing * 0.5}}>
                  {this.getSelectedTextForDuration()}
                </Text>
                <Icon name={'chevron-right'} />
              </View>
            </CardButton>
          ) : null}

          {isMultipleDayRequest(fromDate, toDate) ? (
            <CardButton
              style={[styles.cardButton, {height: theme.spacing * 12}]}
              onPress={this.onPressPartialDays}>
              <View style={[styles.cardButtonContent]}>
                <View style={styles.buttonLeftView}>
                  <Icon name={'clock'} />
                  <Text style={{paddingTop: theme.spacing * 0.5}}>
                    {'Partial Days'}
                  </Text>
                </View>
                <Text style={{paddingTop: theme.spacing * 0.5}}>
                  {this.getSelectedTextForPrtialOption()}
                </Text>
                <Icon name={'chevron-right'} />
              </View>
            </CardButton>
          ) : null}
        </View>
      </>
    );
  }
}

interface PickLeaveRequestDaysProps extends WithTheme {
  currentRoute: string;
  fromDate?: string;
  toDate?: string;
  duration: SingleDayDuration;
  partialOption: MultipleDayPartialOption;
}

const styles = StyleSheet.create({
  buttonLeftView: {
    flexDirection: 'row',
  },
  cardButtonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  cardButton: {
    borderRadius: 0,
  },
  requestDaysTextView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default withTheme<PickLeaveRequestDaysProps>()(PickLeaveRequestDays);
