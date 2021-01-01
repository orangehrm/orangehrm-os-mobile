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
import {StyleSheet, Keyboard, TextInput as RNTextInput} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import MainLayout from 'layouts/MainLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {
  fetchPunchStatus,
  changePunchCurrentDateTime,
  setPunchNote,
  savePunchInRequest,
  savePunchOutRequest,
} from 'store/time/punch/actions';
import {
  PunchRequest,
  PUNCHED_IN,
  PUNCHED_OUT,
  INITIAL,
} from 'store/time/punch/types';
import {
  selectPunchStatus,
  selectPunchCurrentDateTime,
  selectSavedPunchNote,
} from 'store/time/punch/selectors';
import Text from 'components/DefaultText';
import Divider from 'components/DefaultDivider';
import Button from 'components/DefaultButton';
import Icon from 'components/DefaultIcon';
import EditPunchInOutDateTimeCard from 'screens/time/components/EditPunchInOutDateTimeCardComponent';
import PunchInOutDateTimeCard from 'screens/time/components/PunchInOutDateTimeCardComponent';
import PickNote, {PickNoteFooter} from 'screens/time/components/NoteComponent';
import Card from 'components/DefaultCard';
import CardContent from 'components/DefaultCardContent';
import View from 'components/HideableView';
import {
  calculateDurationBasedOnTimezone,
  getDateSaveFormatFromDateObject,
  getCurrentTimeZoneOffset,
  NEGATIVE_DURATION,
  getLocalDateObjectFromSaveFormat,
  formatTime,
  formatTimezoneOffset,
} from 'lib/helpers/attendance';
import {TYPE_WARN} from 'store/globals/types';
import withGlobals, {WithGlobals} from 'lib/hoc/withGlobals';
import {selectCurrentRoute} from 'store/globals/selectors';
import {PUNCH} from 'screens/index';
import FormattedDate from 'components/FormattedDate';

class Punch extends React.Component<PunchProps, PunchState> {
  inputRef: RNTextInput | null;
  timeInterval: any;

  constructor(props: PunchProps) {
    super(props);
    this.inputRef = null;
    this.timeInterval = null;
    this.state = {
      typingNote: false,
      note: '',
      duration: '00:00',
    };
  }

  componentDidUpdate(prevProps: PunchProps) {
    if (this.props.currentRoute === PUNCH && prevProps.currentRoute !== PUNCH) {
      this.onRefresh();
    }
    if (
      prevProps.currentRoute !== this.props.currentRoute ||
      prevProps.punchStatus?.dateTimeEditable !==
        this.props.punchStatus?.dateTimeEditable
    ) {
      if (this.props.punchStatus?.dateTimeEditable === undefined) {
      }
      if (
        this.props.currentRoute === PUNCH &&
        this.timeInterval === null &&
        this.props.punchStatus?.dateTimeEditable === false
      ) {
        this.timeInterval = setInterval(this.onAutoReload, 30000);
      } else {
        clearInterval(this.timeInterval);
        this.timeInterval = null;
      }
    }
    if (
      prevProps.punchCurrentDateTime !== this.props.punchCurrentDateTime &&
      this.props.punchStatus?.punchState === PUNCHED_IN
    ) {
      if (
        this.props.punchStatus?.punchTime &&
        this.props.punchCurrentDateTime
      ) {
        const duration = this.calculateDuration(
          this.props.punchStatus?.punchTime,
          getDateSaveFormatFromDateObject(this.props.punchCurrentDateTime),
          parseFloat(this.props.punchStatus.punchTimeZoneOffset),
          getCurrentTimeZoneOffset(),
        );
        /* eslint-disable react/no-did-update-set-state */
        this.setState({duration: duration});
        /* eslint-enable react/no-did-update-set-state */
      }
    }
  }

  componentDidMount() {
    this.props.fetchPunchStatus();
    Keyboard.addListener('keyboardDidHide', this.hideCommentInput);
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidHide', this.hideCommentInput);
  }

  onRefresh = () => {
    this.props.fetchPunchStatus();
  };

  onAutoReload = () => {
    this.props.fetchPunchStatus(true);
  };

  updateDateTime = (datetime: Date) => {
    this.props.changePunchCurrentDateTime(datetime);
  };

  setNote = (text: string) => {
    this.setState({
      note: text,
    });
  };

  toggleCommentInput = () => {
    if (this.state.typingNote === true) {
      this.hideCommentInput();
    } else {
      this.showCommentInput();
    }
  };

