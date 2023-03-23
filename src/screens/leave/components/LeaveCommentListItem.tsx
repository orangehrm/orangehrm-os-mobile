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
import Text from 'components/DefaultText';
import Avatar from 'components/DefaultAvatar';
import FormattedDate from 'components/FormattedDate';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {LeaveComment} from 'store/leave/leave-usage/types';

class LeaveCommentListItem extends React.Component<LeaveCommentListItemProps> {
  render() {
    const {theme, leaveComment} = this.props;

    return (
      <>
        <View style={[styles.row]}>
          <View
            style={{
              paddingVertical: theme.spacing,
              paddingRight: theme.spacing * 4,
            }}>
            <Avatar small name={leaveComment.createdByEmployee.firstName} />
          </View>
          <View style={styles.flex}>
            <View
              style={[
                styles.row,
                styles.space,
                {paddingHorizontal: theme.spacing * 2},
              ]}>
              <Text style={[styles.empNameText]}>
                {leaveComment.createdByEmployee.firstName +
                  ' ' +
                  leaveComment.createdByEmployee.lastName}
              </Text>
              <FormattedDate
                style={{
                  paddingTop: theme.spacing * 0.5,
                  fontSize: theme.typography.smallFontSize,
                }}>
                {leaveComment.date}
              </FormattedDate>
            </View>
            <View
              style={{
                paddingHorizontal: theme.spacing * 2,
                paddingTop: theme.spacing,
              }}>
              <Text style={[{fontSize: theme.typography.smallFontSize}]}>
                {leaveComment.comment}
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  }
}

interface LeaveCommentListItemProps extends WithTheme {
  leaveComment: LeaveComment;
}

const styles = StyleSheet.create({
  empNameText: {
    fontWeight: 'bold',
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  space: {
    justifyContent: 'space-between',
  },
});

export default withTheme<LeaveCommentListItemProps>()(LeaveCommentListItem);
