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
import MainLayout from 'layouts/MainLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {selectDuration} from 'store/leave/apply-leave/selectors';
import {pickSingleDayDuration as pickSingleDayDurationAction} from 'store/leave/apply-leave/actions';
import Button from 'components/DefaultButton';
import RadioItem from 'components/DefaultRadioItem';
import PickLeaveSpecificTime from 'screens/leave/components/PickLeaveSpecificTime';
import {MyLeaveUsageNavigatorParamList} from 'screens/leave/MyLeaveUsageNavigator';
import {PICK_LEAVE_REQUEST_DURATION} from 'screens';
import {
  FULL_DAY,
  HALF_DAY,
  SPECIFY_TIME,
  HALF_DAY_MORNING,
  HALF_DAY_AFTERNOON,
  DEFAULT_FROM_TIME,
  DEFAULT_TO_TIME,
  SingleDayDuration,
} from 'store/leave/apply-leave/types';
import {getDateFromString} from 'lib/helpers/time';

class PickLeaveRequestDuration extends React.Component<
  PickLeaveRequestDurationProps
> {
  isValidTimes = (fromTime: string, toTime: string) => {
    return getDateFromString(fromTime) < getDateFromString(toTime);
  };

  onPressContinue = (duration?: SingleDayDuration) => () => {
    if (duration?.singleType === SPECIFY_TIME) {
      if (!this.isValidTimes(duration.singleFromTime, duration.singleToTime)) {
        return;
      }
    }
    this.props.navigation.goBack();
  };

  isFullDay = (duration?: SingleDayDuration) => {
    return duration?.singleType === FULL_DAY;
  };

  isHalfDayMorning = (duration?: SingleDayDuration) => {
    return (
      duration?.singleType === HALF_DAY &&
      duration?.singleAMPM === HALF_DAY_MORNING
    );
  };

  isHalfDayAfternoon = (duration?: SingleDayDuration) => {
    return (
      duration?.singleType === HALF_DAY &&
      duration?.singleAMPM === HALF_DAY_AFTERNOON
    );
  };

  isSpecifyTime = (duration?: SingleDayDuration) => {
    return duration?.singleType === SPECIFY_TIME;
  };

  getFromTime = (duration?: SingleDayDuration) => {
    return duration?.singleType === SPECIFY_TIME
      ? duration.singleFromTime
      : DEFAULT_FROM_TIME;
  };

  getToTime = (duration?: SingleDayDuration) => {
    return duration?.singleType === SPECIFY_TIME
      ? duration.singleToTime
      : DEFAULT_TO_TIME;
  };

  setFromTime = (
    pickSingleDayDuration: typeof pickSingleDayDurationAction,
    duration?: SingleDayDuration,
  ) => (time: string) => {
    if (duration?.singleType === SPECIFY_TIME) {
      pickSingleDayDuration({
        ...duration,
        singleFromTime: time,
      });
    }
  };

  setToTime = (
    pickSingleDayDuration: typeof pickSingleDayDurationAction,
    duration?: SingleDayDuration,
  ) => (time: string) => {
    if (duration?.singleType === SPECIFY_TIME) {
      pickSingleDayDuration({
        ...duration,
        singleToTime: time,
      });
    }
  };

  render() {
    const {
      theme,
      applyLeaveDuration,
      pickApplyLeaveSingleDayDuration,
    } = this.props;

    let duration = applyLeaveDuration;
    let pickSingleDayDuration = pickApplyLeaveSingleDayDuration;

    const radioStyle = {paddingVertical: theme.spacing * 2};

    return (
      <MainLayout
        footer={
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
              onPress={this.onPressContinue(duration)}
            />
          </View>
        }>
        <View
          style={[
            styles.rootView,
            {
              paddingBottom: theme.spacing * 2,
              backgroundColor: theme.palette.backgroundSecondary,
            },
          ]}>
          <View
            style={{
              paddingHorizontal: theme.spacing * 8,
              paddingVertical: theme.spacing * 6,
              backgroundColor: theme.palette.background,
            }}>
            <RadioItem
              title={'Full Day'}
              radioProps={{selected: this.isFullDay(duration)}}
              style={{...radioStyle}}
              onPress={() => {
                pickSingleDayDuration({singleType: FULL_DAY});
              }}
            />
            <RadioItem
              title={'Half Day - Morning'}
              radioProps={{selected: this.isHalfDayMorning(duration)}}
              style={{...radioStyle}}
              onPress={() => {
                pickSingleDayDuration({
                  singleType: HALF_DAY,
                  singleAMPM: HALF_DAY_MORNING,
                });
              }}
            />
            <RadioItem
              title={'Half Day - Afternoon'}
              radioProps={{selected: this.isHalfDayAfternoon(duration)}}
              style={{...radioStyle}}
              onPress={() => {
                pickSingleDayDuration({
                  singleType: HALF_DAY,
                  singleAMPM: HALF_DAY_AFTERNOON,
                });
              }}
            />
            <RadioItem
              title={'Specify Time'}
              radioProps={{selected: this.isSpecifyTime(duration)}}
              style={{...radioStyle}}
              onPress={() => {
                pickSingleDayDuration({
                  singleType: SPECIFY_TIME,
                  singleFromTime: DEFAULT_FROM_TIME,
                  singleToTime: DEFAULT_TO_TIME,
                });
              }}
            />
          </View>

          {this.isSpecifyTime(duration) ? (
            <PickLeaveSpecificTime
              fromTime={this.getFromTime(duration)}
              toTime={this.getToTime(duration)}
              setFromTime={this.setFromTime(pickSingleDayDuration, duration)}
              setToTime={this.setToTime(pickSingleDayDuration, duration)}
            />
          ) : null}
        </View>
      </MainLayout>
    );
  }
}

interface PickLeaveRequestDurationProps
  extends WithTheme,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<
    MyLeaveUsageNavigatorParamList,
    typeof PICK_LEAVE_REQUEST_DURATION
  >;
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});

const mapStateToProps = (state: RootState) => ({
  applyLeaveDuration: selectDuration(state),
});

const mapDispatchToProps = {
  pickApplyLeaveSingleDayDuration: pickSingleDayDurationAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const PickLeaveRequestDurationWithTheme = withTheme<
  PickLeaveRequestDurationProps
>()(PickLeaveRequestDuration);

export default connector(PickLeaveRequestDurationWithTheme);
