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
import {View, StyleSheet, Keyboard} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import MainLayout from 'layouts/MainLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {
  selectEntitlement,
  selectSelectedLeaveTypeId,
} from 'store/leave/leave-usage/selectors';
import {
  selectApplyLeaveFromDate,
  selectApplyLeaveToDate,
  selectApplyLeaveDuration,
  selectApplyLeavePartialOption,
  selectApplyLeaveComment,
} from 'store/leave/apply-leave/selectors';
import {
  saveSingleDayLeaveRequest,
  saveMultipleDayLeaveRequest,
  pickApplyLeaveComment,
  pickApplyLeaveFromDate,
  pickApplyLeaveToDate,
  pickApplyLeaveSingleDayDuration,
  pickApplyLeaveMultipleDayPartialOption,
} from 'store/leave/apply-leave/actions';
import {
  selectLeaveType,
  fetchMyLeaveEntitlements,
} from 'store/leave/leave-usage/actions';
import {
  selectFromDate,
  selectToDate,
  selectDuration,
  selectPartialOption,
  selectPickedLeaveDates,
  selectPickedLeaveDuration,
  selectPickedLeavePartialOption,
} from 'store/leave/common-screens/selectors';
import {selectPreviousRoute, selectCurrentRoute} from 'store/globals/selectors';
import {setCommonLeaveScreensState} from 'store/leave/common-screens/actions';
import Button from 'components/DefaultButton';
import PickLeaveRequestType from 'screens/leave/components/PickLeaveRequestType';
import PickLeaveRequestDays from 'screens/leave/components/PickLeaveRequestDays';
import PickLeaveRequestComment, {
  PickLeaveRequestCommentInput,
} from 'screens/leave/components/PickLeaveRequestComment';
import Divider from 'components/DefaultDivider';
import {
  APPLY_LEAVE,
  APPLY_LEAVE_PICK_LEAVE_REQUEST_DAYS_CALENDAR,
  APPLY_LEAVE_PICK_LEAVE_REQUEST_DURATION,
  APPLY_LEAVE_PICK_LEAVE_REQUEST_PARTIAL_DAYS,
} from 'screens';
import {isSingleDayRequest, isMultipleDayRequest} from 'lib/helpers/leave';
import {LeaveRequest} from 'store/leave/common-screens/types';

class ApplyLeave extends React.Component<ApplyLeaveProps, ApplyLeaveState> {
  constructor(props: ApplyLeaveProps) {
    super(props);
    this.state = {
      typingComment: false,
      requestDaysError: '',
    };
    this.updateEntitlements();
  }

  componentDidMount() {
    Keyboard.addListener('keyboardDidHide', this.hideCommentInput);
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidHide', this.hideCommentInput);
  }

  componentDidUpdate(prevProps: ApplyLeaveProps) {
    const {
      previousRoute,
      currentRoute,
      fromDate,
      toDate,
      duration,
      partialOption,
      pickedLeaveDates,
      pickedLeaveDuration,
      pickedLeavePartialOption,
    } = this.props;
    if (
      prevProps.previousRoute !== previousRoute &&
      currentRoute?.startsWith(APPLY_LEAVE)
    ) {
      if (previousRoute === APPLY_LEAVE_PICK_LEAVE_REQUEST_DAYS_CALENDAR) {
        if (pickedLeaveDates) {
          this.hideRequestDaysError();
          this.props.pickApplyLeaveFromDate(this.props.commonFromDate);
          this.props.pickApplyLeaveToDate(this.props.commonToDate);
        }
      } else if (previousRoute === APPLY_LEAVE_PICK_LEAVE_REQUEST_DURATION) {
        if (pickedLeaveDuration) {
          this.props.pickApplyLeaveSingleDayDuration(this.props.commonDuration);
        }
      } else if (
        previousRoute === APPLY_LEAVE_PICK_LEAVE_REQUEST_PARTIAL_DAYS
      ) {
        if (pickedLeavePartialOption) {
          this.props.pickApplyLeaveMultipleDayPartialOption(
            this.props.commonPartialOption,
          );
        }
      } else {
        this.props.setCommonLeaveScreensState({
          fromDate,
          toDate,
          duration,
          partialOption,
        });
      }
    }
  }

  toggleCommentInput = () => {
    if (this.state.typingComment === true) {
      this.hideCommentInput();
    } else {
      this.showCommentInput();
    }
  };

  showCommentInput = () => {
    this.setState({typingComment: true});
  };

  hideCommentInput = () => {
    this.setState({typingComment: false});
  };

  onPressApplyLeave = () => {
    const {
      fromDate,
      toDate,
      comment,
      selectedLeaveTypeId,
      duration,
      partialOption,
      entitlements,
    } = this.props;
    const selectedLeaveType = entitlements?.find(
      (item) => item.id === selectedLeaveTypeId,
    );
    if (fromDate && selectedLeaveType) {
      let leaveRequest: LeaveRequest = {
        fromDate: fromDate,
        toDate: toDate ? toDate : fromDate,
        type: selectedLeaveType?.leaveType.id,
        comment: comment,
      };
      if (isSingleDayRequest(fromDate, toDate)) {
        this.props.saveSingleDayLeaveRequest({
          ...leaveRequest,
          ...duration,
        });
      } else if (isMultipleDayRequest(fromDate, toDate)) {
        this.props.saveMultipleDayLeaveRequest({
          ...leaveRequest,
          ...partialOption,
        });
      }
      this.hideRequestDaysError();
    } else {
      this.showRequestDaysError();
    }
  };

