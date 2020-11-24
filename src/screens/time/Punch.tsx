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
  View,
  StyleSheet,
  Keyboard,
  TextInput as RNTextInput,
} from 'react-native';
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
} from 'store/time/attendance/actions';
import {PunchRequest} from 'store/time/attendance/types';
import {
  selectPunchStatus,
  selectPunchCurrentDateTime,
  selectSavedPunchNote,
} from 'store/time/attendance/selectors';
import Text from 'components/DefaultText';
import Divider from 'components/DefaultDivider';
import Button from 'components/DefaultButton';
import Icon from 'components/DefaultIcon';
import EditPunchInOutDateTimeCard from 'screens/time/components/EditPunchInOutDateTimeCardComponent';
import PunchInOutDateTimeCard from 'screens/time/components/PunchInOutDateTimeCardComponent';
import PickNote, {PickNoteFooter} from 'screens/time/components/NoteComponent';
import Card from 'components/DefaultCard';
import CardContent from 'components/DefaultCardContent';

class Punch extends React.Component<PunchProps, PunchState> {
  inputRef: RNTextInput | null;
  timeInterval: any;
  constructor(props: PunchProps) {
    super(props);
    this.inputRef = null;
    this.state = {
      typingNote: false,
      note: '',
    };
    props.fetchPunchStatus();
  }

  componentDidMount() {
    if (!this.props.punchStatus?.dateTimeEditable) {
      this.timeInterval = setInterval(this.onRefresh, 30000);
    }
    Keyboard.addListener('keyboardDidHide', this.hideCommentInput);
  }

