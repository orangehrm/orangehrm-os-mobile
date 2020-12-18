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
  View,
  StyleSheet,
  Keyboard,
  TextInput as RNTextInput,
} from 'react-native';
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
  selectWorkShift,
  selectWorkShiftFetched,
  selectErrorMessage,
} from 'store/leave/apply-leave/selectors';
import {
  saveSingleDayLeaveRequest,
  saveMultipleDayLeaveRequest,
  pickApplyLeaveComment,
  pickApplyLeaveFromDate,
  pickApplyLeaveToDate,
  pickApplyLeaveSingleDayDuration,
  pickApplyLeaveMultipleDayPartialOption,
  fetchWorkShift,
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
import FullInfoView from 'screens/common/component/FullInfoView';
import PickLeaveRequestType from 'screens/leave/components/PickLeaveRequestType';
import PickLeaveRequestDays from 'screens/leave/components/PickLeaveRequestDays';
import PickLeaveRequestComment, {
  PickLeaveRequestCommentFooter,
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
  inputRef: RNTextInput | null;

  constructor(props: ApplyLeaveProps) {
    super(props);
    this.inputRef = null;
    this.state = {
      typingComment: false,
      requestDaysError: '',
      comment: '',
    };
    this.updateEntitlements();
  }

  componentDidMount() {
    Keyboard.addListener('keyboardDidHide', this.hideCommentInput);
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidHide', this.hideCommentInput);
  }

  componentDidUpdate(prevProps: ApplyLeaveProps, prevState: ApplyLeaveState) {
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
      workShift,
      workShiftFetched,
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
          workShift,
        });
      }

      if (
        (currentRoute === APPLY_LEAVE_PICK_LEAVE_REQUEST_DURATION ||
          currentRoute === APPLY_LEAVE_PICK_LEAVE_REQUEST_PARTIAL_DAYS) &&
        !workShiftFetched
      ) {
        this.props.fetchWorkShift();
      }
    }

    if (prevProps.workShift !== workShift) {
      this.props.setCommonLeaveScreensState({workShift});
    }

    const {typingComment} = this.state;
    if (prevState.typingComment !== typingComment) {
      if (typingComment === true) {
        this.inputRef?.focus();
      } else {
        this.inputRef?.blur();
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
      const leaveRequest: LeaveRequest = {
        fromDate: fromDate,
        toDate: toDate ? toDate : fromDate,
        type: selectedLeaveType?.leaveType.id,
        comment: comment === '' ? undefined : comment,
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
      this.setState({comment: ''});
      this.hideRequestDaysError();
    } else {
      this.showRequestDaysError();
    }
  };

  onPressCommentButton = () => {
    const {setLeaveComment} = this.props;
    const {comment} = this.state;
    setLeaveComment(comment);
    this.hideCommentInput();
  };

  setLeaveComment = (text: string) => {
    this.setState({
      comment: text,
    });
  };

  showRequestDaysError = () => {
    this.setState({requestDaysError: 'Required'});
  };

  hideRequestDaysError = () => {
    this.setState({requestDaysError: ''});
  };

  onRefresh = () => {
    this.props.fetchMyLeaveEntitlements();
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
      comment: commentSaved,
      errorMessage,
    } = this.props;
    const {typingComment, requestDaysError, comment} = this.state;
    return (
      <MainLayout
        onRefresh={this.onRefresh}
        footer={
          errorMessage ? null : (
            <>
              {typingComment ? (
                <>
                  <Divider />
                  <PickLeaveRequestCommentFooter
                    ref={(input) => {
                      this.inputRef = input;
                    }}
                    value={comment}
                    onChangeText={this.setLeaveComment}
                    onPress={this.onPressCommentButton}
                  />
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
          )
        }>
        {errorMessage ? (
          <FullInfoView message={errorMessage} />
        ) : (
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
              partialDaysScreenRoute={
                APPLY_LEAVE_PICK_LEAVE_REQUEST_PARTIAL_DAYS
              }
              error={requestDaysError}
            />
            <View style={{paddingTop: theme.spacing * 2}}>
              <PickLeaveRequestComment
                onPress={this.toggleCommentInput}
                comment={commentSaved}
              />
            </View>
          </View>
        )}
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
  comment: string;
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
  workShift: selectWorkShift(state),
  workShiftFetched: selectWorkShiftFetched(state),
  errorMessage: selectErrorMessage(state),
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
  fetchWorkShift,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const ApplyLeaveWithTheme = withTheme<ApplyLeaveProps>()(ApplyLeave);

export default connector(ApplyLeaveWithTheme);