  onPressNote = () => {
    const {note} = this.state;
    this.props.setPunchNote(note);
    this.hideCommentInput();
  };

  showCommentInput = () => {
    this.setState({typingNote: true});
  };

  hideCommentInput = () => {
    this.setState({typingNote: false});
  };

  setLeaveComment = (text: string) => {
    this.setState({
      note: text,
    });
  };

  onPressPunchButton = () => {
    const {punchCurrentDateTime, savedNote} = this.props;
    if (punchCurrentDateTime !== undefined) {
      const punchRequest: PunchRequest = {
        timezoneOffset: getCurrentTimeZoneOffset(),
        note: savedNote ? savedNote : undefined,
        datetime: getDateSaveFormatFromDateObject(punchCurrentDateTime),
      };
      if (this.props.punchStatus?.punchState === PUNCHED_IN) {
        this.props.savePunchOutRequest({
          ...punchRequest,
        });
      } else if (this.props.punchStatus?.punchState === PUNCHED_OUT) {
        this.props.savePunchInRequest({
          ...punchRequest,
        });
      } else if (this.props.punchStatus?.punchState === INITIAL) {
        this.props.savePunchInRequest({
          ...punchRequest,
        });
      }
      this.setState({note: ''});
    }
  };

  calculateDuration = (
    punchInDatetime: string,
    punchOutDatetime: string,
    punchInTimeZoneOffset: number,
    punchOutTimeZoneOffset: number,
  ) => {
    const duration = calculateDurationBasedOnTimezone(
      punchInDatetime,
      punchOutDatetime,
      punchInTimeZoneOffset,
      punchOutTimeZoneOffset,
    );
    if (duration === NEGATIVE_DURATION) {
      this.props.showSnackMessage(
        'Punch Out Time Should Be Later Than Punch In Time',
        TYPE_WARN,
      );
    }
    return duration;
  };

  render() {
    const {theme, punchStatus, punchCurrentDateTime, savedNote} = this.props;
    const {note} = this.state;
    const editable = punchStatus?.dateTimeEditable;
    return (
      <MainLayout
        onRefresh={this.onRefresh}
        footer={
          <View>
            {this.state.typingNote ? (
              <>
                <Divider />
                <PickNoteFooter
                  ref={(input) => {
                    this.inputRef = input;
                  }}
                  value={note}
                  onChangeText={this.setLeaveComment}
                  onPress={this.onPressNote}
                />
              </>
            ) : (
              <View
                style={{
                  paddingHorizontal: theme.spacing * 12,
                  paddingVertical: theme.spacing * 2,
                  backgroundColor: theme.palette.background,
                }}>
                <Button
                  title={
                    punchStatus?.punchState === PUNCHED_IN
                      ? 'Punch Out'
                      : 'Punch In'
                  }
                  primary
                  fullWidth
                  onPress={this.onPressPunchButton}
                />
              </View>
            )}
          </View>
        }>
        <View
          isVisible={editable !== undefined}
          style={[
            styles.flexOne,
            {backgroundColor: theme.palette.backgroundSecondary},
          ]}>
          <View
            style={{
              marginLeft: theme.spacing,
              marginTop: theme.spacing * 5,
            }}>
            {editable ? (
              <>
                <EditPunchInOutDateTimeCard
                  punchCurrentDateTime={punchCurrentDateTime}
                  updateDateTime={this.updateDateTime}
                />
              </>
            ) : (
              <PunchInOutDateTimeCard
                punchCurrentDateTime={punchCurrentDateTime}
              />
            )}
          </View>
          <View
            style={{
              paddingHorizontal: theme.spacing * 5,
              paddingBottom: theme.spacing * 4,
              paddingTop: theme.spacing * 3,
              paddingLeft: theme.spacing * 6,
            }}>
            <Card
              fullWidth
              style={{
                borderRadius: theme.borderRadius * 2,
              }}>
              <CardContent
                style={{
                  paddingTop: theme.spacing * 2,
                  paddingHorizontal: theme.spacing * 3,
                }}>
                {punchStatus?.punchState === PUNCHED_IN &&
                this.state.duration !== NEGATIVE_DURATION ? (
                  <>
                    <View
                      style={[
                        {
                          paddingTop: theme.spacing * 4,
                          marginHorizontal: theme.spacing * 5,
                        },
                        styles.durationMainView,
                      ]}>
                      <View style={[styles.durationText]}>
                        <View style={{marginRight: theme.spacing * 1.5}}>
                          <View
                            style={[
                              styles.briefcaseIcon,
                              styles.alignItemsCenter,
                              {
                                backgroundColor: theme.palette.secondary,
                                borderRadius: theme.borderRadius * 7,
                                width: theme.typography.headerFontSize * 1.5,
                                height: theme.typography.headerFontSize * 1.5,
                              },
                            ]}>
                            <Icon
                              name={'briefcase'}
                              style={[
                                {
                                  fontSize:
                                    theme.typography.headerIconSize * 0.7,
                                  padding: theme.spacing,
                                  paddingTop: theme.spacing * 1.5,
                                  color: theme.typography.secondaryColor,
                                },
                              ]}
                            />
                          </View>
                        </View>
                        <Text
                          style={[
                            styles.textBold,
                            {
                              color: theme.palette.secondary,
                              fontSize: theme.typography.headerFontSize,
                            },
                          ]}>
                          {'Duration'}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.hoursView,
                          {margin: theme.spacing * 1.25},
                        ]}>
                        <View style={{paddingLeft: theme.spacing * 1.25}}>
                          <Text
                            style={[
                              styles.textBold,
                              {
                                color: theme.palette.secondary,
                                fontSize: theme.typography.headerFontSize,
                              },
                            ]}>
                            {this.state.duration}
                            <Text
                              style={[
                                {
                                  color: theme.palette.secondary,
                                  fontSize: theme.typography.fontSize,
                                },
                              ]}>
                              {' Hours'}
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                  </>
                ) : null}

