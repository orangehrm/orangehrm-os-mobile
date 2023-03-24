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
import MainLayout from 'layouts/MainLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {
  selectDuration,
  selectForceUpdateSlider,
  selectWorkShift,
} from 'store/leave/common-screens/selectors';
import {
  pickSingleDayDuration as pickSingleDayDurationAction,
  setPickedState,
} from 'store/leave/common-screens/actions';
import Button from 'components/DefaultButton';
import RadioItem from 'components/DefaultRadioItem';
import PickLeaveSpecificTime from 'screens/leave/components/PickLeaveSpecificTime';
import {
  FULL_DAY,
  HALF_DAY,
  SPECIFY_TIME,
  HALF_DAY_MORNING,
  HALF_DAY_AFTERNOON,
  SingleDayDuration,
} from 'store/leave/common-screens/types';
import {isFromTimeLessThanToTime} from 'lib/helpers/leave';

class PickLeaveRequestDuration extends React.Component<PickLeaveRequestDurationProps> {
  componentDidMount() {
    this.props.setPickedState('pickedDuration', false);
  }

  onPressContinue = (duration?: SingleDayDuration) => () => {
    if (duration?.singleType === SPECIFY_TIME) {
      if (
        !isFromTimeLessThanToTime(
          duration.singleFromTime,
          duration.singleToTime,
        )
      ) {
        return;
      }
    }
    this.props.setPickedState('pickedDuration', true);
    this.props.navigation.goBack();
  };

  isFullDay = (duration?: SingleDayDuration) => {
    console.log(duration);
    return duration?.duration.type === FULL_DAY;
  };

  isHalfDayMorning = (duration?: SingleDayDuration) => {
    return duration?.duration.type === HALF_DAY_MORNING;
  };

  isHalfDayAfternoon = (duration?: SingleDayDuration) => {
    console.log(duration?.duration.type);
    return duration?.duration.type === HALF_DAY_AFTERNOON;
  };

  isSpecifyTime = (duration?: SingleDayDuration) => {
    return duration?.singleType === SPECIFY_TIME;
  };

  getFromTime = (duration?: SingleDayDuration) => {
    const {workShift} = this.props;
    return duration?.singleType === SPECIFY_TIME
      ? duration.singleFromTime
      : workShift.startTime;
  };

  getToTime = (duration?: SingleDayDuration) => {
    const {workShift} = this.props;
    return duration?.singleType === SPECIFY_TIME
      ? duration.singleToTime
      : workShift.endTime;
  };

  setFromTime =
    (
      pickSingleDayDuration: typeof pickSingleDayDurationAction,
      duration?: SingleDayDuration,
    ) =>
    (time: string) => {
      if (duration?.singleType === SPECIFY_TIME) {
        pickSingleDayDuration({
          ...duration,
          singleFromTime: time,
        });
      }
    };

  setToTime =
    (
      pickSingleDayDuration: typeof pickSingleDayDurationAction,
      duration?: SingleDayDuration,
    ) =>
    (time: string) => {
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
      duration,
      pickSingleDayDuration,
      forceUpdateSlider,
      workShift,
    } = this.props;
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
                pickSingleDayDuration({duration: {type: FULL_DAY}});
              }}
            />
            <RadioItem
              title={'Half Day - Morning'}
              radioProps={{selected: this.isHalfDayMorning(duration)}}
              style={{...radioStyle}}
              onPress={() => {
                pickSingleDayDuration({duration: {type: HALF_DAY_MORNING}});
              }}
            />
            <RadioItem
              title={'Half Day - Afternoon'}
              radioProps={{selected: this.isHalfDayAfternoon(duration)}}
              style={{...radioStyle}}
              onPress={() => {
                pickSingleDayDuration({duration: {type: HALF_DAY_AFTERNOON}});
              }}
            />
            <RadioItem
              title={'Specify Time'}
              radioProps={{selected: this.isSpecifyTime(duration)}}
              style={{...radioStyle}}
              onPress={() => {
                pickSingleDayDuration({
                  singleType: SPECIFY_TIME,
                  singleFromTime: workShift.startTime,
                  singleToTime: workShift.endTime,
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
              forceUpdate={forceUpdateSlider}
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
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});

const mapStateToProps = (state: RootState) => ({
  duration: selectDuration(state),
  forceUpdateSlider: selectForceUpdateSlider(state),
  workShift: selectWorkShift(state),
});

const mapDispatchToProps = {
  pickSingleDayDuration: pickSingleDayDurationAction,
  setPickedState,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const PickLeaveRequestDurationWithTheme =
  withTheme<PickLeaveRequestDurationProps>()(PickLeaveRequestDuration);

export default connector(PickLeaveRequestDurationWithTheme);
