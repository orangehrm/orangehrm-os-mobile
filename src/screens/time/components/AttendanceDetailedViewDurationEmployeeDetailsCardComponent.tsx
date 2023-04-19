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
import Chip from 'components/DefaultChip';
import {getLeaveColourById, getDurationFromHours} from 'lib/helpers/attendance';
import {
  LeaveObject,
  Mode,
  EMPLOYEE_ATTENDANCE,
  MY_ATTENDANCE,
} from 'store/time/attendance/types';
import {connect} from 'react-redux';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {
  WORK_WEEK_FULL,
  WORK_WEEK_NON,
  WORK_WEEK_HALF,
  Holiday,
} from 'store/leave/common-screens/types';
import Avatar from 'components/DefaultAvatar';
import FormattedDate from 'components/FormattedDate';
import Text from 'components/DefaultText';

class AttendanceDetailedViewDurationEmployeeDetailsCardComponent extends React.Component<AttendanceDetailedViewDurationEmployeeDetailsCardComponentProps> {
  constructor(
    props: AttendanceDetailedViewDurationEmployeeDetailsCardComponentProps,
  ) {
    super(props);
  }

  render() {
    const {theme, date, employeeName, mode} = this.props;

    return (
      <View
        style={{
          marginVertical: theme.spacing * 2.5,
          marginHorizontal: theme.spacing * 5,
        }}>
        {mode === EMPLOYEE_ATTENDANCE ? (
          <View
            style={[
              styles.rowFlexDirection,
              styles.flexOne,
              {paddingBottom: theme.spacing * 2.5},
            ]}>
            <Avatar name={employeeName} />

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
              <View>
                <FormattedDate
                  style={[
                    styles.flexSix,
                    {
                      fontSize: theme.typography.fontSize,
                    },
                  ]}>
                  {date}
                </FormattedDate>
              </View>
            </View>
          </View>
        ) : null}
        <View>
          {mode === MY_ATTENDANCE ? (
            <FormattedDate
              bold
              style={{
                fontSize: theme.typography.subHeaderFontSize,
                marginBottom: theme.spacing,
              }}>
              {this.props.date}
            </FormattedDate>
          ) : null}
          {this.props.workweekResult !== -1 &&
          this.props.workweekResult !== WORK_WEEK_FULL ? (
            <>
              <View>
                <Chip
                  style={[
                    styles.alignSelfFlexStart,
                    {
                      borderColor: theme.palette.backgroundSecondary,
                      paddingHorizontal: theme.spacing * 3,
                      paddingVertical: theme.spacing,
                      marginBottom: theme.spacing,
                    },
                  ]}>
                  <Text style={{color: theme.typography.darkColor}}>
                    {this.props.workweekResult === WORK_WEEK_NON
                      ? 'Non-Working Day'
                      : 'Half Day'}
                  </Text>
                </Chip>
              </View>
            </>
          ) : null}
          <View>
            {this.props.holidays.map((holiday, key) => (
              <Chip
                key={key}
                fullWidth={false}
                style={[
                  styles.alignSelfFlexStart,
                  {
                    borderColor: theme.palette.defaultDark,
                    backgroundColor: theme.palette.background,
                    paddingHorizontal: theme.spacing * 3,
                    paddingVertical: theme.spacing,
                    marginBottom: theme.spacing,
                    borderWidth: StyleSheet.hairlineWidth * 2,
                  },
                ]}>
                <Text style={{color: theme.typography.darkColor}}>
                  {holiday.name}
                  {' - '}
                  {holiday.length === WORK_WEEK_HALF ? 'Half Day' : null}
                  {holiday.length === WORK_WEEK_FULL ? 'Full Day' : null}
                </Text>
              </Chip>
            ))}
          </View>
          <View>
            {this.props.leaves.map((leave, key) => (
              <Chip
                key={key}
                style={[
                  styles.alignSelfFlexStart,
                  {
                    backgroundColor: getLeaveColourById(leave.leaveType.id),
                    paddingHorizontal: theme.spacing * 3,
                    paddingVertical: theme.spacing,
                    marginBottom: theme.spacing,
                  },
                ]}>
                <Text style={{color: theme.palette.background}}>
                  {leave.leaveType.name}
                  {' - '}
                  {leave.status.name}
                  {' - '}
                  {getDurationFromHours(parseFloat(leave.lengthHours))}
                  {' Hours'}
                </Text>
              </Chip>
            ))}
          </View>
        </View>

        <View
          style={[
            styles.rowFlexDirection,
            styles.flexOne,
            {
              marginTop: theme.spacing * 6,
            },
          ]}>
          <Text
            style={{
              fontSize: theme.typography.subHeaderFontSize,
            }}>
            {'Total Duration'}
          </Text>
        </View>
        <View>
          <Text
            bold
            style={{
              fontSize: theme.typography.headerFontSize,
              color: theme.palette.secondary,
            }}>
            {this.props.duration}
            {' Hours'}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  flexSix: {
    flex: 6,
  },
  rowFlexDirection: {
    flexDirection: 'row',
  },
  alignSelfFlexStart: {
    alignSelf: 'flex-start',
  },
});

interface AttendanceDetailedViewDurationEmployeeDetailsCardComponentProps
  extends WithTheme {
  duration: string;
  date: string;
  holidays: Holiday[];
  leaves: LeaveObject[];
  workweekResult?: number;
  employeeName?: string;
  mode: Mode;
}

const connector = connect(null, null);

const AttendanceSummaryWithTheme =
  withTheme<AttendanceDetailedViewDurationEmployeeDetailsCardComponentProps>()(
    AttendanceDetailedViewDurationEmployeeDetailsCardComponent,
  );

export default connector(AttendanceSummaryWithTheme);
