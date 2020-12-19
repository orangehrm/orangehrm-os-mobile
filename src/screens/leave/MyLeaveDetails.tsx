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
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {selectLeaveRequestDetail} from 'store/leave/leave-usage/selectors';
import {
  fetchMyLeaveDetails,
  changeMyLeaveRequestStatus,
} from 'store/leave/leave-usage/actions';
import Text from 'components/DefaultText';
import Chip from 'components/DefaultChip';
import Date from 'components/FormatedDate';
import Avatar from 'components/DefaultAvatar';
import Button from 'components/DefaultButton';
import Divider from 'components/DefaultDivider';
import FlatButton from 'screens/leave/components/FlatButton';
import LeaveCommentListItem from 'screens/leave/components/LeaveCommentListItem';
import {MyLeaveUsageNavigatorParamList} from 'screens/leave/navigators/MyLeaveUsageNavigator';
import BottomConfirmationDialog from 'screens/leave/components/BottomConfirmationDialog';
import {MY_LEAVE_DETAILS, LEAVE_DAYS, LEAVE_COMMENTS} from 'screens';
import {navigate} from 'lib/helpers/navigation';
import {
  ACTION_CANCEL,
  ACTION_TYPE_CHANGE_STATUS,
  LeaveRequestAllowedActions,
} from 'store/leave/leave-list/types';
import {LeaveDaysParam, LeaveCommentsParam} from 'screens/leave/navigators';
import {LEAVE_TYPE_DELETED_YES} from 'store/leave/leave-usage/types';

class MyLeaveDetails extends React.Component<
  MyLeaveDetailsProps,
  MyLeaveDetailsState
