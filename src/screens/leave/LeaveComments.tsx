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
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import MainLayout from 'layouts/MainLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import Divider from 'components/DefaultDivider';
import LeaveCommentListItem from 'screens/leave/components/LeaveCommentListItem';
import IconButton from 'components/DefaultIconButton';
import {PickLeaveRequestCommentInput} from 'screens/leave/components/PickLeaveRequestComment';
import {selectEmployeeLeaveRequest} from 'store/leave/leave-list/selectors';
import {changeEmployeeLeaveRequestStatus} from 'store/leave/leave-list/actions';
import {ACTION_TYPE_COMMENT} from 'store/leave/leave-list/types';

class LeaveComments extends React.Component<
  LeaveCommentsProps,
  LeaveCommentsState
> {
  constructor(props: LeaveCommentsProps) {
    super(props);
    this.state = {
      comment: '',
    };
  }

  onPressComment = () => {
    const {comment} = this.state;
    const {employeeLeaveRequest} = this.props;
    if (comment !== '' && employeeLeaveRequest) {
      this.props.changeEmployeeLeaveRequestStatus(
        employeeLeaveRequest.leaveRequestId,
        {actionType: ACTION_TYPE_COMMENT, comment},
      );
      this.setState({comment: ''});
    }
  };

  onChangeText = (text: string) => {
    this.setState({comment: text});
  };

  render() {
    const {theme, employeeLeaveRequest} = this.props;
    const {comment} = this.state;
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
              <View style={styles.textView}>
                <PickLeaveRequestCommentInput
                  autoFocus={false}
                  onChangeText={this.onChangeText}
                  value={comment}
                />
              </View>
              <View style={{paddingTop: theme.spacing * 0.5}}>
                <IconButton
                  iconProps={{name: 'send'}}
                  buttonProps={{onPress: this.onPressComment}}
                />
              </View>
            </View>
          </>
        }>
        <View>
          {employeeLeaveRequest?.comments.map((commentItem, index) => (
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
                <LeaveCommentListItem leaveComment={commentItem} />
              </View>
              <Divider />
            </View>
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
  textView: {
    flex: 1,
  },
});

interface LeaveCommentsProps
  extends WithTheme,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

interface LeaveCommentsState {
  comment: string;
}

const mapStateToProps = (state: RootState) => ({
  employeeLeaveRequest: selectEmployeeLeaveRequest(state),
});

const mapDispatchToProps = {
  changeEmployeeLeaveRequestStatus: changeEmployeeLeaveRequestStatus,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const LeaveCommentsWithTheme = withTheme<LeaveCommentsProps>()(LeaveComments);

export default connector(LeaveCommentsWithTheme);
