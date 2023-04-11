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
} from 'store/time/punch/actions';
import {PUNCHED_OUT} from 'store/time/punch/types';
import {PunchRequestSuccessParam} from './navigators';
import Text from 'components/DefaultText';
import Divider from 'components/DefaultDivider';
import Icon from 'components/DefaultIcon';
import {PunchRequestSuccessRouteParams} from 'screens/time/navigators';
import IconButton from 'components/DefaultIconButton';
import {
  calculateDurationBasedOnTimezone,
  getLocalDateObjectFromSaveFormat,
  formatTime,
  formatTimezoneOffset,
} from 'lib/helpers/attendance';
import {selectInitialRoute} from 'store/globals/selectors';
import FormattedDate from 'components/FormattedDate';

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
    const {theme, route} = this.props;

    const {punchIn, punchOut, state} = route.params;

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
                    <Icon
                      name={'check-circle-outline'}
                      style={{
                        fontSize: theme.typography.extraLargeIconSize,
                        color: theme.palette.success,
                      }}
                    />
                  </View>
                </View>
                <View style={{padding: theme.spacing * 5}}>
                  <Text
                    style={[
                      styles.successfullMessage,
                      {
                        fontSize: theme.typography.headerFontSize,
                        lineHeight: theme.spacing * 8,
                      },
                    ]}>
                    {state.id === PUNCHED_OUT
                      ? 'You Have Successfully Punched Out from the System'
                      : 'You Have Successfully Punched in to the System'}
                  </Text>
                </View>
              </View>
              {state.id === PUNCHED_OUT ? (
                <>
                  <View
                    style={[
                      styles.centerItems,
                      {
                        paddingRight: theme.spacing * 5,
                        paddingLeft: theme.spacing * 5,
                        paddingBottom: theme.spacing * 3,
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
                          style={{fontSize: theme.typography.headerIconSize}}
                        />
                        <Text
                          bold
                          style={{
                            fontSize: theme.typography.subHeaderFontSize,
                            paddingLeft: theme.spacing * 3,
                          }}>
                          {'Duration'}
                        </Text>
                      </View>
                      <View
                        style={[styles.centerItems, styles.rowFlexDirection]}>
                        <View>
                          <Text
                            bold
                            style={{
                              fontSize: theme.typography.headerFontSize * 2.5,
                              color: theme.palette.secondary,
                            }}>
                            {calculateDurationBasedOnTimezone(
                              punchIn.userDate + 'T' + punchIn.userTime,
                              punchOut.userDate + 'T' + punchOut.userTime,
                              parseFloat(punchIn.timezoneOffset),
                              parseFloat(punchOut.timezoneOffset),
                            )}
                          </Text>
                        </View>
                        <View style={{marginBottom: theme.spacing * -5}}>
                          <Text
                            bold
                            style={{
                              fontSize: theme.typography.subHeaderFontSize,
                              color: theme.palette.secondary,
                            }}>
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
                  paddingHorizontal: theme.spacing * 5,
                }}>
                <Divider />
                <View
                  style={{
                    padding: theme.spacing * 2,
                  }}>
                  <View
                    style={[
                      styles.flexOne,
                      {
                        paddingLeft: theme.spacing * 4,
                        paddingBottom: theme.spacing * 3,
                      },
                    ]}>
                    <Text
                      bold
                      style={{
                        color: theme.palette.secondary,
                        fontSize: theme.typography.subHeaderFontSize,
                      }}>
                      {'Punch In'}
                    </Text>
                  </View>
                  <View style={[styles.rowFlexDirection]}>
                    <View
                      style={[
                        styles.flexOne,
                        {paddingLeft: theme.spacing * 4},
                      ]}>
                      <Icon
                        name={'clock'}
                        style={{fontSize: theme.typography.headerIconSize}}
                      />
                    </View>
                    <View style={styles.flexSix}>
                      <Text>
                        {punchIn.userDate
                          ? formatTime(
                              getLocalDateObjectFromSaveFormat(
                                punchIn.userDate + 'T' + punchIn.userTime,
                              ),
                            )
                          : null}
                        {'    '}
                        <FormattedDate>
                          {punchIn.userDate + 'T' + punchIn.userTime}
                        </FormattedDate>
                        <Text>
                          {formatTimezoneOffset(punchIn.timezoneOffset)}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  {punchIn.note ? (
                    <View
                      style={[
                        styles.rowFlexDirection,
                        {
                          paddingTop: theme.spacing * 2,
                        },
                      ]}>
                      <View
                        style={[
                          styles.flexOne,
                          styles.alignItemsFlexStart,
                          {
                            paddingLeft: theme.spacing * 4,
                          },
                        ]}>
                        <Icon
                          name={'message-reply-text'}
                          style={{fontSize: theme.typography.headerIconSize}}
                        />
                      </View>
                      <View style={styles.flexSix}>
                        <Text numberOfLines={2}>{punchIn.note}</Text>
                      </View>
                    </View>
                  ) : null}
                </View>
                {state.id === PUNCHED_OUT ? (
                  <>
                    <Divider />
                    <View
                      style={{
                        padding: theme.spacing * 2,
                      }}>
                      <View
                        style={[
                          styles.flexOne,
                          {
                            paddingLeft: theme.spacing * 4,
                            paddingBottom: theme.spacing * 3,
                          },
                        ]}>
                        <Text
                          bold
                          style={{
                            color: theme.palette.secondary,
                            fontSize: theme.typography.subHeaderFontSize,
                          }}>
                          {'Punch Out'}
                        </Text>
                      </View>
                      <View style={styles.rowFlexDirection}>
                        <View
                          style={[
                            styles.flexOne,
                            {paddingLeft: theme.spacing * 4},
                          ]}>
                          <Icon
                            name={'clock'}
                            style={{fontSize: theme.typography.headerIconSize}}
                          />
                        </View>
                        <View style={styles.flexSix}>
                          <Text>
                            {punchOut.userDate
                              ? formatTime(
                                  getLocalDateObjectFromSaveFormat(
                                    punchOut.userDate + 'T' + punchOut.userTime,
                                  ),
                                )
                              : null}
                            {'    '}
                            <FormattedDate>
                              {punchOut.userDate + 'T' + punchOut.userTime}
                            </FormattedDate>
                            <Text>
                              {formatTimezoneOffset(punchOut.timezoneOffset)}
                            </Text>
                          </Text>
                        </View>
                      </View>
                      {punchOut.note ? (
                        <View
                          style={[
                            styles.rowFlexDirection,
                            {paddingTop: theme.spacing * 2},
                          ]}>
                          <View
                            style={[
                              styles.alignItemsFlexStart,
                              styles.flexOne,
                              {
                                paddingLeft: theme.spacing * 4,
                              },
                            ]}>
                            <Icon
                              name={'message-reply-text'}
                              style={{
                                fontSize: theme.typography.headerIconSize,
                              }}
                            />
                          </View>
                          <View style={styles.flexSix}>
                            <Text numberOfLines={2}>{punchOut.note}</Text>
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
  successfullMessage: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  centerItems: {
    alignItems: 'center',
  },
  rowFlexDirection: {
    flexDirection: 'row',
  },
  alignItemsFlexStart: {
    alignItems: 'flex-start',
  },
  flexOne: {
    flex: 1,
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

const PunchRequestSuccessWithTheme =
  withTheme<PunchRequestSuccessProps>()(PunchRequestSuccess);

export default connector(PunchRequestSuccessWithTheme);
