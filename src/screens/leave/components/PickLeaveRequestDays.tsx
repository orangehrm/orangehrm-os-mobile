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
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import Text from 'components/DefaultText';
import CardButton from 'components/CardButton';
import Icon from 'components/DefaultIcon';
import FormattedDate from 'components/FormattedDate';
import {navigate} from 'lib/helpers/navigation';
import {isSingleDayRequest, isMultipleDayRequest} from 'lib/helpers/leave';
import {
  FULL_DAY,
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
} from 'store/leave/common-screens/types';

class PickLeaveRequestDays extends React.Component<PickLeaveRequestDaysProps> {
  constructor(props: PickLeaveRequestDaysProps) {
    super(props);
  }

  onPressRequestDays = () => {
    navigate(this.props.calendarScreenRoute);
    this.setState({oncePressed: true});
  };

  onPressDuration = () => {
    navigate(this.props.durationScreenRoute);
  };

  onPressPartialDays = () => {
    navigate(this.props.partialDaysScreenRoute);
  };

  getSelectedTextForDuration = () => {
    const {duration} = this.props;
    if (duration.duration.type === FULL_DAY) {
      return 'Full Day';
    } else if (duration.duration.type === HALF_DAY_MORNING) {
      return 'Half Day - Morning';
    } else if (duration.duration.type === HALF_DAY_AFTERNOON) {
      return 'Half Day - Afternoon';
    } else if (duration.duration.type === SPECIFY_TIME) {
      return duration.duration.fromTime + ' - ' + duration.duration.toTime;
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

  getPartialOptionDetails = () => {
    const {partialOption} = this.props;
    const details: NameValue[] = [];
    if (
      partialOption.partialOption === PARTIAL_OPTION_ALL ||
      partialOption.partialOption === PARTIAL_OPTION_START ||
      partialOption.partialOption === PARTIAL_OPTION_END ||
      partialOption.partialOption === PARTIAL_OPTION_START_END
    ) {
      const name =
        partialOption.partialOption === PARTIAL_OPTION_ALL
          ? 'All Days:'
          : 'Start Day:';
      if (partialOption.duration.type === HALF_DAY_MORNING) {
        details.push({name, value: 'Half Day - Morning'});
      } else if (partialOption.duration.type === HALF_DAY_AFTERNOON) {
        details.push({name, value: 'Half Day - Afternoon'});
      } else if (partialOption.duration.type === SPECIFY_TIME) {
        details.push({
          name,
          value:
            partialOption.duration.fromTime +
            ' - ' +
            partialOption.duration.toTime,
        });
      }
    }
    if (partialOption.partialOption === PARTIAL_OPTION_START_END) {
      const name = 'End Day:';
      if (partialOption.endDuration.type === HALF_DAY_MORNING) {
        details.push({name, value: 'Half Day - Morning'});
      } else if (partialOption.endDuration.type === HALF_DAY_AFTERNOON) {
        details.push({name, value: 'Half Day - Afternoon'});
      } else if (partialOption.endDuration.type === SPECIFY_TIME) {
        details.push({
          name,
          value:
            partialOption.endDuration.fromTime +
            ' - ' +
            partialOption.endDuration.toTime,
        });
      }
    }
    return details;
  };

  render() {
    const {theme, fromDate, toDate, error} = this.props;
    const partialOptionDetails = this.getPartialOptionDetails();

    return (
      <>
        <View>
          <CardButton
            style={[
              styles.cardButton,
              {height: theme.spacing * 12},
              styles.marginForShadow,
            ]}
            onPress={this.onPressRequestDays}>
            <View style={[styles.cardButtonContent]}>
              <View style={styles.buttonLeftView}>
                <Icon name={'calendar'} />
                <Text style={{paddingTop: theme.spacing * 0.5}}>
                  {'Request Day(s)'}
                </Text>
              </View>
              {error && error !== '' ? (
                <Text
                  style={{
                    color: theme.palette.error,
                    fontSize: theme.typography.smallFontSize,
                    paddingTop: theme.spacing,
                  }}>
                  {error}
                </Text>
              ) : null}
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
                  <FormattedDate style={{color: theme.palette.secondary}}>
                    {fromDate}
                  </FormattedDate>
                </View>
                <View
                  style={[
                    styles.requestDaysTextView,
                    {
                      paddingVertical: theme.spacing,
                    },
                  ]}>
                  <Text>{'To:'}</Text>
                  <FormattedDate style={{color: theme.palette.secondary}}>
                    {isSingleDayRequest(fromDate, toDate) ? fromDate : toDate}
                  </FormattedDate>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}

          {isSingleDayRequest(fromDate, toDate) ? (
            <CardButton
              style={[
                styles.cardButton,
                {height: theme.spacing * 12},
                styles.marginForShadow,
              ]}
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
            <>
              <CardButton
                style={[
                  styles.cardButton,
                  {height: theme.spacing * 12},
                  styles.marginForShadow,
                ]}
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
              {partialOptionDetails.length !== 0 ? (
                <TouchableWithoutFeedback onPress={this.onPressPartialDays}>
                  <View
                    style={{
                      backgroundColor: theme.palette.background,
                      paddingVertical: theme.spacing * 3,
                      paddingLeft: theme.spacing * 13,
                      paddingRight: theme.spacing * 20,
                    }}>
                    {partialOptionDetails.map((item, index) => (
                      <View
                        key={index}
                        style={[
                          styles.partialDaysTextView,
                          {
                            paddingVertical: theme.spacing,
                          },
                        ]}>
                        <Text>{item.name}</Text>
                        <Text>{item.value}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableWithoutFeedback>
              ) : null}
            </>
          ) : null}
        </View>
      </>
    );
  }
}

interface PickLeaveRequestDaysProps extends WithTheme {
  fromDate?: string;
  toDate?: string;
  duration: SingleDayDuration;
  partialOption: MultipleDayPartialOption;
  calendarScreenRoute: string;
  durationScreenRoute: string;
  partialDaysScreenRoute: string;
  error?: string;
}

type NameValue = {name: string; value: string};

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
  partialDaysTextView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marginForShadow: {
    ...Platform.select({
      ios: {
        marginBottom: 2,
      },
    }),
  },
});

export default withTheme<PickLeaveRequestDaysProps>()(PickLeaveRequestDays);
