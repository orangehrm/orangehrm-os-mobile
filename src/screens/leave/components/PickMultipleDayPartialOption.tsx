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
import RadioItem from 'components/DefaultRadioItem';
import Text from 'components/DefaultText';
import Divider from 'components/DefaultDivider';
import PickLeaveSpecificTime from 'screens/leave/components/PickLeaveSpecificTime';
import {
  DEFAULT_FROM_TIME,
  DEFAULT_TO_TIME,
} from 'store/leave/apply-leave/types';

class PickMultipleDayPartialOption extends React.Component<
  PickMultipleDayPartialOptionProps
> {
  render() {
    const {
      theme,
      title,
      isHalfDayMorning,
      isHalfDayAfternoon,
      isSpecifyTime,
      specificTimeFrom = DEFAULT_FROM_TIME,
      specificTimeTo = DEFAULT_TO_TIME,
      onPressHalfDayMorning,
      onPressHalfDayAfternoon,
      onPressSpecifyTime,
      setSpecificTimeFrom,
      setSpecificTimeTo,
    } = this.props;

    const radioStyle = {paddingVertical: theme.spacing * 2};

    return (
      <>
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
              backgroundColor: theme.palette.background,
            }}>
            <Text bold style={{padding: theme.spacing * 4}}>
              {title}
            </Text>
            <Divider />
            <View
              style={{
                paddingHorizontal: theme.spacing * 8,
                paddingVertical: theme.spacing * 2,
              }}>
              <RadioItem
                title={'Half Day - Morning'}
                radioProps={{
                  selected: isHalfDayMorning,
                }}
                style={{...radioStyle}}
                onPress={onPressHalfDayMorning}
              />
              <RadioItem
                title={'Half Day - Afternoon'}
                radioProps={{
                  selected: isHalfDayAfternoon,
                }}
                style={{...radioStyle}}
                onPress={onPressHalfDayAfternoon}
              />
              <RadioItem
                title={'Specify Time'}
                radioProps={{selected: isSpecifyTime}}
                style={{...radioStyle}}
                onPress={onPressSpecifyTime}
              />
            </View>

            {isSpecifyTime ? (
              <PickLeaveSpecificTime
                fromTime={specificTimeFrom}
                toTime={specificTimeTo}
                setFromTime={setSpecificTimeFrom}
                setToTime={setSpecificTimeTo}
              />
            ) : null}
          </View>
        </View>
      </>
    );
  }
}

interface PickMultipleDayPartialOptionProps extends WithTheme {
  title: string;
  isHalfDayMorning: boolean;
  isHalfDayAfternoon: boolean;
  isSpecifyTime: boolean;
  specificTimeFrom?: string;
  specificTimeTo?: string;
  onPressHalfDayMorning: () => void;
  onPressHalfDayAfternoon: () => void;
  onPressSpecifyTime: () => void;
  setSpecificTimeFrom: (time: string) => void;
  setSpecificTimeTo: (time: string) => void;
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});

export default withTheme<PickMultipleDayPartialOptionProps>()(
  PickMultipleDayPartialOption,
);
