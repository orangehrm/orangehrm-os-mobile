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
import Avatar from 'components/DefaultAvatar';
import {
  GraphLeaveType,
  Mode,
  EMPLOYEE_ATTENDANCE,
} from 'store/time/attendance/types';
import FlatButton from 'components/FlatButton';
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
                  paddingHorizontal: theme.spacing * 3,
                  paddingBottom: theme.spacing * 3,
                },
              ]}>
              <View>
                <Avatar name={employeeName} />
              </View>
              <View
                style={[
                  styles.flexOne,
                  {
                    paddingHorizontal: theme.spacing * 4,
                  },
                ]}>
                <Text
                  bold
                  style={{
                    fontSize: theme.typography.subHeaderFontSize,
                    color: theme.typography.darkColor,
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
                  fontSize: theme.typography.mediumFontSize,
                  color: theme.palette.secondary,
                }}>
                {'Total Work Duration'}
              </Text>
              <Text
                numberOfLines={1}
                bold
                style={{
                  fontSize: theme.typography.mediumFontSize,
                  color: theme.palette.secondary,
                }}>
                {totalWorkDuration}
                <Text
                  style={{
                    fontSize: theme.typography.smallFontSize,
                    color: theme.palette.secondary,
                  }}
                  bold>
                  {'  Hours'}
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
                  fontSize: theme.typography.mediumFontSize,
                }}>
                {'Total Leave Duration'}
              </Text>
              <Text
                numberOfLines={1}
                bold
                style={{
                  fontSize: theme.typography.mediumFontSize,
                }}>
                {totalLeaveDuration}
                <Text
                  style={{
                    fontSize: theme.typography.smallFontSize,
                  }}
                  bold>
                  {'  Hours'}
                </Text>
              </Text>
            </View>

            {props.leaveData?.length > 0 ? (
              <View
                style={{
                  paddingTop: theme.spacing * 3,
                  paddingBottom: theme.spacing * 3,
                }}>
                {props.leaveData.map((leave, index) => {
                  return (
                    <View
                      key={index}
                      style={[
                        styles.workDurationMain,
                        {
                          paddingTop: theme.spacing * 2,
                        },
                      ]}>
                      <View style={styles.rowFlexDirection}>
                        <Icon
                          name={'circle'}
                          fontSize={theme.spacing * 3}
                          style={[{color: leave.colour}]}
                        />
                        <Text
                          style={{
                            paddingLeft: theme.spacing * 2.5,
                            fontSize: theme.typography.fontSize,

                            color: leave.colour,
                          }}>
                          {leave.type}
                        </Text>
                      </View>
                      <Text numberOfLines={1}>
                        {leave.duration}
                        <Text
                          style={{
                            fontSize: theme.typography.smallFontSize,
                          }}>
                          {'  Hours'}
                        </Text>
                      </Text>
                    </View>
                  );
                })}
              </View>
            ) : null}
          </View>

          <Divider style={{marginHorizontal: theme.spacing * 2.5}} />
          <View style={{paddingBottom: theme.spacing}}>
            <FlatButton
              text={'Attendance Details'}
              icon={'information'}
              rightIcon
              onPress={() => {
                props.onPressDetails(undefined);
              }}
              style={Platform.select({
                ios: {
                  shadowColor: theme.palette.background,
                },
              })}
            />
          </View>
        </CardContent>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  rowFlexDirection: {
    flexDirection: 'row',
  },
  justifyContentSpaceBetween: {
    justifyContent: 'space-between',
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
