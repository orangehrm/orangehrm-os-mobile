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
import Card from 'components/DefaultCard';

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
          padding: theme.spacing * 3,
        },
      ]}>
      <Card
        style={{
          paddingTop: theme.spacing * 2,
          backgroundColor: theme.palette.background,
          borderRadius: theme.borderRadius * 2,
        }}>
        <CardContent
          style={[
            styles.overflowHidden,
            {
              backgroundColor: theme.palette.background,
              borderRadius: theme.borderRadius * 2,
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
            style={[
              styles.justifyContentSpaceBetween,
              {
                paddingHorizontal: theme.spacing * 4,
                paddingBottom: theme.spacing * 2.5,
              },
            ]}>
            <View style={styles.workDurationMain}>
              <Text
                numberOfLines={2}
                bold
                style={{
                  fontSize: theme.typography.subHeaderFontSize,
                  color: theme.palette.secondary,
                }}>
                {'Total Work Duration'}
              </Text>
              <Text
                numberOfLines={1}
                bold
                style={{
                  fontSize: theme.typography.subHeaderFontSize,
                  color: theme.palette.secondary,
                }}>
                {totalWorkDuration}
                <Text
                  style={{
                    fontSize: theme.typography.fontSize,
                    color: theme.palette.secondary,
                  }}
                  bold>
                  {' Hours'}
                </Text>
              </Text>
            </View>
            <View
              style={[
                styles.workDurationMain,
                {
                  paddingTop: theme.spacing * 2,
                },
              ]}>
              <Text
                numberOfLines={2}
                bold
                style={{
                  fontSize: theme.typography.subHeaderFontSize,
                }}>
                {'Total Leave Duration'}
              </Text>
              <Text
                numberOfLines={1}
                bold
                style={{
                  fontSize: theme.typography.subHeaderFontSize,
                }}>
                {totalLeaveDuration}
                <Text
                  style={{
                    fontSize: theme.typography.fontSize,
                  }}
                  bold>
                  {' Hours'}
                </Text>
              </Text>
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

          <Divider style={{marginHorizontal: theme.spacing * 2.5}} />
          <View style={{paddingBottom: theme.spacing * 3.75}}>
            <FlatButton
              text={'Attendance Details'}
              icon={'information'}
              rightIcon
              onPress={() => {
                props.onPressDetails(undefined);
              }}
            />
          </View>
        </CardContent>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  flexFour: {
    flex: 4,
  },
  flexOne: {
    flex: 1,
  },
  flexEight: {
    flex: 8,
  },
  rowFlexDirection: {
    flexDirection: 'row',
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
  workDurationMain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
