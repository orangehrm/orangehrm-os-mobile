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
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect} from 'react-redux';
import Card from 'components/DefaultCard';
import CardContent from 'components/DefaultCardContent';
import Text from 'components/DefaultText';
import Divider from 'components/DefaultDivider';
import {fetchPunchStatus} from 'store/time/punch/actions';
import Icon from 'components/DefaultIcon';
import {AndroidEvent} from '@react-native-community/datetimepicker/src/index';
import {formatTime} from 'lib/helpers/attendance';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormattedDate from 'components/FormattedDate';

class EditPunchInOutDateTimeCard extends React.Component<
  EditPunchInOutDateTimeCardProps,
  EditPunchInOutDateTimeCardState
> {
  constructor(props: EditPunchInOutDateTimeCardProps) {
    super(props);
    this.state = {
      show: false,
      mode: DATE,
    };
  }

  onChange = (event: AndroidEvent, selectedDate?: Date) => {
    this.setState(
      {
        show: false,
      },
      () => {
        if (selectedDate) {
          this.props.updateDateTime(selectedDate);
        }
      },
    );
  };

  showDatepicker = () => {
    this.setState({show: true, mode: DATE});
  };

  showTimepicker = () => {
    this.setState({show: true, mode: TIME});
  };

  render() {
    const {theme, punchCurrentDateTime} = this.props;
    const {mode} = this.state;

    let date;
    if (punchCurrentDateTime === undefined) {
      date = new Date();
    } else {
      date = punchCurrentDateTime;
    }
    const dateDisplay = date.toDateString();
    const timeDisplay = formatTime(date);

    return (
      <>
        <View
          style={{
            paddingHorizontal: theme.spacing * 5,
            paddingBottom: theme.spacing * 4,
          }}>
          <Card
            fullWidth
            style={{
              borderRadius: theme.borderRadius * 2,
            }}>
            <CardContent
              style={{
                paddingTop: theme.spacing * 4,
                paddingHorizontal: theme.spacing * 3,
              }}>
              <TouchableOpacity
                style={[
                  styles.justifyContentCenter,
                  styles.rowFlexDirection,
                  {
                    marginTop: theme.spacing,
                    marginBottom: theme.spacing * 4,
                  },
                ]}
                onPress={() => {
                  this.showDatepicker();
                }}>
                <View
                  style={[
                    styles.rowFlexDirection,
                    styles.flexOne,
                    {
                      paddingLeft: theme.spacing * 3,
                    },
                  ]}>
                  <View
                    style={{
                      padding: theme.spacing,
                      paddingRight: theme.spacing * 3,
                    }}>
                    <Icon name={'calendar-blank'} />
                  </View>
                  <View>
                    <Text
                      style={{fontSize: theme.typography.subHeaderFontSize}}>
                      {'Date'}
                    </Text>
                  </View>
                </View>
                <View style={[styles.rowFlexDirection, styles.flexTwo]}>
                  <View
                    style={[
                      styles.alignItemsFlexEnd,
                      styles.flexOne,
                      {
                        paddingRight: theme.spacing,
                      },
                    ]}>
                    <FormattedDate
                      style={{
                        color: theme.palette.secondary,
                        fontSize: theme.typography.subHeaderFontSize,
                      }}>
                      {dateDisplay}
                    </FormattedDate>
                  </View>
                  <View style={[styles.alignItemsFlexEnd]}>
                    <Icon name={'chevron-right'} />
                  </View>
                </View>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                style={[
                  styles.rowFlexDirection,
                  styles.justifyContentCenter,
                  {
                    marginTop: theme.spacing * 4,
                    marginBottom: theme.spacing * 5,
                  },
                ]}
                onPress={() => {
                  this.showTimepicker();
                }}>
                <View
                  style={[
                    styles.rowFlexDirection,
                    styles.flexOne,
                    {
                      paddingLeft: theme.spacing * 3,
                    },
                  ]}>
                  <View
                    style={{
                      padding: theme.spacing,
                      paddingRight: theme.spacing * 3,
                    }}>
                    <Icon name={'clock-outline'} />
                  </View>
                  <View>
                    <Text
                      style={{fontSize: theme.typography.subHeaderFontSize}}>
                      {'Time'}
                    </Text>
                  </View>
                </View>
                <View style={[styles.flexTwo, styles.rowFlexDirection]}>
                  <View
                    style={[
                      styles.alignItemsFlexEnd,
                      styles.flexOne,
                      {
                        paddingRight: theme.spacing,
                      },
                    ]}>
                    <Text
                      style={{
                        color: theme.palette.secondary,
                        fontSize: theme.typography.subHeaderFontSize,
                      }}>
                      {timeDisplay}
                    </Text>
                  </View>
                  <View style={[styles.alignItemsFlexEnd]}>
                    <Icon name={'chevron-right'} />
                  </View>
                </View>
              </TouchableOpacity>
              {this.state.show ? (
                <>
                  <View>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      is24Hour={false}
                      display="default"
                      onChange={this.onChange}
                    />
                  </View>
                </>
              ) : null}
            </CardContent>
          </Card>
        </View>
      </>
    );
  }
}

interface EditPunchInOutDateTimeCardProps extends WithTheme {
  punchCurrentDateTime?: Date;
  updateDateTime: (date: Date) => void;
}

interface EditPunchInOutDateTimeCardState {
  show: boolean;
  mode: typeof TIME | typeof DATE;
}

const styles = StyleSheet.create({
  justifyContentCenter: {
    justifyContent: 'center',
  },
  alignItemsFlexEnd: {
    alignItems: 'flex-end',
  },
  rowFlexDirection: {
    flexDirection: 'row',
  },
  flexTwo: {
    flex: 2,
  },
  flexOne: {
    flex: 1,
  },
});

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  fetchPunchStatus,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const EditPunchInOutDateTimeCardCardWithTheme = withTheme<EditPunchInOutDateTimeCardProps>()(
  EditPunchInOutDateTimeCard,
);

const DATE = 'date';
const TIME = 'time';

export default connector(EditPunchInOutDateTimeCardCardWithTheme);
