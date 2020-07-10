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
  RouteProp,
} from '@react-navigation/native';
import MainLayout from 'layouts/MainLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import Divider from 'components/DefaultDivider';
import {LeaveListNavigatorParamList} from 'screens/leave/LeaveListNavigator';
import {LEAVE_COMMENTS} from 'screens';
import LeaveCommentListItem from 'screens/leave/components/LeaveCommentListItem';
import IconButton from 'components/DefaultIconButton';
import {PickLeaveRequestCommentInput} from 'screens/leave/components/PickLeaveRequestComment';

class LeaveComments extends React.Component<LeaveCommentsProps> {
  render() {
    const {theme, route} = this.props;
    const {employeeLeaveRequest} = route.params;
    return (
      <MainLayout
        footer={
          <>
            <View
              style={[
                styles.footerView,
                {
                  backgroundColor: theme.palette.backgroundSecondary,
                  paddingHorizontal: theme.spacing * 4,
                },
              ]}>
              <PickLeaveRequestCommentInput autoFocus={false} />
              <View style={{paddingTop: theme.spacing * 0.5}}>
                <IconButton iconProps={{name: 'send'}} />
              </View>
            </View>
          </>
        }>
        <View>
          {employeeLeaveRequest?.comments.map((comment, index) => (
            <>
              <View
                key={index}
                style={{
                  paddingHorizontal: theme.spacing,
                }}>
                <View
                  style={{
                    padding: theme.spacing * 3,
                    paddingBottom: theme.spacing * 4,
                  }}>
                  <LeaveCommentListItem leaveComment={comment} />
                </View>
                <Divider />
              </View>
            </>
          ))}
        </View>
      </MainLayout>
    );
  }
}

const styles = StyleSheet.create({
  footerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

interface LeaveCommentsProps extends WithTheme {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<LeaveListNavigatorParamList, typeof LEAVE_COMMENTS>;
}

export default withTheme<LeaveCommentsProps>()(LeaveComments);
