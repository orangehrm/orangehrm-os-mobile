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
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import MainLayout from 'layouts/MainLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {
  selectEmployeeLeaveComment,
  selectEmployeeLeaveRequest,
} from 'store/leave/leave-list/selectors';
import {
  changeEmployeeLeaveRequestComment,
  changeEmployeeLeaveRequestStatus,
  fetchEmployeeLeaveRequestDetails,
  fetchLeaveComments,
} from 'store/leave/leave-list/actions';
import Text from 'components/DefaultText';
import Chip from 'components/DefaultChip';
import FormattedDate from 'components/FormattedDate';
import Avatar from 'components/DefaultAvatar';
import Button from 'components/DefaultButton';
import Divider from 'components/DefaultDivider';
import FlatButton from 'components/FlatButton';
import LeaveCommentListItem from 'screens/leave/components/LeaveCommentListItem';
import BottomConfirmationDialog from 'screens/leave/components/BottomConfirmationDialog';
import {LeaveListNavigatorParamList} from 'screens/leave/navigators/LeaveListNavigator';
import {LEAVE_COMMENTS, LEAVE_DAYS, LEAVE_DETAILS} from 'screens';
import {navigate} from 'lib/helpers/navigation';
import {
  ACTION_APPROVE,
  ACTION_CANCEL,
  ACTION_REJECT,
  ACTION_TYPE_CHANGE_STATUS,
  APPROVE,
  CANCEL,
  LeaveRequestAllowedActions,
  REJECT,
} from 'store/leave/leave-list/types';
import {LeaveCommentsParam, LeaveDaysParam} from 'screens/leave/navigators';
import {getFirstAndLastNames} from 'lib/helpers/name';

class LeaveDetails extends React.Component<
  LeaveDetailsProps,
  LeaveDetailsState