> {
  constructor(props: MyLeaveDetailsProps) {
    super(props);
    this.state = {
      action: undefined,
    };
  }

  componentDidMount() {
    const {leaveRequest} = this.props.route.params;
    if (this.props.leaveRequestDetail?.leaveRequestId !== leaveRequest.id) {
      this.props.fetchMyLeaveDetails(leaveRequest.id);
    }
  }

  onRefresh = () => {
    const {leaveRequest} = this.props.route.params;
    this.props.fetchMyLeaveDetails(leaveRequest.id);
  };

  onPressCancelLeave = () => {
    this.setState({action: ACTION_CANCEL});
  };

  onResetAction = () => {
    this.setState({action: undefined});
  };

  onPressAction = (status?: LeaveRequestAllowedActions) => () => {
    const {leaveRequestDetail} = this.props;
    if (leaveRequestDetail && status) {
      this.props.changeMyLeaveRequestStatus(leaveRequestDetail.leaveRequestId, {
        actionType: ACTION_TYPE_CHANGE_STATUS,
        status,
      });
    }
    this.onResetAction();
  };

  onPressLeaveDays = () => {
    const {leaveRequestDetail} = this.props;
    if (leaveRequestDetail) {
      navigate<LeaveDaysParam>(LEAVE_DAYS, {
        employeeLeaveRequest: leaveRequestDetail,
      });
    }
  };

  onPressComments = () => {
    const {leaveRequestDetail} = this.props;
    if (leaveRequestDetail) {
      navigate<LeaveCommentsParam>(LEAVE_COMMENTS, {
        employeeLeaveRequestSelector: selectLeaveRequestDetail,
        changeEmployeeLeaveRequestStatusAction: changeMyLeaveRequestStatus,
      });
    }
  };

  render() {
    const {theme, leaveRequestDetail} = this.props;
    const {action} = this.state;
    const leaveTypeColor = leaveRequestDetail?.leaveType.color;
    return (
      <MainLayout
        onRefresh={this.onRefresh}
        footer={
          <>
            {leaveRequestDetail?.allowedActions !== undefined &&
            leaveRequestDetail.allowedActions.length !== 0 ? (
              <View
                style={{
                  paddingHorizontal: theme.spacing * 4,
                  paddingVertical: theme.spacing * 2,
                  backgroundColor: theme.palette.backgroundSecondary,
                }}>
                <View style={[styles.row, styles.footerView]}>
                  {leaveRequestDetail.allowedActions.indexOf(ACTION_CANCEL) !==
                  -1 ? (
                    <View style={{paddingLeft: theme.spacing * 2}}>
                      <Button
                        title={'Cancel'}
                        primary
                        onPress={this.onPressCancelLeave}
                      />
                    </View>
                  ) : null}
                </View>
              </View>
            ) : null}
          </>
        }>
        <View
          style={{
            padding: theme.spacing * 3,
            paddingBottom: theme.spacing * 5,
            backgroundColor: theme.palette.backgroundSecondary,
          }}>
          <View
            style={[
              styles.row,
              {
                paddingVertical: theme.spacing * 2,
              },
            ]}>
            <View
              style={{
                paddingVertical: theme.spacing * 2,
                paddingRight: theme.spacing * 4,
              }}>
              <Avatar name={leaveRequestDetail?.employeeName} />
            </View>
            <View>
              <View style={{paddingHorizontal: theme.spacing * 2}}>
                <Text
                  style={[
                    styles.empNameText,
                    {
                      color: theme.typography.darkColor,
                      fontSize: theme.typography.fontSize * 1.2,
                    },
                  ]}>
                  {leaveRequestDetail?.employeeName}
                </Text>
              </View>
              <View
                style={{
                  paddingHorizontal: theme.spacing * 2,
                  marginVertical: theme.spacing,
                }}>
                <Text
                  style={{
                    color: theme.palette.secondary,
                    paddingBottom: theme.spacing,
                  }}>
                  <Date nested>{leaveRequestDetail?.fromDate}</Date>
                  {leaveRequestDetail?.fromDate !==
                  leaveRequestDetail?.toDate ? (
                    <>
                      {' to '}
                      <Date nested>{leaveRequestDetail?.toDate}</Date>
                    </>
                  ) : null}
                </Text>
                <View style={styles.chipView}>
                  <Chip
                    style={[
                      {
                        paddingVertical: theme.spacing,
                        paddingHorizontal: theme.spacing * 3,
                        marginBottom: theme.spacing,
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
                      {leaveRequestDetail?.leaveType.type
                        ? leaveRequestDetail?.leaveType.type +
                          (leaveRequestDetail?.leaveType.deleted ===
                          LEAVE_TYPE_DELETED_YES
                            ? ' (Deleted)'
                            : '')
                        : '--'}
                    </Text>
                  </Chip>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.row, styles.leaveBalanceView]}>
            <View>
              {leaveRequestDetail?.leaveBreakdown
                .split(',')
                .map((text, index) => (
                  <Text key={index}>{text.trim()}</Text>
                ))}
            </View>
            <Text style={[{fontSize: theme.typography.smallFontSize}]}>
              {'Days Available: '}
              {leaveRequestDetail?.leaveBalance
                ? leaveRequestDetail?.leaveBalance
                : '--'}
              {' Day(s)'}
            </Text>
          </View>
        </View>
        <View style={{paddingBottom: theme.spacing * 5}}>
          <FlatButton
            text={'Leave Days'}
            icon={'calendar'}
            onPress={this.onPressLeaveDays}
          />
          <Divider />
          <FlatButton
            text={'Comments'}
            icon={'comment-text'}
            onPress={this.onPressComments}
          />
          <Divider />
          <View>
            {leaveRequestDetail?.comments.map((comment, index) => (
              <View
                key={index}
                style={{
                  paddingHorizontal: theme.spacing * 4,
                }}>
                {index !== 0 ? <Divider /> : null}
                <View
                  style={{
                    paddingVertical: theme.spacing * 3,
                  }}>
                  <LeaveCommentListItem leaveComment={comment} />
                </View>
              </View>
            ))}
          </View>
        </View>
        <BottomConfirmationDialog
          action={action}
          onResetAction={this.onResetAction}
          onPressAction={this.onPressAction(action)}
        />
      </MainLayout>
    );
  }
}

interface MyLeaveDetailsProps
  extends WithTheme,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<MyLeaveUsageNavigatorParamList, typeof MY_LEAVE_DETAILS>;
}

interface MyLeaveDetailsState {
  action?: LeaveRequestAllowedActions;
}

const styles = StyleSheet.create({
  chipView: {
    alignItems: 'flex-start',
  },
  empNameText: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  footerView: {
    alignSelf: 'flex-end',
  },
  leaveBalanceView: {
    justifyContent: 'space-evenly',
  },
});

const mapStateToProps = (state: RootState) => ({
  leaveRequestDetail: selectLeaveRequestDetail(state),
});

const mapDispatchToProps = {
  fetchMyLeaveDetails: fetchMyLeaveDetails,
  changeMyLeaveRequestStatus: changeMyLeaveRequestStatus,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const MyLeaveWithTheme = withTheme<MyLeaveDetailsProps>()(MyLeaveDetails);

export default connector(MyLeaveWithTheme);
