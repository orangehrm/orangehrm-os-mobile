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
import {selectEnabledModules} from 'store/auth/selectors';
import {fetchEnabledModules} from 'store/auth/actions';
import FullInfoView from 'screens/common/component/FullInfoView';

class FullScreenError extends React.Component<FullScreenErrorProps> {
  onRefresh = () => {
    this.props.fetchEnabledModules();
  };

  render() {
    const {theme, enabledModules} = this.props;
    let message =
      'Unexpected Error Occurred, Please Contact Your System Administrator.';
    if (!enabledModules?.modules.leave) {
      message =
        'Leave Module Is Disabled, Please Contact Your System Administrator.';
    } else if (!enabledModules.meta.leave.isLeavePeriodDefined) {
      message =
        'Leave Period Is Not Defined, Please Contact Your System Administrator.';
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

interface FullScreenErrorProps
  extends WithTheme,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

const mapStateToProps = (state: RootState) => ({
  enabledModules: selectEnabledModules(state),
});

const mapDispatchToProps = {
  fetchEnabledModules: fetchEnabledModules,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const LeaveCommentsWithTheme = withTheme<FullScreenErrorProps>()(
  FullScreenError,
);

export default connector(LeaveCommentsWithTheme);
