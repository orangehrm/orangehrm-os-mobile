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
import {
  changeEmployeeLeaveRequestComment,
  fetchLeaveComment,
  fetchEmployeeLeaveRequest,
} from 'store/leave/leave-list/actions';
import Text from 'components/DefaultText';
import Chip from 'components/DefaultChip';
import FormattedDate from 'components/FormattedDate';
import Avatar from 'components/DefaultAvatar';
import Button from 'components/DefaultButton';
import Divider from 'components/DefaultDivider';
import FlatButton from 'components/FlatButton';
import LeaveCommentListItem from 'screens/leave/components/LeaveCommentListItem';
import {MyLeaveUsageNavigatorParamList} from 'screens/leave/navigators/MyLeaveUsageNavigator';
import BottomConfirmationDialog from 'screens/leave/components/BottomConfirmationDialog';
import {MY_LEAVE_DETAILS, LEAVE_DAYS, LEAVE_COMMENTS} from 'screens';
import {navigate} from 'lib/helpers/navigation';
import {
  ACTION_CANCEL,
  ACTION_TYPE_CHANGE_STATUS,
  CANCEL,
  LeaveRequestAllowedActions,
} from 'store/leave/leave-list/types';
import {LeaveDaysParam, LeaveCommentsParam} from 'screens/leave/navigators';
import {LEAVE_TYPE_DELETED_YES} from 'store/leave/leave-usage/types';
import {
  selectEmployeeLeaveComment,
  selectEmployeeLeaveRequest,
  selectEmployeeLeaveRequestDetails,
} from '../../store/leave/leave-list/selectors';

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
      this.props.fetchLeaveComment(leaveRequest.id);
      this.props.fetchEmployeeLeaveRequest(leaveRequest.id);
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
      this.props.changeMyLeaveRequestStatus(leaveRequestDetail.id, {
        actionType: ACTION_TYPE_CHANGE_STATUS,
        status,
      });
    }
    this.onResetAction();
  };

  onPressLeaveDays = () => {
    const {leaveRequestDetail, employeeLeaveRequest} = this.props;
    if (leaveRequestDetail) {
      navigate<LeaveDaysParam>(LEAVE_DAYS, {
        employeeLeaveRequest,
        leaveRequestDetail,
      });
    }
  };

  onPressComments = () => {
    const {employeeLeaveComment} = this.props;

    if (employeeLeaveComment) {
      navigate<LeaveCommentsParam>(LEAVE_COMMENTS, {
        employeeLeaveRequestSelector: selectLeaveRequestDetail,
        employeeLeaveCommentSelector: selectEmployeeLeaveComment,
        employeeLeaveRequestDetailsSelector: selectLeaveRequestDetail,
        changeEmployeeLeaveRequestCommentAction:
          changeEmployeeLeaveRequestComment,
      });
    }
  };

  render() {
    const {theme, leaveRequestDetail, employeeLeaveComment} = this.props;
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
                  {leaveRequestDetail.allowedActions.map((item) => {
                    if (item.name === CANCEL) {
                      return (
                        <Button
                          title={'Cancel'}
                          bordered
                          primary
                          onPress={this.onPressCancelLeave}
                        />
                      );
                    } else {
                      return null;
                    }
                  })}
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
              <Avatar
                name={
                  leaveRequestDetail?.employee.firstName +
                  '' +
                  leaveRequestDetail?.employee.lastName
                }
              />
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
                  {leaveRequestDetail?.employee.firstName +
                    '' +
                    leaveRequestDetail?.employee.lastName}
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
                  <FormattedDate nested>
                    {leaveRequestDetail?.dates.fromDate}
                  </FormattedDate>
                  {leaveRequestDetail?.dates.fromDate !==
                  leaveRequestDetail?.dates.toDate ? (
                    <>
                      {' to '}
                      <FormattedDate nested>
                        {leaveRequestDetail?.dates.toDate}
                      </FormattedDate>
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
                      {leaveRequestDetail?.leaveType.name
                        ? leaveRequestDetail?.leaveType.name +
                          (leaveRequestDetail?.leaveType.deleted
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
              {leaveRequestDetail?.leaveBreakdown.map((item, index) => {
                return (
                  <Text key={index}>
                    {item.name + ' ' + '(' + item.lengthDays.toFixed(2) + ')'}
                  </Text>
                );
              })}
            </View>

            <Text style={[{fontSize: theme.typography.smallFontSize}]}>
              {'Days Available: '}
              {leaveRequestDetail?.leaveBalances?.map((item) => {
                return item.balance.balance
                  ? item.balance.balance.toFixed(2)
                  : '--';
              })}
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
            {employeeLeaveComment?.map((item, index) => (
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
                  <LeaveCommentListItem leaveComment={item} />
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
  employeeLeaveComment: selectEmployeeLeaveComment(state),
  employeeLeaveRequestDetails: selectEmployeeLeaveRequestDetails(state),
  employeeLeaveRequest: selectEmployeeLeaveRequest(state),
});

const mapDispatchToProps = {
  fetchMyLeaveDetails: fetchMyLeaveDetails,
  fetchLeaveComment: fetchLeaveComment,
  changeMyLeaveRequestStatus: changeMyLeaveRequestStatus,
  changeEmployeeLeaveRequestComment: changeEmployeeLeaveRequestComment,
  fetchEmployeeLeaveRequest: fetchEmployeeLeaveRequest,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const MyLeaveWithTheme = withTheme<MyLeaveDetailsProps>()(MyLeaveDetails);

export default connector(MyLeaveWithTheme);