  componentWillUnmount() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
    Keyboard.removeListener('keyboardDidHide', this.hideCommentInput);
  }

  onRefresh = () => {
    this.props.fetchPunchStatus();
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

  onPressSubmitButton = () => {
    const {setPunchNote} = this.props;
    const {note} = this.state;
    setPunchNote(note);
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

  setTwoDigits = (number: string) => {
    return number.length < 2 ? '0' + number : number;
  };

  calculateDuration = (datetime1?: string, datetime2?: Date) => {
    if (datetime1 && datetime2) {
      let datetime2String = this.getDateSaveFormatFromDateObject(datetime2);

      let [date1, time1] = datetime1.split(' ', 2);
      let [date2, time2] = datetime2String.split(' ', 2);

      let dt1 = new Date(date1 + 'T' + time1);
      let dt2 = new Date(date2 + 'T' + time2);

      let minutes = (dt2.getTime() - dt1.getTime()) / (1000 * 60);
      let durationHours = this.setTwoDigits(
        ((minutes - (minutes % 60)) / 60).toString(),
      );
      let durationMinutes = this.setTwoDigits((minutes % 60).toString());
      return durationHours + ':' + durationMinutes;
    } else return '00:00';
  };

  formatTime = (hour: string, minute: string) => {
    let ampm = 'AM';
    if (parseInt(hour) > 12) {
      hour = (parseInt(hour) - 12).toString();
      ampm = 'PM';
    }
    return hour + ':' + minute + ' ' + ampm;
  };

  formatLastRecordDetails = (datetime?: string, timezoneOffset?: string) => {
    if (datetime && timezoneOffset) {
      let punchDate = this.getDateObjectFromSaveFormat(datetime);
      let showDate = punchDate.toDateString();
      let showTime = this.formatTime(
        punchDate.getHours().toString(),
        punchDate.getMinutes().toString(),
      );

      let timezone;
      if (parseFloat(timezoneOffset) > 0) {
        timezone =
          '+' + (Math.round(parseFloat(timezoneOffset) * 10) / 10).toString();
      } else
        timezone = (
          Math.round(parseFloat(timezoneOffset) * 10) / 10
        ).toString();
      return showTime + ' ' + showDate + ' (GMT' + timezone + ')';
    } else return null;
  };

  getDateObjectFromSaveFormat = (dateString: string) => {
    let dateTime = dateString.split(' ', 2);
    let [fullDate, time] = [
      dateTime[0].split('-', 3),
      dateTime[1].split(':', 2),
    ];
    let [year, month, date] = [
      parseInt(fullDate[0]),
      parseInt(fullDate[1]),
      parseInt(fullDate[2]),
    ];
    let [hour, minute] = [parseInt(time[0]), parseInt(time[1])];
    return new Date(year, month - 1, date, hour, minute, 0);
  };

  getDateSaveFormatFromDateObject = (date: Date) => {
    return (
      this.setTwoDigits(date.getFullYear().toString()) +
      '-' +
      this.setTwoDigits((date.getMonth() + 1).toString()) +
      '-' +
      this.setTwoDigits(date.getDate().toString()) +
      ' ' +
      this.setTwoDigits(date.getHours().toString()) +
      ':' +
      this.setTwoDigits(date.getMinutes().toString())
    );
  };
  onPressPunchButton = () => {
    const {punchCurrentDateTime, savedNote} = this.props;
    const PUNCHED_IN = 'PUNCHED IN';
    const PUNCHED_OUT = 'PUNCHED OUT';
    const INITIAL = 'INITIAL';
    if (punchCurrentDateTime !== undefined) {
      // let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      let punchRequest: PunchRequest = {
        timezone: 'Asia/Colombo',
        note: savedNote ? savedNote : undefined,
        datetime: '2021-12-14 14:26',
      };
      if (this.props.punchStatus?.punchState == PUNCHED_IN) {
        this.props.savePunchOutRequest({
          ...punchRequest,
        });
      } else if (this.props.punchStatus?.punchState == PUNCHED_OUT) {
        this.props.savePunchInRequest({
          ...punchRequest,
        });
      } else if (this.props.punchStatus?.punchState == INITIAL) {
        this.props.savePunchInRequest({
          ...punchRequest,
        });
      }
    }
  };

  render() {
    const {theme, punchStatus, punchCurrentDateTime, savedNote} = this.props;
    const duration = this.calculateDuration(
      '2020-11-22 13:00',
      punchCurrentDateTime,
    );
    const {note} = this.state;
    const editable = true;
    const PUNCHED_IN = 'PUNCHED IN';
    const PUNCHED_OUT = 'PUNCHED OUT';
    const lastRecordDetails = this.formatLastRecordDetails(
      punchStatus?.punchTime,
      punchStatus?.PunchTimeZoneOffset,
    );

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
                  onPress={this.onPressSubmitButton}
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
                    punchStatus?.punchState == PUNCHED_IN
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
        <View style={{marginLeft: theme.spacing, marginTop: theme.spacing * 5}}>
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
              {punchStatus?.punchState == PUNCHED_IN ? (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginHorizontal: 20,
                      paddingTop: theme.spacing * 4,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View style={{marginRight: 6}}>
                        <View
                          style={{
                            width: 30,
                            height: 30,
                            alignItems: 'center',
                            backgroundColor: theme.palette.secondary,
                            borderRadius: 28,
                          }}>
                          <Icon
                            name={'briefcase'}
                            fontSize={18}
                            style={{color: 'white', padding: 4}}
                          />
                        </View>
                      </View>
                      <Text
                        style={{
                          color: theme.palette.secondary,
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}>
                        {'Duration'}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 5,
                      }}>
                      <View style={{paddingLeft: 5}}>
                        <Text
                          style={{
                            color: theme.palette.secondary,
                            fontSize: 22,
                            fontWeight: 'bold',
                          }}>
                          {duration}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            color: theme.palette.secondary,
                            marginTop: 6,
                            fontSize: 16,
                            fontWeight: 'bold',
                          }}>
                          {' Hours'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
              ) : null}

              <View style={{paddingBottom: theme.spacing * 3}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    marginVertical: 10,
                    backgroundColor: '#f2f3f5',
                    padding: 3,
                    borderRadius: 15,
                  }}>
                  <View style={{paddingLeft: 5}}>
                    <View style={{flex: 2, flexDirection: 'column'}}>
                      {punchStatus?.punchState == PUNCHED_OUT ? (
                        <Text>{'Last Punch Out' + ' : '}</Text>
                      ) : null}
                      {punchStatus?.punchState == PUNCHED_IN ? (
                        <Text>{'Punched In at' + ' : '}</Text>
                      ) : null}
                    </View>
                  </View>
                  <View style={{flex: 4}}>
                    <Text>{lastRecordDetails}</Text>
                  </View>
                </View>
              </View>

              <Divider />

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
      </MainLayout>
    );
  }
}
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  noRecordsTextView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordsText: {
    textAlign: 'center',
  },
});

interface PunchProps extends WithTheme, ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

interface PunchState {
  note: string;
  typingNote: boolean;
}

const mapStateToProps = (state: RootState) => ({
  punchStatus: selectPunchStatus(state),
  punchCurrentDateTime: selectPunchCurrentDateTime(state),
  savedNote: selectSavedPunchNote(state),
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

export default connector(PunchWithTheme);
