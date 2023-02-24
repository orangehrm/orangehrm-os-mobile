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
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import MainLayout from 'layouts/MainLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {selectMyInfoError} from 'store/auth/selectors';
import {fetchMyInfo} from 'store/auth/actions';
import FullInfoView from 'screens/common/component/FullInfoView';
import {
  HTTP_BAD_REQUEST,
  HTTP_NOT_FOUND,
  HTTP_UNAUTHORIZED,
  HTTP_ACCEPTED,
  HTTP_INTERNAL_SERVER_ERROR,
  ERROR_NO_ASSIGNED_EMPLOYEE,
  ERROR_JSON_PARSE,
} from 'services/api';

class NoEmployeeInfo extends React.Component<NoEmployeeInfoProps> {
  onRefresh = () => {
    this.props.fetchMyInfo();
  };

  render() {
    const {theme, myInfoError} = this.props;
    let message;
    if (
      // API 1.1.0
      myInfoError?.code === HTTP_INTERNAL_SERVER_ERROR ||
      // API 1.2.0
      myInfoError?.error === ERROR_NO_ASSIGNED_EMPLOYEE
    ) {
      message = 'Please Assign an Employee to This User Account.';
    } else if (myInfoError?.code === HTTP_UNAUTHORIZED) {
      message =
        'Please Contact System Administrator. (Mobile app is not allowed to access the user API)';
    } else if (myInfoError?.code === HTTP_NOT_FOUND) {
      message =
        'Please Contact System Administrator. (Mobile app could not connect with system URL to get the details of the logged in user)';
    } else if (myInfoError?.code === HTTP_ACCEPTED) {
      message =
        'Please Contact System Administrator. (Validation erros to get the details of logged in user)';
    } else if (myInfoError?.code === HTTP_BAD_REQUEST) {
      message =
        "Please Contact System Administrator. (Mobile App couldn't get the user details of the logged in user)";
    } else if (myInfoError?.error === ERROR_JSON_PARSE) {
      message = 'Please Contact System Administrator. (Invalid response)';
    } else {
      message =
        'Please Contact System Administrator. (Mobile app could not connect with the OrangeHRM URL to get the details of the logged in user)';
    }

    return (
      <MainLayout
        onRefresh={this.onRefresh}
        statusBarBackgroundColor={theme.palette.background}>
        <FullInfoView message={message} />
      </MainLayout>
    );
  }
}

interface NoEmployeeInfoProps
  extends WithTheme,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

const mapStateToProps = (state: RootState) => ({
  myInfoError: selectMyInfoError(state),
});

const mapDispatchToProps = {
  fetchMyInfo,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const NoEmployeeInfoWithTheme =
  withTheme<NoEmployeeInfoProps>()(NoEmployeeInfo);

export default connector(NoEmployeeInfoWithTheme);
