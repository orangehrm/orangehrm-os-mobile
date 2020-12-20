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
import {StyleSheet, View, Platform} from 'react-native';
import useTheme from 'lib/hook/useTheme';
import Text from 'components/DefaultText';
import Icon from 'components/DefaultIcon';
import Divider from 'components/DefaultDivider';
import CardContent from 'components/DefaultCardContent';
import {
  GraphLeaveType,
  mode,
  EMPLOYEE_ATTENDANCE,
  MY_ATTENDANCE,
} from 'store/time/my-attendance/types';
import CardButton from 'screens/leave/components/CardButton';

const AttendanceSummaryWorkLeaveDurationsCardComponent = (
  props: AttendanceSummaryWorkLeaveDurationsCardComponentProps,
) => {
  const theme = useTheme();
  const {totalLeaveDuration, totalWorkDuration, mode, employeeName} = props;
  return (
    <View
      style={[
        styles.flexOne,
        {
          backgroundColor: theme.palette.backgroundSecondary,
          padding: theme.spacing * 2.5,
        },
      ]}>
      <CardContent
        style={{
          paddingTop: theme.spacing * 2,
          paddingHorizontal: theme.spacing * 3,
          backgroundColor: theme.palette.background,
          borderRadius: theme.spacing * 5,
        }}>
        <View
          style={[
            styles.overflowHidden,
            {
              backgroundColor: theme.palette.background,
              borderRadius: theme.spacing * 1.25,
              marginHorizontal: theme.spacing * 2.5,
              marginTop: theme.spacing * 2.5,
            },
          ]}>
          {mode === EMPLOYEE_ATTENDANCE ? (
            <View
              style={[
                styles.rowFlexDirection,
                {
                  paddingBottom: theme.spacing * 2.5,
                },
              ]}>
              <View style={styles.flexOne} />
              <View
                style={[
                  styles.flexFour,
                  {
                    marginLeft: theme.spacing * 5,
                  },
                ]}>
                <Text
                  style={[
                    styles.textBold,
                    {
                      fontSize: theme.spacing * 4.5,
                    },
                  ]}>
                  {employeeName}
                </Text>
                <Text>{'Software Engineer'}</Text>
              </View>
            </View>
          ) : null}

          <View
            style={{
              paddingTop: theme.spacing * 4.5,
              paddingHorizontal: theme.spacing * 3.75,
              paddingBottom: theme.spacing * 2.5,
            }}>
            <View style={[styles.rowFlexDirection, styles.alignItemsCenter]}>
              <View style={styles.flexNine}>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.textBold,
                    {
                      fontSize: theme.spacing * 4,
                      color: theme.palette.secondary,
                    },
                  ]}>
                  {'Total Work Duration'}
                </Text>
              </View>
              <View style={[styles.flexFour, styles.rowFlexDirection]}>
                <View style={[styles.flexTwo]}>
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.textBold,
                      {
                        fontSize: theme.spacing * 4,
                        color: theme.palette.secondary,
                      },
                    ]}>
                    {totalWorkDuration}
                  </Text>
                </View>
                <View
                  style={[styles.flexTwo, {paddingTop: theme.spacing * 0.5}]}>
                  <Text
                    style={[styles.textBold, {color: theme.palette.secondary}]}>
                    {'Hours'}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.rowFlexDirection,
                styles.alignItemsCenter,
                {
                  marginTop: theme.spacing * 2.5,
                },
              ]}>
              <View style={[styles.flexNine, styles.rowFlexDirection]}>
                <Text
                  numberOfLines={2}
                  style={[
                    styles.textBold,
                    {
                      fontSize: theme.spacing * 4,
                      color: theme.typography.primaryColor,
                    },
                  ]}>
                  {'Total Leave Duration'}
                </Text>
              </View>
              <View style={[styles.rowFlexDirection, styles.flexFour]}>
                <View style={[styles.flexTwo]}>
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.textBold,
                      {
                        fontSize: theme.spacing * 4,
                        color: theme.typography.primaryColor,
                      },
                    ]}>
                    {totalLeaveDuration}
                  </Text>
                </View>
                <View
                  style={[styles.flexTwo, {paddingTop: theme.spacing * 0.5}]}>
                  <Text
                    style={[
                      styles.textBold,
                      {color: theme.typography.primaryColor},
                    ]}>
                    {'Hours'}
                  </Text>
                </View>
              </View>
            </View>

            {props.leaveData?.length > 0 ? (
              <View style={{paddingTop: theme.spacing * 2.5}}>
                {props.leaveData.map((leave) => {
                  return (
                    <View
                      style={{
                        paddingLeft: theme.spacing * 2.5,
                      }}>
                      <View
                        style={[
                          styles.rowFlexDirection,
                          styles.justifyContentSpaceBetween,
                          {
                            paddingVertical: theme.spacing * 2.5,
                          },
                        ]}>
                        <View style={[styles.flexOne]}>
                          <Icon
                            name={'circle'}
                            fontSize={theme.spacing * 3}
                            style={[styles.flexOne, {color: leave.colour}]}
                          />
                        </View>
                        <View style={[styles.flexEight]}>
                          <Text
                            style={{
                              paddingLeft: theme.spacing * 2.5,
                              fontSize: theme.spacing * 3.5,

                              color: leave.colour,
                            }}>
                            {leave.type}
                          </Text>
                        </View>

                        <View
                          style={[styles.rowFlexDirection, styles.flexFour]}>
                          <View style={[styles.flexOne]}>
                            <Text
                              style={[
                                styles.totalLeaveTypeText,
                                {
                                  fontSize: theme.spacing * 3.5,
                                  color: theme.typography.darkColor,
                                },
                              ]}>
                              {leave.duration}
                            </Text>
                          </View>
                          <View style={[styles.flexOne]}>
                            <Text
                              style={[
                                styles.totalLeaveTypeText,
                                {
                                  color: theme.typography.darkColor,
                                  marginTop: theme.spacing * 0.125,
                                  fontSize: theme.spacing * 3.5,
                                },
                              ]}>
                              {' Hours'}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : null}
          </View>

          <Divider />
          <View>
            <CardButton
              style={[{height: theme.spacing * 12}, styles.marginForShadow]}
              onPress={props.onPressDetails}>
              <View style={[styles.cardButtonContent]}>
                <View style={styles.buttonLeftView}>
                  <Icon name={'information'} />
                  <Text style={{paddingTop: theme.spacing * 0.5}}>
                    {'Attendance Details'}
                  </Text>
                </View>
                <Icon name={'chevron-right'} />
              </View>
            </CardButton>
          </View>
        </View>
      </CardContent>
    </View>
  );
};
const styles = StyleSheet.create({
  textBold: {
    fontWeight: 'bold',
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
  flexNine: {
    flex: 9,
  },
  flexEight: {
    flex: 8,
  },
  rowFlexDirection: {
    flexDirection: 'row',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  justifyContentSpaceBetween: {
    justifyContent: 'space-between',
  },
  totalLeaveTypeText: {
    fontWeight: '500',
  },
  marginForShadow: {
    ...Platform.select({
      ios: {
        marginBottom: 2,
      },
    }),
  },
  overflowHidden: {
    overflow: 'hidden',
  },
  cardButtonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },

  buttonLeftView: {
    flexDirection: 'row',
  },
});

interface AttendanceSummaryWorkLeaveDurationsCardComponentProps {
  totalLeaveDuration: string;
  totalWorkDuration: string;
  leaveData: GraphLeaveType[];
  onPressDetails: () => void;
  empNumber?: number;
  employeeName?: string;
  mode: mode;
}

export default AttendanceSummaryWorkLeaveDurationsCardComponent;
