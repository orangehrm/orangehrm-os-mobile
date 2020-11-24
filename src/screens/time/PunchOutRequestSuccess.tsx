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
import {PunchOutRequestSuccessParam} from 'screens/time/navigators/index';
import Text from 'components/DefaultText';
import Divider from 'components/DefaultDivider';
import Icon from 'components/DefaultIcon';
import {PunchOutRequestSuccessRouteParams} from 'screens/time/navigators';
import IconButton from 'components/DefaultIconButton';

class PunchOutRequestSuccess extends React.Component<
  PunchOutRequestSuccessProps
> {
  constructor(props: PunchOutRequestSuccessProps) {
    super(props);
  }

  onClickHomeButton = () => {};

  render() {
    const {theme, route} = this.props;

    const {
      success,
      punchInDateTime,
      punchInTimeZone,
      punchInNote,
      punchOutDateTime,
      punchOutTimeZone,
      punchOutNote,
    } = route.params;

    return (
      <MainLayout
        footer={
          <View
            style={{alignItems: 'center', paddingVertical: 20, paddingTop: 60}}>
            <View
              style={{
                height: 60,
                width: 60,
                borderRadius: 28,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View>
                <IconButton
                  iconProps={{
                    name: 'home',
                    style: {
                      color: theme.typography.secondaryColor,
                      fontSize: theme.typography.largeIconSize,
                      paddingRight: 1,
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
          <View style={{flex: 1}}>
            <View>
              <View style={{alignItems: 'center', paddingBottom: 20}}>
                <View>
                  <View style={{marginTop: 20}}>
                    <View
                      style={{backgroundColor: '#ffffff', borderRadius: 28}}>
                      <Icon
                        name={'check-circle-outline'}
                        style={{color: 'green', fontSize: 40}}
                      />
                    </View>
                  </View>
                </View>
                <View style={{padding: 20}}>
                  <Text
                    style={{
                      fontSize: 24,
                      textAlign: 'center',
                      lineHeight: 30,
                      fontStyle: 'italic',
                    }}>
                    {'You Have Successfully Punched Out from the System'}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  paddingRight: 20,
                  paddingLeft: 20,
                  paddingBottom: 10,
                }}>
                <View style={{alignItems: 'center'}}>
                  <View style={{flexDirection: 'row', marginLeft: -20}}>
                    <Icon
                      name={'timelapse'}
                      style={{fontSize: 24}}
                      color={'grey'}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        paddingLeft: 10,
                      }}>
                      {'Duration'}
                    </Text>
                  </View>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <View>
                      <Text
                        style={{
                          fontSize: 50,
                          fontWeight: 'bold',
                          color: theme.palette.secondary,
                        }}>
                        {'09:00'}
                      </Text>
                    </View>
                    <View style={{marginBottom: -20}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: theme.palette.secondary,
                        }}>
                        {' Hours'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{paddingLeft: 20, paddingRight: 20}}>
                <Divider />
                <View style={{paddingTop: 20, padding: 15}}>
                  <View style={{paddingLeft: 15, flex: 1, paddingBottom: 10}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: theme.palette.secondary,
                        fontSize: theme.typography.fontSize * 1.25,
                      }}>
                      {'Punch In'}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{paddingLeft: 15, flex: 1}}>
                      <Icon
                        name={'clock'}
                        style={{fontSize: theme.typography.iconSize * 1.2}}
                        color={'grey'}
                      />
                    </View>
                    <View style={{flex: 6}}>
                      <Text
                        style={{
                          fontSize: 16,
                        }}>
                        {punchInDateTime}
                        {/* {'9:00 AM  2020-12-12' + 'GMT+5.5'} */}
                      </Text>
                    </View>
                  </View>
                  {punchInNote ? (
                    <View style={{flexDirection: 'row', paddingTop: 5}}>
                      <View
                        style={{
                          paddingLeft: 15,
                          flex: 1,
                          alignItems: 'flex-start',
                        }}>
                        <Icon
                          name={'message-reply-text'}
                          style={{fontSize: theme.typography.iconSize * 1.2}}
                          color={'grey'}
                        />
                      </View>
                      <View style={{flex: 6}}>
                        <Text
                          numberOfLines={2}
                          style={{
                            fontSize: 16,
                          }}>
                          {punchInNote}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>
                <Divider />

                <View style={{paddingTop: 10, padding: 15}}>
                  <View style={{paddingLeft: 15, flex: 1, paddingBottom: 10}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: theme.palette.secondary,
                        fontSize: theme.typography.fontSize * 1.25,
                      }}>
                      {'Punch Out'}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{paddingLeft: 15, flex: 1}}>
                      <Icon
                        name={'clock'}
                        style={{fontSize: theme.typography.iconSize * 1.2}}
                        color={'grey'}
                      />
                    </View>
                    <View style={{flex: 6}}>
                      <Text
                        style={{
                          fontSize: 16,
                        }}>
                        {punchOutDateTime}
                        {/* {'9:00 AM  2020-12-12' + 'GMT+5.5'} */}
                      </Text>
                    </View>
                  </View>
                  {punchOutNote ? (
                    <View style={{flexDirection: 'row', paddingTop: 5}}>
                      <View
                        style={{
                          paddingLeft: 15,
                          flex: 1,
                          alignItems: 'flex-start',
                        }}>
                        <Icon
                          name={'message-reply-text'}
                          style={{fontSize: theme.typography.iconSize * 1.2}}
                          color={'grey'}
                        />
                      </View>
                      <View style={{flex: 6}}>
                        <Text
                          numberOfLines={2}
                          style={{
                            fontSize: 16,
                          }}>
                          {punchOutNote}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>
                <Divider />
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
});

interface PunchOutRequestSuccessProps
  extends WithTheme,
    ConnectedProps<typeof connector>,
    PunchOutRequestSuccessParam {
  navigation: NavigationProp<ParamListBase>;
  route: PunchOutRequestSuccessRouteParams;
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {
  fetchPunchStatus,
  changePunchCurrentDateTime,
  setPunchNote,
  savePunchInRequest,
  savePunchOutRequest,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const PunchOutRequestSuccessWithTheme = withTheme<
  PunchOutRequestSuccessProps
>()(PunchOutRequestSuccess);

export default connector(PunchOutRequestSuccessWithTheme);
