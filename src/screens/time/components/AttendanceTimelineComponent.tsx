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
import {View, Text, StyleSheet} from 'react-native';
import {AttendanceObject} from 'store/time/attendance/types';
import Icon from 'components/DefaultIcon';
import Chip from 'components/DefaultChip';
import Divider from 'components/DefaultDivider';
import {PUNCHED_OUT} from 'store/time/punch/types';
import {
  calculateDurationBasedOnTimezone,
  getUTCMomentObjectFromString,
  convertDateObjectToStringFormat,
} from 'lib/helpers/attendance';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect} from 'react-redux';

class AttendanceTimelineComponent extends React.Component<AttendanceTimelineComponentProps> {
  render() {
    const {attendanceRecords, theme} = this.props;
    return (
      <View>
        {attendanceRecords.length === 0 ? (
          <>
            <View
              style={[
                styles.alignItemsCenter,
                {marginTop: theme.spacing * 4.5},
              ]}>
              <Text
                style={{
                  fontSize: theme.typography.fontSize,
                  paddingBottom: theme.spacing * 5,
                }}>
                {'No Punch In/Out records available'}
              </Text>
            </View>
          </>
        ) : null}
        {attendanceRecords.map((attendanceRecord, key) => {
          return attendanceRecord.state === PUNCHED_OUT ? (
            <View key={key} style={{marginLeft: theme.spacing * 1.5}}>
              <View style={[styles.flexOne, {marginTop: theme.spacing * 5}]}>
                <View style={[styles.rowFlexDirection]}>
                  <View
                    style={[
                      styles.flexOne,
                      styles.columnFlexDirection,
                      {
                        marginLeft: theme.spacing * 4,
                      },
                    ]}>
                    <View
                      style={[
                        styles.positionAbsolute,
                        {top: theme.spacing * 0},
                      ]}>
                      <Text>
                        {convertDateObjectToStringFormat(
                          getUTCMomentObjectFromString(
                            attendanceRecord.punchInUserTime,
                          ),
                          'hh:mm A',
                        )}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.positionAbsolute,
                        {
                          bottom: theme.spacing * 0,
                        },
                      ]}>
                      <Text>
                        {convertDateObjectToStringFormat(
                          getUTCMomentObjectFromString(
                            attendanceRecord.punchOutUserTime,
                          ),
                          'hh:mm A',
                        )}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.flexThree,
                      {
                        borderLeftWidth: defaultLineWidth,
                        borderLeftColor: theme.palette.secondary,
                        backgroundColor: theme.palette.background,
                      },
                    ]}>
                    <View style={[styles.rowFlexDirection]}>
                      <View
                        style={[
                          styles.dotStyle,
                          {
                            marginLeft: -(
                              defaultCircleSize / 2 +
                              defaultLineWidth / 2
                            ),
                            backgroundColor: theme.palette.secondary,
                          },
                        ]}
                      />
                      <View
                        style={[
                          {
                            marginLeft: theme.spacing * 2.5,
                            paddingBottom: theme.spacing * 3,
                          },
                        ]}>
                        <View>
                          <View>
                            <View style={{marginLeft: theme.spacing * 1}}>
                              <View style={{marginLeft: theme.spacing * 0.5}}>
                                <Text
                                  style={[
                                    styles.title,
                                    {fontSize: theme.typography.fontSize},
                                  ]}>
                                  {'Punched In'}
                                </Text>
                              </View>
                            </View>
                            {attendanceRecord.punchInNote !== null &&
                            attendanceRecord.punchInNote.length > 0 ? (
                              <>
                                <View
                                  style={[
                                    styles.rowFlexDirection,
                                    {
                                      paddingTop: theme.spacing,
                                      paddingLeft: theme.spacing,
                                    },
                                  ]}>
                                  <Icon
                                    name={'android-messages'}
                                    fontSize={theme.spacing * 5}
                                  />
                                  <Text
                                    style={{
                                      paddingLeft: theme.spacing * 2.5,
                                      marginRight: theme.spacing * 15,
                                    }}>
                                    {attendanceRecord.punchInNote}
                                  </Text>
                                </View>
                              </>
                            ) : null}
                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.rowFlexDirection,
                        attendanceRecord.punchInNote !== null &&
                        attendanceRecord.punchInNote.length > 0
                          ? undefined
                          : {paddingTop: theme.spacing * 10},
                      ]}>
                      <View
                        style={[
                          styles.dotStyle,
                          {
                            marginLeft: -(
                              defaultCircleSize / 2 +
                              defaultLineWidth / 2
                            ),
                            backgroundColor: theme.palette.secondary,
                          },
                        ]}
                      />
                      <View
                        style={{
                          marginLeft: theme.spacing * 4,
                          marginTop: theme.spacing * -1.5,
                        }}>
                        <Text
                          style={[
                            styles.title,
                            {fontSize: theme.typography.fontSize},
                          ]}>
                          {'Punched Out'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={[styles.rowFlexDirection]}>
                  <View style={[styles.flexOne]} />
                  <View
                    style={[
                      styles.flexThree,
                      {
                        marginLeft: theme.spacing * 8,
                        paddingBottom: theme.spacing * 2.5,
                      },
                    ]}>
                    <View>
                      <View>
                        <View
                          style={[
                            styles.alignItemsCenter,
                            {
                              width: theme.spacing * 30,
                            },
                          ]}>
                          <Chip
                            style={{
                              backgroundColor: theme.palette.secondary,
                              paddingLeft: theme.spacing * 3,
                              paddingRight: theme.spacing * 2.5,
                              marginBottom: theme.spacing * 1.25,
                              marginTop: theme.spacing,
                            }}>
                            <Text
                              style={{color: theme.typography.secondaryColor}}>
                              {calculateDurationBasedOnTimezone(
                                attendanceRecord.punchInUserTime,
                                attendanceRecord.punchOutUserTime,
                                parseFloat(attendanceRecord.punchInTimeOffset),
                                parseFloat(attendanceRecord.punchOutTimeOffset),
                              )}
                              {' Hours'}
                            </Text>
                          </Chip>
                        </View>
                        {attendanceRecord.punchOutNote !== null &&
                        attendanceRecord.punchOutNote.length > 0 ? (
                          <>
                            <View
                              style={[
                                styles.rowFlexDirection,
                                {
                                  paddingTop: theme.spacing,
                                  paddingLeft: theme.spacing * 2,
                                },
                              ]}>
                              <Icon
                                name={'android-messages'}
                                fontSize={theme.spacing * 5}
                              />
                              <Text
                                style={[
                                  styles.justify,
                                  {
                                    paddingLeft: theme.spacing * 2.5,
                                    marginRight: theme.spacing * 15,
                                  },
                                ]}>
                                {attendanceRecord.punchOutNote}
                              </Text>
                            </View>
                          </>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{marginTop: theme.spacing * 4}}>
                <Divider />
              </View>
            </View>
          ) : (
            <View key={key}>
              <View style={[styles.flexOne, {marginTop: theme.spacing * 5}]}>
                <View style={[styles.rowFlexDirection]}>
                  <View
                    style={[
                      styles.flexOne,
                      styles.columnFlexDirection,
                      {
                        marginLeft: theme.spacing * 4,
                        backgroundColor: theme.palette.background,
                      },
                    ]}>
                    <View
                      style={[
                        styles.positionAbsolute,
                        {top: theme.spacing * 0},
                      ]}>
                      <Text>
                        {' '}
                        {convertDateObjectToStringFormat(
                          getUTCMomentObjectFromString(
                            attendanceRecord.punchInUserTime,
                          ),
                          'hh:mm A',
                        )}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.borderLeftColorWhite,
                      styles.flexThree,
                      {
                        borderLeftWidth: defaultLineWidth,
                        backgroundColor: theme.palette.background,
                      },
                    ]}>
                    <View style={[styles.rowFlexDirection]}>
                      <View
                        style={[
                          styles.dotStyle,
                          {
                            marginLeft: -(
                              defaultCircleSize / 2 +
                              defaultLineWidth / 2
                            ),
                            backgroundColor: theme.palette.secondary,
                          },
                        ]}
                      />
                      <View
                        style={[
                          {
                            marginLeft: theme.spacing * 2.5,
                            marginBottom: theme.spacing * 5,

                            paddingBottom: theme.spacing * 2.5,
                          },
                        ]}>
                        <View>
                          <View>
                            <View style={{marginLeft: theme.spacing * 1}}>
                              <View style={{marginLeft: theme.spacing * 0.5}}>
                                <Text
                                  style={[
                                    styles.title,
                                    {fontSize: theme.typography.fontSize},
                                  ]}>
                                  {'Punched In'}
                                </Text>
                              </View>
                            </View>
                            {attendanceRecord.punchInNote !== null &&
                            attendanceRecord.punchInNote.length > 0 ? (
                              <>
                                <View
                                  style={[
                                    styles.rowFlexDirection,
                                    {
                                      paddingTop: theme.spacing * 1,
                                    },
                                  ]}>
                                  <Icon
                                    name={'android-messages'}
                                    fontSize={theme.spacing * 5}
                                  />
                                  <Text
                                    style={{
                                      paddingLeft: theme.spacing * 2.5,
                                      marginRight: theme.spacing * 15,
                                    }}>
                                    {attendanceRecord.punchInNote}
                                  </Text>
                                </View>
                              </>
                            ) : null}
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{marginTop: theme.spacing * 4}}>
                <Divider />
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

const defaultCircleSize = 16;
const defaultLineWidth = 2;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },

  dotStyle: {
    height: defaultCircleSize,
    width: defaultCircleSize,
    borderRadius: defaultCircleSize / 2,
  },
  flexOne: {
    flex: 1,
  },
  flexThree: {
    flex: 3,
  },
  justify: {
    textAlign: 'justify',
  },
  rowFlexDirection: {
    flexDirection: 'row',
  },
  columnFlexDirection: {
    flexDirection: 'column',
  },
  positionAbsolute: {
    position: 'absolute',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  borderLeftColorWhite: {
    borderLeftColor: 'white',
  },
});

interface AttendanceTimelineComponentProps extends WithTheme {
  attendanceRecords: AttendanceObject[];
}
const mapStateToProps = () => ({});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

const AttendanceTimelineComponentWithTheme = withTheme<AttendanceTimelineComponentProps>()(
  AttendanceTimelineComponent,
);

export default connector(AttendanceTimelineComponentWithTheme);