                {punchStatus?.punchState !== INITIAL ? (
                  <>
                    <View style={{paddingBottom: theme.spacing * 3}}>
                      <View
                        style={[
                          styles.lastRecordDetailsMainView,
                          {
                            marginVertical: theme.spacing * 3,
                            paddingVertical: theme.spacing,
                            borderRadius: theme.borderRadius * 4,
                            backgroundColor: theme.palette.backgroundSecondary,
                          },
                        ]}>
                        <View style={{paddingLeft: theme.spacing * 2}}>
                          <View style={[styles.lastPunchText]}>
                            {punchStatus?.punchState === PUNCHED_OUT ? (
                              <Text>{'Last Punch Out' + ' : '}</Text>
                            ) : null}
                            {punchStatus?.punchState === PUNCHED_IN ? (
                              <Text>{'Punched In at' + ' : '}</Text>
                            ) : null}
                          </View>
                        </View>
                        <View style={[styles.flexFour]}>
                          <Text>
                            {punchStatus?.punchTime
                              ? formatTime(
                                  getLocalDateObjectFromSaveFormat(
                                    punchStatus?.punchTime,
                                  ),
                                )
                              : null}
                            {'   '}
                            <FormattedDate>
                              {punchStatus?.punchTime}
                            </FormattedDate>
                            <Text>
                              {formatTimezoneOffset(
                                punchStatus?.punchTimeZoneOffset,
                              )}
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                    <Divider />
                  </>
                ) : null}
                <View
                  style={[
                    styles.mainView,
                    {
                      paddingBottom: theme.spacing * 0.5,
                    },
                  ]}>
                  <View style={{paddingTop: theme.spacing * 5}}>
                    <PickNote
                      onPress={this.toggleCommentInput}
                      note={savedNote}
                    />
                  </View>
                </View>
              </CardContent>
            </Card>
          </View>
        </View>
      </MainLayout>
    );
  }
}
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  durationMainView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  durationText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  briefcaseIcon: {
    alignItems: 'center',
  },

  textBold: {
    fontWeight: 'bold',
  },
  lastRecordDetailsMainView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  lastPunchText: {
    flex: 2,
    flexDirection: 'column',
  },
  flexFour: {
    flex: 4,
  },
  flexOne: {
    flex: 1,
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  hoursView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface PunchProps
  extends WithTheme,
    WithGlobals,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

interface PunchState {
  note: string;
  typingNote: boolean;
  duration: string;
}

const mapStateToProps = (state: RootState) => ({
  punchStatus: selectPunchStatus(state),
  punchCurrentDateTime: selectPunchCurrentDateTime(state),
  savedNote: selectSavedPunchNote(state),
  currentRoute: selectCurrentRoute(state),
});

const mapDispatchToProps = {
  fetchPunchStatus,
  changePunchCurrentDateTime,
  setPunchNote,
  savePunchInRequest,
  savePunchOutRequest,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const PunchWithTheme = withTheme<PunchProps>()(Punch);

const PunchWithGlobals = withGlobals<PunchProps>()(PunchWithTheme);
export default connector(PunchWithGlobals);
