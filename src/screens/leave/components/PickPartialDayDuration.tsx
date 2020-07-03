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
import {pickMultipleDayPartialOption as pickMultipleDayPartialOptionAction} from 'store/leave/apply-leave/actions';
import RadioItem from 'components/DefaultRadioItem';
import Text from 'components/DefaultText';
import Divider from 'components/DefaultDivider';
import {
  HALF_DAY,
  HALF_DAY_MORNING,
  HALF_DAY_AFTERNOON,
  PARTIAL_OPTION_ALL,
  PARTIAL_OPTION_START,
  PARTIAL_OPTION_END,
  PARTIAL_OPTION_START_END,
  MultipleDayPartialOption,
} from 'store/leave/apply-leave/types';

class PickPartialDayDuration extends React.Component<
  PickPartialDayDurationProps
> {
  isStartDayHalfDayAfternoon = (partialOption?: MultipleDayPartialOption) => {
    if (
      partialOption?.partialOption === PARTIAL_OPTION_ALL ||
      partialOption?.partialOption === PARTIAL_OPTION_START
    ) {
      return (
        partialOption?.startDayType === HALF_DAY &&
        partialOption?.startDayAMPM === HALF_DAY_AFTERNOON
      );
    }
    return false;
  };

  isStartDayHalfDayMorning = (partialOption?: MultipleDayPartialOption) => {
    if (
      partialOption?.partialOption === PARTIAL_OPTION_ALL ||
      partialOption?.partialOption === PARTIAL_OPTION_START
    ) {
      return (
        partialOption?.startDayType === HALF_DAY &&
        partialOption?.startDayAMPM === HALF_DAY_MORNING
      );
    }
    return false;
  };

  isEndDayHalfDayAfternoon = (partialOption?: MultipleDayPartialOption) => {
    return (
      partialOption?.partialOption === PARTIAL_OPTION_END &&
      partialOption?.endDayType === HALF_DAY &&
      partialOption?.endDayAMPM === HALF_DAY_AFTERNOON
    );
  };

  isEndDayHalfDayMorning = (partialOption?: MultipleDayPartialOption) => {
    return (
      partialOption?.partialOption === PARTIAL_OPTION_END &&
      partialOption?.endDayType === HALF_DAY &&
      partialOption?.endDayAMPM === HALF_DAY_MORNING
    );
  };

  isStartEndOptionEndDayHalfDayAfternoon = (
    partialOption?: MultipleDayPartialOption,
  ) => {
    return (
      partialOption?.partialOption === PARTIAL_OPTION_START_END &&
      partialOption?.endDayType === HALF_DAY &&
      partialOption?.endDayAMPM === HALF_DAY_AFTERNOON
    );
  };

  isStartEndOptionEndDayHalfDayMorning = (
    partialOption?: MultipleDayPartialOption,
  ) => {
    return (
      partialOption?.partialOption === PARTIAL_OPTION_START_END &&
      partialOption?.endDayType === HALF_DAY &&
      partialOption?.endDayAMPM === HALF_DAY_MORNING
    );
  };

  isStartEndOptionStartDayHalfDayAfternoon = (
    partialOption?: MultipleDayPartialOption,
  ) => {
    return (
      partialOption?.partialOption === PARTIAL_OPTION_START_END &&
      partialOption?.startDayType === HALF_DAY &&
      partialOption?.startDayAMPM === HALF_DAY_AFTERNOON
    );
  };

  isStartEndOptionStartDayHalfDayMorning = (
    partialOption?: MultipleDayPartialOption,
  ) => {
    return (
      partialOption?.partialOption === PARTIAL_OPTION_START_END &&
      partialOption?.startDayType === HALF_DAY &&
      partialOption?.startDayAMPM === HALF_DAY_MORNING
    );
  };

  render() {
    const {theme, partialOption, pickMultipleDayPartialOption} = this.props;

    const radioStyle = {paddingVertical: theme.spacing * 2};

    return (
      <>
        {partialOption?.partialOption === PARTIAL_OPTION_ALL ||
        partialOption?.partialOption === PARTIAL_OPTION_START ? (
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
                {partialOption?.partialOption === PARTIAL_OPTION_ALL
                  ? 'All Days'
                  : 'Start Day'}
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
                    selected: this.isStartDayHalfDayMorning(partialOption),
                  }}
                  style={{...radioStyle}}
                  onPress={() => {
                    if (partialOption?.partialOption === PARTIAL_OPTION_ALL) {
                      pickMultipleDayPartialOption({
                        partialOption: PARTIAL_OPTION_ALL,
                        startDayType: HALF_DAY,
                        startDayAMPM: HALF_DAY_MORNING,
                      });
                    } else {
                      pickMultipleDayPartialOption({
                        partialOption: PARTIAL_OPTION_START,
                        startDayType: HALF_DAY,
                        startDayAMPM: HALF_DAY_MORNING,
                      });
                    }
                  }}
                />
                <RadioItem
                  title={'Half Day - Afternoon'}
                  radioProps={{
                    selected: this.isStartDayHalfDayAfternoon(partialOption),
                  }}
                  style={{...radioStyle}}
                  onPress={() => {
                    if (partialOption?.partialOption === PARTIAL_OPTION_ALL) {
                      pickMultipleDayPartialOption({
                        partialOption: PARTIAL_OPTION_ALL,
                        startDayType: HALF_DAY,
                        startDayAMPM: HALF_DAY_AFTERNOON,
                      });
                    } else {
                      pickMultipleDayPartialOption({
                        partialOption: PARTIAL_OPTION_START,
                        startDayType: HALF_DAY,
                        startDayAMPM: HALF_DAY_AFTERNOON,
                      });
                    }
                  }}
                />
              </View>
            </View>
          </View>
        ) : null}

        {partialOption?.partialOption === PARTIAL_OPTION_END ? (
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
                {'End Day'}
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
                    selected: this.isEndDayHalfDayMorning(partialOption),
                  }}
                  style={{...radioStyle}}
                  onPress={() => {
                    pickMultipleDayPartialOption({
                      partialOption: PARTIAL_OPTION_END,
                      endDayType: HALF_DAY,
                      endDayAMPM: HALF_DAY_MORNING,
                    });
                  }}
                />
                <RadioItem
                  title={'Half Day - Afternoon'}
                  radioProps={{
                    selected: this.isEndDayHalfDayAfternoon(partialOption),
                  }}
                  style={{...radioStyle}}
                  onPress={() => {
                    pickMultipleDayPartialOption({
                      partialOption: PARTIAL_OPTION_END,
                      endDayType: HALF_DAY,
                      endDayAMPM: HALF_DAY_AFTERNOON,
                    });
                  }}
                />
              </View>
            </View>
          </View>
        ) : null}

        {partialOption?.partialOption === PARTIAL_OPTION_START_END ? (
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
                  {'Start Day'}
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
                      selected: this.isStartEndOptionStartDayHalfDayMorning(
                        partialOption,
                      ),
                    }}
                    style={{...radioStyle}}
                    onPress={() => {
                      pickMultipleDayPartialOption({
                        ...partialOption,
                        partialOption: PARTIAL_OPTION_START_END,
                        startDayType: HALF_DAY,
                        startDayAMPM: HALF_DAY_MORNING,
                      });
                    }}
                  />
                  <RadioItem
                    title={'Half Day - Afternoon'}
                    radioProps={{
                      selected: this.isStartEndOptionStartDayHalfDayAfternoon(
                        partialOption,
                      ),
                    }}
                    style={{...radioStyle}}
                    onPress={() => {
                      pickMultipleDayPartialOption({
                        ...partialOption,
                        partialOption: PARTIAL_OPTION_START_END,
                        startDayType: HALF_DAY,
                        startDayAMPM: HALF_DAY_AFTERNOON,
                      });
                    }}
                  />
                </View>
              </View>
            </View>
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
                  {'End Day'}
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
                      selected: this.isStartEndOptionEndDayHalfDayMorning(
                        partialOption,
                      ),
                    }}
                    style={{...radioStyle}}
                    onPress={() => {
                      pickMultipleDayPartialOption({
                        ...partialOption,
                        partialOption: PARTIAL_OPTION_START_END,
                        endDayType: HALF_DAY,
                        endDayAMPM: HALF_DAY_MORNING,
                      });
                    }}
                  />
                  <RadioItem
                    title={'Half Day - Afternoon'}
                    radioProps={{
                      selected: this.isStartEndOptionEndDayHalfDayAfternoon(
                        partialOption,
                      ),
                    }}
                    style={{...radioStyle}}
                    onPress={() => {
                      pickMultipleDayPartialOption({
                        ...partialOption,
                        partialOption: PARTIAL_OPTION_START_END,
                        endDayType: HALF_DAY,
                        endDayAMPM: HALF_DAY_AFTERNOON,
                      });
                    }}
                  />
                </View>
              </View>
            </View>
          </>
        ) : null}
      </>
    );
  }
}

interface PickPartialDayDurationProps extends WithTheme {
  partialOption?: MultipleDayPartialOption;
  pickMultipleDayPartialOption: typeof pickMultipleDayPartialOptionAction;
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
});

export default withTheme<PickPartialDayDurationProps>()(PickPartialDayDuration);
