import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AttendanceObject} from 'store/time/my-attendance/types';
import Icon from 'components/DefaultIcon';
import Chip from 'components/DefaultChip';
import Divider from 'components/DefaultDivider';
import {PUNCHED_OUT} from 'store/time/attendance/types';
import {
  calculateDurationUsingSavedFormat,
  getUTCMomentObjectFromString,
  convertDateObjectToStringFormat,
} from 'lib/helpers/attendance';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect} from 'react-redux';

class AttendanceTimelineComponent extends React.Component<
  AttendanceTimelineComponentProps
> {
  constructor(props: AttendanceTimelineComponentProps) {
    super(props);
  }
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
              <Text style={{fontSize: theme.spacing * 3.75}}>
                {'No Punch In/Out records available'}
              </Text>
            </View>
          </>
        ) : null}
        {attendanceRecords.map((attendanceRecord) => {
          return attendanceRecord.state === PUNCHED_OUT ? (
            <>
              <View>
                <View
                  style={[styles.container, {marginTop: theme.spacing * 5}]}>
                  <View style={[styles.rowFlexDirection]}>
                    <View
                      style={[
                        styles.flexOne,
                        styles.backgroundColorWhite,
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
                        styles.backgroundColorWhite,
                        styles.flexThree,
                        {
                          borderLeftWidth: defaultLineWidth,
                          borderLeftColor: theme.palette.secondary,
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
                            styles.detail,
                            {
                              marginLeft: theme.spacing * 2.5,
                              marginBottom: theme.spacing * 5,
                            },
                          ]}>
                          <View>
                            <View>
                              <View style={{marginLeft: theme.spacing * 1}}>
                                <View style={{marginLeft: theme.spacing * 0.5}}>
                                  <Text style={[styles.title]}>
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
                                        marginRight: theme.spacing * 5,
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
                          style={{
                            marginLeft: theme.spacing * 4,
                            marginTop: theme.spacing * -1.5,
                          }}>
                          <Text style={[styles.title]}>{'Punched Out'}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.rowFlexDirection]}>
                    <View style={[styles.flexOne]}></View>
                    <View
                      style={[
                        styles.detail,
                        styles.flexThree,
                        {marginLeft: theme.spacing * 8},
                      ]}>
                      <View>
                        <View>
                          <View
                            style={[
                              styles.alignItemsCenter,
                              {
                                marginLeft: theme.spacing * 1,
                                width: theme.spacing * 30,
                              },
                            ]}>
                            <Chip
                              style={{
                                backgroundColor: theme.palette.secondary,
                                paddingLeft: theme.spacing * 2.5,
                                paddingRight: theme.spacing * 2.5,
                                marginBottom: theme.spacing * 1.25,
                                marginTop: theme.spacing * 2.5,
                              }}>
                              <Text>
                                {calculateDurationUsingSavedFormat(
                                  attendanceRecord.punchInUserTime,
                                  attendanceRecord.punchOutUserTime,
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
                                    marginRight: theme.spacing * 5,
                                  }}>
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
            </>
          ) : (
            <>
              <View>
                <View
                  style={[styles.container, {marginTop: theme.spacing * 5}]}>
                  <View style={[styles.rowFlexDirection]}>
                    <View
                      style={[
                        styles.flexOne,
                        styles.columnFlexDirection,
                        styles.backgroundColorWhite,
                        {
                          marginLeft: theme.spacing * 4,
                        },
                      ]}>
                      <View
                        style={[
                          styles.positionAbsolute,
                          {top: theme.spacing * 0},
                        ]}>
                        <Text>{'06:30 AM'}</Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.backgroundColorWhite,
                        styles.borderLeftColorWhite,
                        styles.flexThree,
                        {
                          borderLeftWidth: defaultLineWidth,
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
                            styles.detail,
                            {
                              marginLeft: theme.spacing * 2.5,
                              marginBottom: theme.spacing * 5,
                            },
                          ]}>
                          <View>
                            <View>
                              <View style={{marginLeft: theme.spacing * 1}}>
                                <View style={{marginLeft: theme.spacing * 0.5}}>
                                  <Text style={[styles.title]}>
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
                                        marginRight: theme.spacing * 5,
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

                  {/* <Divider /> */}
                </View>
                <View style={{marginTop: theme.spacing * 4}}>
                  <Divider />
                </View>
              </View>
            </>
          );
        })}
      </View>
    );
  }
}

const defaultCircleSize = 16;
const defaultLineWidth = 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  detail: {paddingBottom: 10},

  dotStyle: {
    height: defaultCircleSize,
    width: defaultCircleSize,
    borderRadius: defaultCircleSize / 2,
  },
  mainView: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
    overflow: 'hidden',
  },
  textBold: {
    fontWeight: 'bold',
  },

  lastRecordDetailsMainView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f3f5',
  },

  lastPunchText: {
    flex: 2,
    flexDirection: 'column',
  },

  colorWhite: {
    color: 'white',
  },

  flexFour: {
    flex: 4,
  },
  flexTwo: {
    flex: 2,
  },
  flexOne: {
    flex: 1,
  },
  flexThree: {
    flex: 3,
  },
  centerItems: {
    alignItems: 'center',
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
  backgroundColorWhite: {
    backgroundColor: 'white',
  },
  hoursView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
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

const AttendanceTimelineComponentWithTheme = withTheme<
  AttendanceTimelineComponentProps
>()(AttendanceTimelineComponent);

export default connector(AttendanceTimelineComponentWithTheme);
