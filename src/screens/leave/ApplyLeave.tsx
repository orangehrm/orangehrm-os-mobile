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
  selectFromDate,
  selectToDate,
  selectDuration,
  selectPartialOption,
  selectLeaveComment,
} from 'store/leave/apply-leave/selectors';
import {selectLeaveType} from 'store/leave/leave-usage/actions';
import {
  saveSingleDayLeaveRequest,
  saveMultipleDayLeaveRequest,
  pickLeaveComment,
} from 'store/leave/apply-leave/actions';
import {fetchMyLeaveEntitlements} from 'store/leave/leave-usage/actions';
import Button from 'components/DefaultButton';
import PickLeaveRequestType from 'screens/leave/components/PickLeaveRequestType';
import PickLeaveRequestDays from 'screens/leave/components/PickLeaveRequestDays';
import PickLeaveRequestComment, {
  PickLeaveRequestCommentInput,
} from 'screens/leave/components/PickLeaveRequestComment';
import Divider from 'components/DefaultDivider';
import {APPLY_LEAVE} from 'screens';
import {isSingleDayRequest, isMultipleDayRequest} from 'lib/helpers/leave';
import {LeaveRequest} from 'store/leave/apply-leave/types';
import {
  resetSingleDayDuration as resetSingleDayDurationAction,
  resetMultipleDayPartialOption as resetMultipleDayPartialOptionAction,
} from 'store/leave/apply-leave/actions';

class ApplyLeave extends React.Component<ApplyLeaveProps, ApplyLeaveState> {
  constructor(props: ApplyLeaveProps) {
    super(props);
    this.state = {
      typingComment: false,
      showRequestDaysError: false,
    };
    this.updateEntitlements();
  }

  componentDidMount() {
    Keyboard.addListener('keyboardDidHide', this.hideCommentInput);
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidHide', this.hideCommentInput);
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
      this.setState({showRequestDaysError: false});
    } else {
      this.setState({showRequestDaysError: true});
    }
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
      resetSingleDayDuration,
      resetMultipleDayPartialOption,
    } = this.props;
    const {typingComment, showRequestDaysError} = this.state;
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
            currentRoute={APPLY_LEAVE}
            fromDate={fromDate}
            toDate={toDate}
            duration={duration}
            partialOption={partialOption}
            resetDuration={resetSingleDayDuration}
            resetPartialOption={resetMultipleDayPartialOption}
            showError={showRequestDaysError}
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
  showRequestDaysError: boolean;
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});

const mapStateToProps = (state: RootState) => ({
  entitlements: selectEntitlement(state),
  selectedLeaveTypeId: selectSelectedLeaveTypeId(state),
  fromDate: selectFromDate(state),
  toDate: selectToDate(state),
  duration: selectDuration(state),
  partialOption: selectPartialOption(state),
  comment: selectLeaveComment(state),
});

const mapDispatchToProps = {
  selectLeaveTypeAction: selectLeaveType,
  saveSingleDayLeaveRequest: saveSingleDayLeaveRequest,
  saveMultipleDayLeaveRequest: saveMultipleDayLeaveRequest,
  fetchMyLeaveEntitlements: fetchMyLeaveEntitlements,
  setLeaveComment: pickLeaveComment,
  resetSingleDayDuration: resetSingleDayDurationAction,
  resetMultipleDayPartialOption: resetMultipleDayPartialOptionAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const ApplyLeaveWithTheme = withTheme<ApplyLeaveProps>()(ApplyLeave);

export default connector(ApplyLeaveWithTheme);
