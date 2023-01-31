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
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {selectEnabledModules} from 'store/auth/selectors';
import {fetchEnabledModules} from 'store/auth/actions';
import FullInfoView from 'screens/common/component/FullInfoView';
import {Modules, MODULE_LEAVE, MODULE_TIME} from 'store/auth/types';
import {SUBHEADER_MODULE_MAP} from 'services/drawer';
import {getNavigation} from 'lib/helpers/navigation';

class FullScreenError extends React.Component<FullScreenErrorProps> {
  onRefresh = () => {
    this.props.fetchEnabledModules();
  };

  componentDidUpdate(prevProps: FullScreenErrorProps) {
    if (
      JSON.stringify(this.props.enabledModules) !==
      JSON.stringify(prevProps.enabledModules)
    ) {
      try {
        getNavigation()?.resetRoot();
      } catch (e) {
        console.log(e);
      }
    }
  }

  isDisableOnly = (module: Modules): boolean => {
    const {enabledModules} = this.props;
    if (enabledModules?.modules === undefined) {
      return false;
    }
    if (enabledModules.modules[module]) {
      return false;
    }

    const appSupportedModules = this.getAppSupportedModulesExcept(module);
    for (let i = 0; i < appSupportedModules.length; i++) {
      if (!enabledModules.modules[appSupportedModules[i]]) {
        return false;
      }
    }
    return true;
  };

  isEnabledOnly = (module: Modules): boolean => {
    const {enabledModules} = this.props;
    if (enabledModules?.modules === undefined) {
      return false;
    }
    if (!enabledModules.modules[module]) {
      return false;
    }

    const appSupportedModules = this.getAppSupportedModulesExcept(module);
    for (let i = 0; i < appSupportedModules.length; i++) {
      if (enabledModules.modules[appSupportedModules[i]]) {
        return false;
      }
    }
    return true;
  };

  getAppSupportedModulesExcept = (module: Modules) => {
    const appSupportedModules = Object.values(
      SUBHEADER_MODULE_MAP,
    ) as Array<Modules>;

    const index = appSupportedModules.indexOf(module);
    if (index > -1) {
      appSupportedModules.splice(index, 1);
    }
    return appSupportedModules;
  };

  render() {
    const {enabledModules} = this.props;
    let message = 'Unexpected Error Occurred';

    if (!enabledModules?.modules.leave && !enabledModules?.modules.time) {
      message = 'Leave and Time Modules Are Disabled';
    } else if (this.isDisableOnly(MODULE_LEAVE)) {
      message = 'Leave Module Is Disabled';
    } else if (
      enabledModules?.modules.leave &&
      !enabledModules.meta.leave.isLeavePeriodDefined
    ) {
      message = 'Leave Period Is Not Defined';
    } else if (this.isDisableOnly(MODULE_TIME)) {
      message = 'Time Module Is Disabled';
    } else if (
      this.isEnabledOnly(MODULE_TIME) &&
      !enabledModules.meta.time.isTimesheetPeriodDefined
    ) {
      message = 'Timesheet Period Is Not Defined';
    }

    message += ', Please Contact Your System Administrator.';
    return (
      <MainLayout onRefresh={this.onRefresh}>
        <FullInfoView message={message} />
      </MainLayout>
    );
  }
}

interface FullScreenErrorProps extends ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

const mapStateToProps = (state: RootState) => ({
  enabledModules: selectEnabledModules(state),
});

const mapDispatchToProps = {
  fetchEnabledModules: fetchEnabledModules,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(FullScreenError);
