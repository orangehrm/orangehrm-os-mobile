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
  selectSubordinateFromDate,
  selectSubordinateToDate,
  selectSubordinateDuration,
  selectSubordinatePartialOption,
  selectSubordinateLeaveComment,
  selectSubordinateEntitlement,
  selectSubordinateSelectedLeaveTypeId,
  selectSubordinates,
  selectSelectedSubordinate,
} from 'store/leave/assign-leave/selectors';
import {
  selectFromDate,
  selectToDate,
  selectDuration,
  selectPartialOption,
  selectPickedLeaveDates,
  selectPickedLeaveDuration,
  selectPickedLeavePartialOption,
} from 'store/leave/common-screens/selectors';
import {
  saveSingleDayLeaveRequest,
  saveMultipleDayLeaveRequest,
  pickAssignLeaveComment,
  selectSubordinateLeaveType,
  fetchSubordinateLeaveEntitlements,
  fetchSubordinates as fetchSubordinatesAction,
  pickSubordinate as pickSubordinateAction,
  pickAssignLeaveFromDate,
  pickAssignLeaveToDate,
  pickAssignLeaveSingleDayDuration,
  pickAssignLeaveMultipleDayPartialOption,
} from 'store/leave/assign-leave/actions';
import {selectPreviousRoute, selectCurrentRoute} from 'store/globals/selectors';
import {
  resetCommonLeave,
  setCommonLeaveScreensState,
} from 'store/leave/common-screens/actions';
import Button from 'components/DefaultButton';
import PickLeaveRequestType from 'screens/leave/components/PickLeaveRequestType';
import PickLeaveRequestDays from 'screens/leave/components/PickLeaveRequestDays';
import PickLeaveRequestComment, {
  PickLeaveRequestCommentInput,
} from 'screens/leave/components/PickLeaveRequestComment';
import PickSubordinate from 'screens/leave/components/PickSubordinate';
import Divider from 'components/DefaultDivider';
import Text from 'components/DefaultText';
import {
  ASSIGN_LEAVE,
  PICK_EMPLOYEE,
  ASSIGN_LEAVE_PICK_LEAVE_REQUEST_DAYS_CALENDAR,
  ASSIGN_LEAVE_PICK_LEAVE_REQUEST_DURATION,
  ASSIGN_LEAVE_PICK_LEAVE_REQUEST_PARTIAL_DAYS,
} from 'screens';
import {isSingleDayRequest, isMultipleDayRequest} from 'lib/helpers/leave';
import {LeaveRequest} from 'store/leave/common-screens/types';

class AssignLeave extends React.Component<AssignLeaveProps, AssignLeaveState> {
  constructor(props: AssignLeaveProps) {
    super(props);
    this.state = {
      typingComment: false,
      requestDaysError: '',
    };
    this.updateSubordinateList();
  }

  componentDidMount() {
    Keyboard.addListener('keyboardDidHide', this.onKeyboardHide);
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidHide', this.onKeyboardHide);
  }

