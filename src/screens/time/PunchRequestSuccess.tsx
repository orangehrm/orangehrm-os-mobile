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
import {
  NavigationProp,
  ParamListBase,
  StackActions,
  DrawerActions,
} from '@react-navigation/native';
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
import {PunchRequestSuccessParam} from 'screens/time/navigators/index';
import Text from 'components/DefaultText';
import Divider from 'components/DefaultDivider';
import Icon from 'components/DefaultIcon';
import {PunchRequestSuccessRouteParams} from 'screens/time/navigators';
import IconButton from 'components/DefaultIconButton';
import {
  calculateDurationUsingSavedFormat,
  formatLastRecordDetails,
} from 'lib/helpers/attendance';
import {selectInitialRoute} from 'store/globals/selectors';

class PunchRequestSuccess extends React.Component<PunchRequestSuccessProps> {
  constructor(props: PunchRequestSuccessProps) {
    super(props);
  }

  onClickHomeButton = () => {
    const {initialRoute, navigation} = this.props;
    navigation.dispatch(StackActions.pop());
    navigation.dispatch(DrawerActions.jumpTo(initialRoute));
  };
  render() {
    let PUNCH_IN = 'PUNCH_IN';
    let PUNCH_OUT = 'PUNCH_OUT';
    let ACTION: typeof PUNCH_IN | typeof PUNCH_OUT;
    const {theme, route} = this.props;

    const {
      punchInDateTime,
      punchInTimeZoneOffset,
      punchInNote,
      punchOutDateTime,
      punchOutTimeZoneOffset,
      punchOutNote,
      datetime,
      note,
      timezoneOffset,
    } = route.params;

    let punchNote = note;
    let punchTimeZone = timezoneOffset;
    let punchDateTime = datetime;
    if (datetime !== undefined) {
      ACTION = PUNCH_IN;
    } else {
      ACTION = PUNCH_OUT;
      punchNote = punchInNote;
      punchTimeZone = punchInTimeZoneOffset;
      punchDateTime = punchInDateTime;
    }

    return (
      <MainLayout
        statusBarBackgroundColor={theme.palette.statusBar}
        footer={
          <View
            style={[
              styles.centerItems,
              {
                paddingVertical: theme.spacing * 5,
                paddingTop: theme.spacing * 5,
              },
            ]}>
            <View
              style={[
                styles.footerView,
                {
                  height: theme.spacing * 15,
                  width: theme.spacing * 15,
                  borderRadius: theme.spacing * 7,
                },
              ]}>
              <View>
                <IconButton
                  iconProps={{
                    name: 'home',
                    style: {
                      color: theme.typography.secondaryColor,
                      fontSize: theme.typography.largeIconSize,
                      paddingRight: theme.spacing * 0.25,
                    },
                  }}
                  buttonProps={{
                    onPress: this.onClickHomeButton,
                    style: {backgroundColor: theme.palette.primary},
                    rounded: true,
                    large: true,
                  }}
                />
              </View>
            </View>
          </View>
        }>
        <View>
          <View style={styles.flexOne}>
            <View>
              <View
                style={[
                  styles.centerItems,
                  {
                    paddingBottom: theme.spacing * 5,
                  },
                ]}>
                <View>
                  <View style={{marginTop: theme.spacing * 5}}>
                    <View
                      style={[
                        styles.clockColour,
                        {
                          borderRadius: theme.spacing * 7,
                        },
                      ]}>
                      <Icon
                        name={'check-circle-outline'}
                        style={[
                          styles.checkColour,
                          {fontSize: theme.spacing * 10},
                        ]}
                      />
                    </View>
                  </View>
                </View>
                <View style={{padding: theme.spacing * 5}}>
                  <Text
                    style={[
                      styles.successfullMessage,
                      {
                        fontSize: theme.spacing * 6,
                        lineHeight: theme.spacing * 7.5,
                      },
                    ]}>
                    {ACTION === PUNCH_OUT
                      ? 'You Have Successfully Punched Out from the System'
                      : 'You Have Successfully Punched in to the System'}
                  </Text>
                </View>
              </View>
              {ACTION === PUNCH_OUT ? (
                <>
                  <View
                    style={[
                      styles.centerItems,
                      {
                        paddingRight: theme.spacing * 5,
                        paddingLeft: theme.spacing * 5,
                        paddingBottom: theme.spacing * 2.5,
                      },
                    ]}>
                    <View style={styles.centerItems}>
                      <View
                        style={[
                          styles.rowFlexDirection,
                          {marginLeft: theme.spacing * -5},
                        ]}>
                        <Icon
                          name={'timelapse'}
                          style={{fontSize: theme.spacing * 6}}
                          color={'grey'}
                        />
                        <Text
                          style={[
                            styles.textBold,
                            {
                              fontSize: theme.spacing * 4.5,
                              paddingLeft: theme.spacing * 2.5,
                            },
                          ]}>
                          {'Duration'}
                        </Text>
                      </View>
                      <View
                        style={[styles.centerItems, styles.rowFlexDirection]}>
                        <View>
                          <Text
                            style={[
                              styles.textBold,
                              {
                                fontSize: theme.spacing * 12.5,
                                color: theme.palette.secondary,
                              },
                            ]}>
                            {calculateDurationUsingSavedFormat(
                              punchInDateTime,
                              punchOutDateTime,
                            )}
                          </Text>
                        </View>
                        <View style={{marginBottom: theme.spacing * -5}}>
                          <Text
                            style={[
                              styles.textBold,
                              {
                                fontSize: theme.spacing * 4,
                                color: theme.palette.secondary,
                              },
                            ]}>
                            {' Hours'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </>
              ) : null}

              <View
                style={{
                  paddingLeft: theme.spacing * 5,
                  paddingRight: theme.spacing * 5,
                }}>
                <Divider />
                <View
                  style={{
                    paddingTop: theme.spacing * 2.5,
                    padding: theme.spacing * 2.5,
                  }}>
                  <View
                    style={[
                      styles.flexOne,
                      {
                        paddingLeft: theme.spacing * 3.75,
                        paddingBottom: theme.spacing * 2.5,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.textBold,
                        {
                          color: theme.palette.secondary,
                          fontSize: theme.typography.fontSize * 1.25,
                        },
                      ]}>
                      {'Punch In'}
                    </Text>
                  </View>
                  <View style={[styles.rowFlexDirection]}>
                    <View
                      style={[
                        styles.flexOne,
                        {paddingLeft: theme.spacing * 3.75},
                      ]}>
                      <Icon
                        name={'clock'}
                        style={{fontSize: theme.typography.iconSize * 1.2}}
                        color={'grey'}
                      />
                    </View>
                    <View style={{flex: theme.spacing * 1.5}}>
                      <Text
                        style={{
                          fontSize: theme.spacing * 4,
                        }}>
                        {formatLastRecordDetails(
                          punchDateTime,
                          punchTimeZone.toString(),
                        )}
                      </Text>
                    </View>
                  </View>
                  {punchNote ? (
                    <View
                      style={[
                        styles.rowFlexDirection,
                        {
                          paddingTop: theme.spacing * 1.25,
                        },
                      ]}>
                      <View
                        style={[
                          styles.flexOne,
                          styles.alignItemsFlexStart,
                          {
                            paddingLeft: theme.spacing * 3.75,
                          },
                        ]}>
                        <Icon
                          name={'message-reply-text'}
                          style={{fontSize: theme.typography.iconSize * 1.2}}
                          color={'grey'}
                        />
                      </View>
                      <View style={styles.flexSix}>
                        <Text
                          numberOfLines={2}
                          style={{
                            fontSize: theme.spacing * 4,
                          }}>
                          {punchNote}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>
                {ACTION === PUNCH_OUT ? (
                  <>
                    <Divider />
                    <View
                      style={{
                        paddingTop: theme.spacing * 2.5,
                        padding: theme.spacing * 3.75,
                      }}>
                      <View
                        style={[
                          styles.flexOne,
                          {
                            paddingLeft: theme.spacing * 3.75,
                            paddingBottom: theme.spacing * 2.5,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.textBold,
                            {
                              color: theme.palette.secondary,
                              fontSize: theme.typography.fontSize * 1.25,
                            },
                          ]}>
                          {'Punch Out'}
                        </Text>
                      </View>
                      <View style={styles.rowFlexDirection}>
                        <View
                          style={[
                            styles.flexOne,
                            {paddingLeft: theme.spacing * 3.75},
                          ]}>
                          <Icon
                            name={'clock'}
                            style={{fontSize: theme.typography.iconSize * 1.2}}
                            color={'grey'}
                          />
                        </View>
                        <View style={styles.flexSix}>
                          <Text
                            style={{
                              fontSize: theme.spacing * 4,
                            }}>
                            {formatLastRecordDetails(
                              punchOutDateTime,
                              punchOutTimeZoneOffset.toString(),
                            )}
                          </Text>
                        </View>
                      </View>
                      {punchOutNote ? (
                        <View
                          style={[
                            styles.rowFlexDirection,
                            {paddingTop: theme.spacing * 1.25},
                          ]}>
                          <View
                            style={[
                              styles.alignItemsFlexStart,
                              {
                                paddingLeft: theme.spacing * 3.75,
                                flex: theme.spacing * 0.25,
                              },
                            ]}>
                            <Icon
                              name={'message-reply-text'}
                              style={{
                                fontSize: theme.typography.iconSize * 1.2,
                              }}
                              color={'grey'}
                            />
                          </View>
                          <View style={styles.flexSix}>
                            <Text
                              numberOfLines={2}
                              style={{
                                fontSize: theme.spacing * 4,
                              }}>
                              {punchOutNote}
                            </Text>
                          </View>
                        </View>
                      ) : null}
                    </View>
                  </>
                ) : null}
                <Divider />
              </View>
            </View>
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
  noRecordsTextView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordsText: {
    textAlign: 'center',
  },

  footerView: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successfullMessage: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  textBold: {
    fontWeight: 'bold',
  },

  centerItems: {
    alignItems: 'center',
  },

  rowFlexDirection: {
    flexDirection: 'row',
  },

  clockColour: {
    backgroundColor: '#ffffff',
  },

  alignItemsFlexStart: {
    alignItems: 'flex-start',
  },

  checkColour: {
    color: 'green',
  },

  flexFour: {
    flex: 4,
  },
  flexTwo: {
    flex: 2,
  },
  flexThree: {
    flex: 3,
  },
  flexOne: {
    flex: 1,
  },
  flexFive: {
    flex: 5,
  },
  flexSix: {
    flex: 6,
  },
});

interface PunchRequestSuccessProps
  extends WithTheme,
    ConnectedProps<typeof connector>,
    PunchRequestSuccessParam {
  navigation: NavigationProp<ParamListBase>;
  route: PunchRequestSuccessRouteParams;
}

const mapStateToProps = (state: RootState) => ({
  initialRoute: selectInitialRoute(state),
});

const mapDispatchToProps = {
  fetchPunchStatus,
  changePunchCurrentDateTime,
  setPunchNote,
  savePunchInRequest,
  savePunchOutRequest,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const PunchRequestSuccessWithTheme = withTheme<PunchRequestSuccessProps>()(
  PunchRequestSuccess,
);

export default connector(PunchRequestSuccessWithTheme);
