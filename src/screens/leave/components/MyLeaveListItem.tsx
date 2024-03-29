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
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import Text from 'components/DefaultText';
import Chip from 'components/DefaultChip';
import FormattedDate from 'components/FormattedDate';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {LeaveRequestDetailedModel} from 'store/leave/leave-list/types';

class MyLeaveListItem extends React.Component<MyLeaveListItemProps> {
  render() {
    const {theme, leaveRequest, onPress} = this.props;

    const leaveTypeColor = leaveRequest.leaveType.color;
    return (
      <>
        <TouchableWithoutFeedback onPress={onPress}>
          <View
            style={{
              padding: theme.spacing * 3,
              paddingBottom: theme.spacing * 4,
            }}>
            <View style={styles.chipView}>
              <Chip
                style={[
                  {
                    paddingVertical: theme.spacing,
                    paddingHorizontal: theme.spacing * 3,
                    marginVertical: theme.spacing * 2,
                  },
                  leaveTypeColor
                    ? {backgroundColor: leaveTypeColor}
                    : undefined,
                ]}>
                <Text
                  numberOfLines={1}
                  style={[
                    leaveTypeColor
                      ? {color: theme.typography.lightColor}
                      : {color: theme.typography.darkColor},
                  ]}>
                  {leaveRequest.leaveType.name}
                  {leaveRequest.leaveType.deleted ? ' (Deleted)' : ''}
                </Text>
              </Chip>
            </View>
            <View style={{paddingHorizontal: theme.spacing * 2}}>
              <Text
                style={{
                  color: theme.palette.secondary,
                  paddingBottom: theme.spacing,
                }}>
                <FormattedDate nested>
                  {leaveRequest.dates.fromDate}
                </FormattedDate>
                {leaveRequest.dates.fromDate !== leaveRequest.dates.toDate &&
                leaveRequest.dates.toDate ? (
                  <>
                    {' to '}
                    <FormattedDate nested>
                      {leaveRequest.dates.toDate}
                    </FormattedDate>
                  </>
                ) : null}
              </Text>
              {leaveRequest.leaveBreakdown.map((item) => {
                return (
                  <Text style={{fontSize: theme.typography.smallFontSize}}>
                    {item.name}
                    {' (' + item.lengthDays.toFixed(2) + ')'}
                  </Text>
                );
              })}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </>
    );
  }
}

interface MyLeaveListItemProps
  extends WithTheme,
    Pick<TouchableWithoutFeedbackProps, 'onPress'> {
  leaveRequest: LeaveRequestDetailedModel;
}

const styles = StyleSheet.create({
  chipView: {
    alignItems: 'flex-start',
  },
});

export default withTheme<MyLeaveListItemProps>()(MyLeaveListItem);