  componentDidUpdate(prevProps: AssignLeaveProps) {
    const {
      selectedSubordinate,
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
    if (prevProps.selectedSubordinate !== selectedSubordinate) {
      this.updateSubordinateEntitlements();
    }
    if (
      prevProps.previousRoute !== previousRoute &&
      currentRoute?.startsWith(ASSIGN_LEAVE)
    ) {
      if (previousRoute === PICK_EMPLOYEE) {
        if (prevProps.selectedSubordinate !== selectedSubordinate) {
          this.props.resetCommonLeave();
        }
      } else if (
        previousRoute === ASSIGN_LEAVE_PICK_LEAVE_REQUEST_DAYS_CALENDAR
      ) {
        if (pickedLeaveDates) {
          this.hideRequestDaysError();
          this.props.pickAssignLeaveFromDate(this.props.commonFromDate);
          this.props.pickAssignLeaveToDate(this.props.commonToDate);
        }
      } else if (previousRoute === ASSIGN_LEAVE_PICK_LEAVE_REQUEST_DURATION) {
        if (pickedLeaveDuration) {
          this.props.pickAssignLeaveSingleDayDuration(
            this.props.commonDuration,
          );
        }
      } else if (
        previousRoute === ASSIGN_LEAVE_PICK_LEAVE_REQUEST_PARTIAL_DAYS
      ) {
        if (pickedLeavePartialOption) {
          this.props.pickAssignLeaveMultipleDayPartialOption(
            this.props.commonPartialOption,
          );
        }
      } else {
        //only came from another route not related to assign leave
        this.props.setCommonLeaveScreensState({
          fromDate,
          toDate,
          duration,
          partialOption,
        });
      }
    }
  }

  onKeyboardHide = () => {
    if (this.props.currentRoute === ASSIGN_LEAVE) {
      this.hideCommentInput();
    }
  };

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

  onPressAssignLeave = () => {
    const {
      fromDate,
      toDate,
      comment,
      selectedLeaveTypeId,
      duration,
      partialOption,
      entitlements,
      selectedSubordinate,
    } = this.props;
    const selectedLeaveType = entitlements?.find(
      (item) => item.id === selectedLeaveTypeId,
    );
    if (fromDate && selectedLeaveType && selectedSubordinate) {
      let leaveRequest: LeaveRequest = {
        fromDate: fromDate,
        toDate: toDate ? toDate : fromDate,
        type: selectedLeaveType?.leaveType.id,
        comment: comment,
      };
      if (isSingleDayRequest(fromDate, toDate)) {
        this.props.saveSingleDayLeaveRequest(selectedSubordinate.empNumber, {
          ...leaveRequest,
          ...duration,
        });
      } else if (isMultipleDayRequest(fromDate, toDate)) {
        this.props.saveMultipleDayLeaveRequest(selectedSubordinate.empNumber, {
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

  updateSubordinateEntitlements = () => {
    const {selectedSubordinate} = this.props;
    if (selectedSubordinate !== undefined) {
      this.props.fetchSubordinateLeaveEntitlements(
        selectedSubordinate.empNumber,
      );
    }
  };

  updateSubordinateList = () => {
    this.props.fetchSubordinates();
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
      subordinates,
      selectedSubordinate,
      pickSubordinate,
    } = this.props;
    const {typingComment, requestDaysError} = this.state;
    return (
      <MainLayout
        onRefresh={
          selectedSubordinate === undefined
            ? subordinates === undefined
              ? this.updateSubordinateList
              : undefined
            : this.updateSubordinateEntitlements
        }
        footer={
          <>
            {selectedSubordinate && entitlements?.length !== 0 ? (
              <>
                {typingComment ? (
                  <>
                    <Divider />
                    <View style={{paddingHorizontal: theme.spacing * 4}}>
                      <PickLeaveRequestCommentInput
                        value={comment}
                        onChangeText={setLeaveComment}
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
                      title={'Assign'}
                      primary
                      fullWidth
                      onPress={this.onPressAssignLeave}
                    />
                  </View>
                )}
              </>
            ) : null}
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
          <PickSubordinate
            style={{paddingBottom: theme.spacing * 4}}
            subordinates={subordinates}
            selectedSubordinate={selectedSubordinate}
            setSelectedSubordinate={pickSubordinate}
          />
          {selectedSubordinate ? (
            <>
              {entitlements?.length === 0 ? (
                <View
                  style={[
                    styles.noRecordsTextView,
                    {
                      padding: theme.spacing * 4,
                    },
                  ]}>
                  <Text>{'No Records Found'}</Text>
                </View>
              ) : (
                <>
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
                    calendarScreenRoute={
                      ASSIGN_LEAVE_PICK_LEAVE_REQUEST_DAYS_CALENDAR
                    }
                    durationScreenRoute={
                      ASSIGN_LEAVE_PICK_LEAVE_REQUEST_DURATION
                    }
                    partialDaysScreenRoute={
                      ASSIGN_LEAVE_PICK_LEAVE_REQUEST_PARTIAL_DAYS
                    }
                    error={requestDaysError}
                  />
                  <View style={{paddingTop: theme.spacing * 2}}>
                    <PickLeaveRequestComment
                      onPress={this.toggleCommentInput}
                      comment={comment}
                    />
                  </View>
                </>
              )}
            </>
          ) : null}
        </View>
      </MainLayout>
    );
  }
}

interface AssignLeaveProps extends WithTheme, ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

interface AssignLeaveState {
  typingComment: boolean;
  requestDaysError: string;
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  noRecordsTextView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state: RootState) => ({
  entitlements: selectSubordinateEntitlement(state),
  selectedLeaveTypeId: selectSubordinateSelectedLeaveTypeId(state),
  fromDate: selectSubordinateFromDate(state),
  toDate: selectSubordinateToDate(state),
  duration: selectSubordinateDuration(state),
  partialOption: selectSubordinatePartialOption(state),
  comment: selectSubordinateLeaveComment(state),
  subordinates: selectSubordinates(state),
  selectedSubordinate: selectSelectedSubordinate(state),
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
  selectLeaveTypeAction: selectSubordinateLeaveType,
  saveSingleDayLeaveRequest: saveSingleDayLeaveRequest,
  saveMultipleDayLeaveRequest: saveMultipleDayLeaveRequest,
  fetchSubordinateLeaveEntitlements: fetchSubordinateLeaveEntitlements,
  setLeaveComment: pickAssignLeaveComment,
  fetchSubordinates: fetchSubordinatesAction,
  pickSubordinate: pickSubordinateAction,
  pickAssignLeaveFromDate: pickAssignLeaveFromDate,
  pickAssignLeaveToDate: pickAssignLeaveToDate,
  pickAssignLeaveSingleDayDuration: pickAssignLeaveSingleDayDuration,
  pickAssignLeaveMultipleDayPartialOption: pickAssignLeaveMultipleDayPartialOption,
  resetCommonLeave: resetCommonLeave,
  setCommonLeaveScreensState: setCommonLeaveScreensState,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const ApplyLeaveWithTheme = withTheme<AssignLeaveProps>()(AssignLeave);

export default connector(ApplyLeaveWithTheme);