  showRequestDaysError = () => {
    this.setState({requestDaysError: 'Required'});
  };

  hideRequestDaysError = () => {
    this.setState({requestDaysError: ''});
  };

  onRefresh = () => {
    this.updateEntitlements();
  };

  updateEntitlements = () => {
    if (this.props.entitlements === undefined) {
      this.props.fetchMyLeaveEntitlements();
    }
  };

  render() {
    const {
      theme,
      entitlements,
      selectedLeaveTypeId,
      selectLeaveTypeAction,
      fromDate,
      toDate,
      duration,
      partialOption,
      comment,
      setLeaveComment,
    } = this.props;
    const {typingComment, requestDaysError} = this.state;
    return (
      <MainLayout
        onRefresh={entitlements ? undefined : this.onRefresh}
        footer={
          <>
            {typingComment ? (
              <>
                <Divider />
                <View style={{paddingHorizontal: theme.spacing * 4}}>
                  <PickLeaveRequestCommentInput
                    value={comment}
                    onChangeText={(text) => {
                      setLeaveComment(text);
                    }}
                    onBlur={this.hideCommentInput}
                  />
                </View>
              </>
            ) : (
              <View
                style={{
                  paddingHorizontal: theme.spacing * 12,
                  paddingVertical: theme.spacing * 2,
                  backgroundColor: theme.palette.background,
                }}>
                <Button
                  title={'Apply'}
                  primary
                  fullWidth
                  onPress={this.onPressApplyLeave}
                />
              </View>
            )}
          </>
        }>
        <View
          style={[
            styles.mainView,
            {
              backgroundColor: theme.palette.backgroundSecondary,
              paddingBottom: theme.spacing * 4,
            },
          ]}>
          <PickLeaveRequestType
            entitlement={entitlements}
            selectedLeaveTypeId={selectedLeaveTypeId}
            selectLeaveTypeAction={selectLeaveTypeAction}
          />
          <PickLeaveRequestDays
            fromDate={fromDate}
            toDate={toDate}
            duration={duration}
            partialOption={partialOption}
            calendarScreenRoute={APPLY_LEAVE_PICK_LEAVE_REQUEST_DAYS_CALENDAR}
            durationScreenRoute={APPLY_LEAVE_PICK_LEAVE_REQUEST_DURATION}
            partialDaysScreenRoute={APPLY_LEAVE_PICK_LEAVE_REQUEST_PARTIAL_DAYS}
            error={requestDaysError}
          />
          <View style={{paddingTop: theme.spacing * 2}}>
            <PickLeaveRequestComment
              onPress={this.toggleCommentInput}
              comment={comment}
            />
          </View>
        </View>
      </MainLayout>
    );
  }
}

interface ApplyLeaveProps extends WithTheme, ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

interface ApplyLeaveState {
  typingComment: boolean;
  requestDaysError: string;
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});

const mapStateToProps = (state: RootState) => ({
  entitlements: selectEntitlement(state),
  selectedLeaveTypeId: selectSelectedLeaveTypeId(state),
  fromDate: selectApplyLeaveFromDate(state),
  toDate: selectApplyLeaveToDate(state),
  duration: selectApplyLeaveDuration(state),
  partialOption: selectApplyLeavePartialOption(state),
  comment: selectApplyLeaveComment(state),
  commonFromDate: selectFromDate(state),
  commonToDate: selectToDate(state),
  commonDuration: selectDuration(state),
  commonPartialOption: selectPartialOption(state),
  previousRoute: selectPreviousRoute(state),
  currentRoute: selectCurrentRoute(state),
  pickedLeaveDates: selectPickedLeaveDates(state),
  pickedLeaveDuration: selectPickedLeaveDuration(state),
  pickedLeavePartialOption: selectPickedLeavePartialOption(state),
});

const mapDispatchToProps = {
  selectLeaveTypeAction: selectLeaveType,
  saveSingleDayLeaveRequest: saveSingleDayLeaveRequest,
  saveMultipleDayLeaveRequest: saveMultipleDayLeaveRequest,
  fetchMyLeaveEntitlements: fetchMyLeaveEntitlements,
  setLeaveComment: pickApplyLeaveComment,
  pickApplyLeaveFromDate,
  pickApplyLeaveToDate,
  pickApplyLeaveSingleDayDuration,
  pickApplyLeaveMultipleDayPartialOption,
  setCommonLeaveScreensState,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const ApplyLeaveWithTheme = withTheme<ApplyLeaveProps>()(ApplyLeave);

export default connector(ApplyLeaveWithTheme);
