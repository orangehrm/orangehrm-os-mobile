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
import {StyleSheet, View} from 'react-native';
import useTheme from 'lib/hook/useTheme';
import Text from 'components/DefaultText';
import Icon from 'components/DefaultIcon';
import Divider from 'components/DefaultDivider';
import CardContent from 'components/DefaultCardContent';
import Avatar from 'components/DefaultAvatar';
import {
  GraphLeaveType,
  Mode,
  EMPLOYEE_ATTENDANCE,
} from 'store/time/attendance/types';
import FlatButton from 'screens/leave/components/FlatButton';
import {NullableString} from 'store/leave/leave-usage/types';

const AttendanceSummaryWorkLeaveDurationsCardComponent = (
  props: AttendanceSummaryWorkLeaveDurationsCardComponentProps,
) => {
  const theme = useTheme();
  const {
    totalLeaveDuration,
    totalWorkDuration,
    mode,
    employeeName,
    jobTitle,
  } = props;
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
              <View style={styles.flexOne}>
                <Avatar name={employeeName} />
              </View>
              <View
                style={[
                  styles.flexFour,
                  {
                    marginLeft: theme.spacing * 5,
                  },
                ]}>
                <Text
                  bold
                  style={{
                    fontSize: theme.spacing * 4.5,
                  }}>
                  {employeeName}
                </Text>
                <Text>{jobTitle}</Text>
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
                  bold
                  style={{
                    fontSize: theme.spacing * 4,
                    color: theme.palette.secondary,
                  }}>
                  {'Total Work Duration'}
                </Text>
              </View>
              <View style={[styles.flexFour, styles.rowFlexDirection]}>
                <View style={[styles.flexTwo]}>
                  <Text
                    numberOfLines={2}
                    bold
                    style={{
                      fontSize: theme.spacing * 4,
                      color: theme.palette.secondary,
                    }}>
                    {totalWorkDuration}
                  </Text>
                </View>
                <View
                  style={[styles.flexTwo, {paddingTop: theme.spacing * 0.5}]}>
                  <Text bold style={{color: theme.palette.secondary}}>
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
                  bold
                  style={{
                    fontSize: theme.spacing * 4,
                    color: theme.typography.primaryColor,
                  }}>
                  {'Total Leave Duration'}
                </Text>
              </View>
              <View style={[styles.rowFlexDirection, styles.flexFour]}>
                <View style={[styles.flexTwo]}>
                  <Text
                    numberOfLines={2}
                    bold
                    style={{
                      fontSize: theme.spacing * 4,
                      color: theme.typography.primaryColor,
                    }}>
                    {totalLeaveDuration}
                  </Text>
                </View>
                <View
                  style={[styles.flexTwo, {paddingTop: theme.spacing * 0.5}]}>
                  <Text bold style={{color: theme.typography.primaryColor}}>
                    {'Hours'}
                  </Text>
                </View>
              </View>
            </View>

            {props.leaveData?.length > 0 ? (
              <View style={{paddingTop: theme.spacing * 2.5}}>
                {props.leaveData.map((leave, index) => {
                  return (
                    <View
                      key={index}
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
            <FlatButton
              text={'Attendance Details'}
              icon={'information'}
              rightIcon
              onPress={() => {
                props.onPressDetails(undefined);
              }}
            />
          </View>
        </View>
      </CardContent>
    </View>
  );
};
const styles = StyleSheet.create({
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
  overflowHidden: {
    overflow: 'hidden',
  },
});

interface AttendanceSummaryWorkLeaveDurationsCardComponentProps {
  totalLeaveDuration: string;
  totalWorkDuration: string;
  leaveData: GraphLeaveType[];
  onPressDetails: (selectedDate?: moment.Moment) => void;
  empNumber?: string;
  employeeName?: string;
  jobTitle?: NullableString;
  mode: Mode;
}

export default AttendanceSummaryWorkLeaveDurationsCardComponent;
