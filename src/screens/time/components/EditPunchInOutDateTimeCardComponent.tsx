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
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect} from 'react-redux';
import Card from 'components/DefaultCard';
import CardContent from 'components/DefaultCardContent';
import Text from 'components/DefaultText';
import Divider from 'components/DefaultDivider';
import {fetchPunchStatus} from 'store/time/punch/actions';
import Icon from 'components/DefaultIcon';
import DateTimePicker, {
  DateTimePickerEvent,
  IOSNativeProps,
  AndroidNativeProps,
} from '@react-native-community/datetimepicker';
import FormattedDate from 'components/FormattedDate';
import {formatTime} from 'lib/helpers/attendance';
import {$PropertyType} from 'utility-types';

class EditPunchInOutDateTimeCard extends React.Component<
  EditPunchInOutDateTimeCardProps,
  EditPunchInOutDateTimeCardState
> {
  constructor(props: EditPunchInOutDateTimeCardProps) {
    super(props);
    this.state = {
      show: false,
      mode: DATE,
      display: DISPLAY_DEFAULT,
      iosPickerDate: undefined,
    };
  }

  onChangeAndroid = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      this.setState({show: false});
      return;
    }
    if (event.type === 'set' && selectedDate) {
      this.setState({show: false}, () => {
        this.props.updateDateTime(selectedDate);
      });
    }
  };

  /** iOS spinner fires on every tick; only update draft until user taps Done. */
  onChangeIos = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      this.setState({iosPickerDate: selectedDate});
    }
  };

  onConfirmIos = () => {
    const {iosPickerDate} = this.state;
    const {punchCurrentDateTime} = this.props;
    const resolved =
      iosPickerDate ?? punchCurrentDateTime ?? new Date();
    this.setState({show: false, iosPickerDate: undefined}, () => {
      this.props.updateDateTime(resolved);
    });
  };

  onCancelIos = () => {
    this.setState({show: false, iosPickerDate: undefined});
  };

  showDatepicker = () => {
    const {punchCurrentDateTime} = this.props;
    const base = punchCurrentDateTime ?? new Date();
    this.setState({
      show: true,
      mode: DATE,
      display: Platform.OS === 'ios' ? DISPLAY_SPINNER : DISPLAY_DEFAULT,
      iosPickerDate: new Date(base),
    });
  };

  showTimepicker = () => {
    const {punchCurrentDateTime} = this.props;
    const base = punchCurrentDateTime ?? new Date();
    this.setState({
      show: true,
      mode: TIME,
      display: Platform.OS === 'ios' ? DISPLAY_SPINNER : DISPLAY_DEFAULT,
      iosPickerDate: new Date(base),
    });
  };

  render() {
    const {theme, punchCurrentDateTime} = this.props;
    const {mode, display} = this.state;

    let date;
    if (punchCurrentDateTime === undefined) {
      date = new Date();
      this.props.updateDateTime(date);
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
              {Platform.OS === 'android' && this.state.show ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date(date)}
                  mode={mode}
                  is24Hour={false}
                  display={display}
                  onChange={this.onChangeAndroid}
                />
              ) : null}
              {Platform.OS === 'ios' ? (
                <Modal
                  visible={this.state.show}
                  transparent
                  animationType="slide"
                  onRequestClose={this.onCancelIos}>
                  <View style={styles.iosModalRoot}>
                    <TouchableOpacity
                      style={styles.iosModalBackdrop}
                      activeOpacity={1}
                      onPress={this.onCancelIos}
                    />
                    <View
                      style={[
                        styles.iosModalSheet,
                        {backgroundColor: theme.palette.background},
                      ]}>
                      <View
                        style={[
                          styles.iosModalToolbar,
                          {
                            borderBottomColor: theme.palette.defaultDark,
                            paddingHorizontal: theme.spacing * 3,
                          },
                        ]}>
                        <TouchableOpacity
                          onPress={this.onCancelIos}
                          style={{paddingVertical: theme.spacing * 2}}>
                          <Text
                            style={{
                              fontSize: theme.typography.subHeaderFontSize,
                              color: theme.palette.secondary,
                            }}>
                            {'Cancel'}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={this.onConfirmIos}
                          style={{paddingVertical: theme.spacing * 2}}>
                          <Text
                            style={{
                              fontSize: theme.typography.subHeaderFontSize,
                              color: theme.palette.primary,
                              fontWeight: '600',
                            }}>
                            {'Done'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={
                          this.state.iosPickerDate
                            ? new Date(this.state.iosPickerDate)
                            : new Date(date)
                        }
                        mode={mode}
                        is24Hour={false}
                        display={display}
                        onChange={this.onChangeIos}
                      />
                    </View>
                  </View>
                </Modal>
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
  display:
    | $PropertyType<IOSNativeProps, 'display'>
    | $PropertyType<AndroidNativeProps, 'display'>;
  iosPickerDate?: Date;
}

const styles = StyleSheet.create({
  iosModalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  iosModalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  iosModalSheet: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    paddingBottom: 8,
  },
  iosModalToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
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

const EditPunchInOutDateTimeCardCardWithTheme =
  withTheme<EditPunchInOutDateTimeCardProps>()(EditPunchInOutDateTimeCard);

const DATE = 'date';
const TIME = 'time';

export const DISPLAY_DEFAULT = 'default';
export const DISPLAY_SPINNER = 'spinner';

export default connector(EditPunchInOutDateTimeCardCardWithTheme); 
