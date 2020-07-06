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
import {Platform} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  StackActions,
} from '@react-navigation/native';
import FirstLayout from 'layouts/FirstLayout';
import TextField from 'components/StandardTextField';
import Button from 'components/DefaultButton';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {setStatusBarColor} from 'store/theme/actions';
import {setItem} from 'store/storage/actions';
import {selectInstanceUrl} from 'store/storage/selectors';
import {INSTANCE_URL} from 'services/storage';
import {LOGIN} from 'screens';
import {checkUrl, checkDomain} from 'lib/helpers/url';
import {checkInstance} from 'store/auth/actions';
import {
  selectInstanceExists,
  selectCheckingInstance,
} from 'store/auth/selectors';

class SelectInstance extends React.Component<
  SelectInstanceProps,
  SelectInstanceState
> {
  constructor(props: SelectInstanceProps) {
    super(props);
    this.state = {
      instanceUrl: '',
      errorMessage: '',
    };
  }

  componentDidMount() {
    this.setCurrentInstanceUrl();
  }

  componentDidUpdate(prevProps: SelectInstanceProps) {
    if (this.props.instanceUrl !== prevProps.instanceUrl) {
      this.setCurrentInstanceUrl();
    }
    if (
      this.props.checkingInstance === false &&
      this.props.instanceExists === true
    ) {
      this.props.navigation.dispatch(StackActions.replace(LOGIN));
    }
  }

  setCurrentInstanceUrl = () => {
    if (this.props.instanceUrl !== null && this.props.instanceUrl !== '') {
      this.setState({instanceUrl: this.props.instanceUrl});
    }
  };

  handleOnPress = () => {
    if (this.state.errorMessage === '') {
      const {storageSetItem} = this.props;
      let instanceUrl = this.state.instanceUrl;
      const isDomain = checkDomain(instanceUrl);
      if (isDomain) {
        instanceUrl = `https://${instanceUrl}`;
      }
      storageSetItem(INSTANCE_URL, instanceUrl);

      this.props.checkInstance();
    }
  };

  handleOnChange = (text: string) => {
    this.setState({instanceUrl: text});
    const isUrl = checkUrl(text);
    const isDomain = checkDomain(text);
    if (!isUrl && !isDomain) {
      this.setState({errorMessage: 'Invalid URL Format'});
    } else {
      this.setState({errorMessage: ''});
    }
  };

  render() {
    const {instanceUrl, errorMessage} = this.state;
    return (
      <FirstLayout
        header={'Enter OrangeHRM URL'}
        content={
          <TextField
            label={'Instance URL'}
            iconName={'link-variant'}
            value={instanceUrl}
            onChangeText={this.handleOnChange}
            keyboardType={Platform.OS === 'ios' ? 'url' : 'email-address'}
            multiline
            helperText={errorMessage === '' ? undefined : errorMessage}
            itemProps={{error: errorMessage === '' ? false : true}}
            onSubmitEditing={this.handleOnPress}
            blurOnSubmit
          />
        }
        actions={
          <Button title={'Continue'} onPress={this.handleOnPress} primary />
        }
      />
    );
  }
}

interface SelectInstanceProps extends ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

interface SelectInstanceState {
  instanceUrl: string;
  errorMessage: string;
}

const mapStateToProps = (state: RootState) => ({
  instanceUrl: selectInstanceUrl(state),
  checkingInstance: selectCheckingInstance(state),
  instanceExists: selectInstanceExists(state),
});

const mapDispatchToProps = {
  setStatusBarColor: setStatusBarColor,
  storageSetItem: setItem,
  checkInstance: checkInstance,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SelectInstance);
