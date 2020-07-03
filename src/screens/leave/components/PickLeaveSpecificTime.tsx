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
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import Text from 'components/DefaultText';
import Divider from 'components/DefaultDivider';
import LeaveSpecificTimeSlider from 'screens/leave/components/LeaveSpecificTimeSlider';
import {getTimeValuesForSlider} from 'lib/helpers/leave';
import {getDateFromString} from 'lib/helpers/time';

class PickLeaveSpecificTime extends React.Component<
  PickLeaveSpecificTimeProps
> {
  isValidTimes = (fromTime: string, toTime: string) => {
    return getDateFromString(fromTime) < getDateFromString(toTime);
  };

  render() {
    const {theme, fromTime, toTime, setFromTime, setToTime} = this.props;

    return (
      <>
        <Divider />
        <View
          style={{
            paddingHorizontal: theme.spacing * 6,
            backgroundColor: theme.palette.background,
            paddingVertical: theme.spacing * 4,
          }}>
          <View
            style={[
              styles.rowView,
              {
                paddingVertical: theme.spacing * 4,
              },
            ]}>
            <Text style={styles.text}>{'From'}</Text>
            <View style={styles.sliderView}>
              <LeaveSpecificTimeSlider
                values={getTimeValuesForSlider()}
                value={fromTime}
                setValue={setFromTime}
                minimumTrackTintColor={theme.palette.default}
                maximumTrackTintColor={theme.palette.secondary}
              />
            </View>
            <Text>{fromTime}</Text>
          </View>
          <View
            style={[
              styles.rowView,
              {
                paddingVertical: theme.spacing * 4,
              },
            ]}>
            <Text style={styles.text}>{'To'}</Text>
            <View style={styles.sliderView}>
              <LeaveSpecificTimeSlider
                values={getTimeValuesForSlider()}
                value={toTime}
                setValue={setToTime}
              />
            </View>
            <Text>{toTime}</Text>
          </View>
          {this.isValidTimes(fromTime, toTime) ? null : (
            <Text
              style={{
                color: theme.palette.error,
                fontSize: theme.typography.smallFontSize,
              }}>
              {'From Time Should Be Before To Time'}
            </Text>
          )}
        </View>
      </>
    );
  }
}

interface PickLeaveSpecificTimeProps extends WithTheme {
  fromTime: string;
  toTime: string;
  setFromTime: (time: string) => void;
  setToTime: (time: string) => void;
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
  },
  sliderView: {
    flex: 1,
  },
  text: {
    width: 30,
  },
});

export default withTheme<PickLeaveSpecificTimeProps>()(PickLeaveSpecificTime);