> {
  constructor(props: LeaveDetailsProps) {
    super(props);
    this.state = {
      action: undefined,
    };
  }

  componentDidMount() {
    const {leaveRequest} = this.props.route.params;

    if (this.props.employeeLeaveRequest?.id !== leaveRequest.id) {
      this.props.fetchEmployeeLeaveRequestDetails(leaveRequest.id);
      this.props.fetchLeaveComments(leaveRequest.id);
    }
  }

  onRefresh = () => {
    const {leaveRequest} = this.props.route.params;
    this.props.fetchEmployeeLeaveRequestDetails(leaveRequest.id);
    this.props.fetchLeaveComments(leaveRequest.id);
  };

  onPressApproveLeave = () => {
    this.setState({action: ACTION_APPROVE});
  };

  onPressRejectLeave = () => {
    this.setState({action: ACTION_REJECT});
  };

  onPressCancelLeave = () => {
    this.setState({action: ACTION_CANCEL});
  };

  onResetAction = () => {
    this.setState({action: undefined});
  };

  onPressAction = (status?: LeaveRequestAllowedActions) => () => {
    const {employeeLeaveRequest} = this.props;
    if (employeeLeaveRequest && status) {
      this.props.changeEmployeeLeaveRequestStatus(
        employeeLeaveRequest.id,
        status,
      );
    }
    this.onResetAction();
  };

  onPressLeaveDays = () => {
    const {leaveRequest} = this.props.route.params;
    navigate<LeaveDaysParam>(LEAVE_DAYS, {leaveRequest});
  };

  onPressComments = () => {
    const {employeeLeaveComment} = this.props;

    if (employeeLeaveComment) {
      navigate<LeaveCommentsParam>(LEAVE_COMMENTS, {
        employeeLeaveRequestSelector: selectEmployeeLeaveRequest,
        employeeLeaveCommentSelector: selectEmployeeLeaveComment,
        changeEmployeeLeaveRequestCommentAction:
          changeEmployeeLeaveRequestComment,
      });
    }
  };

  render() {
    const {theme, employeeLeaveRequest, employeeLeaveComment} = this.props;
    const {action} = this.state;
    const leaveTypeColor = employeeLeaveRequest?.leaveType.color;

    return (
      <MainLayout
        onRefresh={this.onRefresh}
        footer={
          <>
            {employeeLeaveRequest?.allowedActions !== undefined &&
            employeeLeaveRequest.allowedActions.length !== 0 ? (
              <View
                style={[
                  styles.row,
                  styles.footerView,
                  {
                    paddingHorizontal: theme.spacing * 4,
                    paddingVertical: theme.spacing * 2,
                    backgroundColor: theme.palette.backgroundSecondary,
                  },
                ]}>
                <View>
                  {employeeLeaveRequest.allowedActions.map((item) => {
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
                <View style={styles.row}>
                  {employeeLeaveRequest.allowedActions.map((item) => {
                    if (item.name === REJECT) {
                      return (
                        <Button
                          title={'Reject'}
                          bordered
                          primary
                          onPress={this.onPressRejectLeave}
                        />
                      );
                    } else if (item.name === APPROVE) {
                      return (
                        <View style={{paddingLeft: theme.spacing * 2}}>
                          <Button
                            title={'Approve'}
                            primary
                            onPress={this.onPressApproveLeave}
                          />
                        </View>
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
                  employeeLeaveRequest?.employee !== undefined
                    ? getFirstAndLastNames(employeeLeaveRequest?.employee)
                    : ''
                }
              />
            </View>
            <View>
              <View
                style={{
                  paddingHorizontal: theme.spacing * 2,
                }}>
                <Text
                  style={[
                    styles.empNameText,
                    {
                      color: theme.typography.darkColor,
                      fontSize: theme.typography.fontSize * 1.2,
                    },
                  ]}>
                  {employeeLeaveRequest?.employee !== undefined
                    ? getFirstAndLastNames(employeeLeaveRequest?.employee)
                    : ''}
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
                    {employeeLeaveRequest?.dates.fromDate}
                  </FormattedDate>
                  {employeeLeaveRequest?.dates.fromDate !==
                  employeeLeaveRequest?.dates.toDate ? (
                    <>
                      {' to '}
                      <FormattedDate nested>
                        {employeeLeaveRequest?.dates.toDate}
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
                      {employeeLeaveRequest?.leaveType.name
                        ? employeeLeaveRequest?.leaveType.name +
                          (employeeLeaveRequest?.leaveType.deleted
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
              {employeeLeaveRequest?.leaveBreakdown.map((item, index) => {
                return (
                  <Text key={index}>
                    {item.name + ' ' + '(' + item.lengthDays.toFixed(2) + ')'}
                  </Text>
                );
              })}
            </View>
            <Text style={[{fontSize: theme.typography.smallFontSize}]}>
              {'Days Available: '}
              {employeeLeaveRequest?.leaveBalances?.map((item) => {
                return item.balance.balance.toFixed(2);
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
            {employeeLeaveComment &&
              employeeLeaveComment?.map((item, index) => (
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

interface LeaveDetailsProps
  extends WithTheme,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<LeaveListNavigatorParamList, typeof LEAVE_DETAILS>;
}

interface LeaveDetailsState {
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
    justifyContent: 'space-between',
  },
  leaveBalanceView: {
    justifyContent: 'space-evenly',
  },
});

const mapStateToProps = (state: RootState) => ({
  employeeLeaveRequest: selectEmployeeLeaveRequest(state),
  employeeLeaveComment: selectEmployeeLeaveComment(state),
});

const mapDispatchToProps = {
  fetchEmployeeLeaveRequestDetails: fetchEmployeeLeaveRequestDetails,
  fetchLeaveComments: fetchLeaveComments,
  changeEmployeeLeaveRequestComment: changeEmployeeLeaveRequestComment,
  changeEmployeeLeaveRequestStatus: changeEmployeeLeaveRequestStatus,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const MyLeaveWithTheme = withTheme<LeaveDetailsProps>()(LeaveDetails);

export default connector(MyLeaveWithTheme);
