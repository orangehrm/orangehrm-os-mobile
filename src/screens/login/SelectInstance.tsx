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
import FirstLayout from 'layouts/FirstLayout';
import TextField from 'components/StandardTextField';
import Button from 'components/DefaultButton';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {setStatusBarColor} from 'store/theme/actions';
import {setItem} from 'store/storage/actions';
import {selectInstanceUrl} from 'store/storage/selectors';
import {INSTANCE_URL} from 'services/storage';

class SelectInstance extends React.Component<
  SelectInstanceProps,
  SelectInstanceState
> {
  constructor(props: SelectInstanceProps) {
    super(props);
    this.state = {
      instanceUrl: '',
    };
  }

  componentDidMount() {
    this.setCurrentInstanceUrl();
  }

  componentDidUpdate(prevProps: SelectInstanceProps) {
    if (this.props.instanceUrl !== prevProps.instanceUrl) {
      this.setCurrentInstanceUrl();
    }
  }

  setCurrentInstanceUrl = () => {
    if (this.props.instanceUrl !== null && this.props.instanceUrl !== '') {
      this.setState({instanceUrl: this.props.instanceUrl});
    }
  };

  handleOnClick = () => {
    const {storageSetItem} = this.props;
    storageSetItem(INSTANCE_URL, this.state.instanceUrl);
  };

  handleOnChange = (text: string) => {
    this.setState({instanceUrl: text});
  };

  render() {
    const {instanceUrl} = this.state;
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
          />
        }
        actions={
          <Button title={'Continue'} onPress={this.handleOnClick} primary />
        }
      />
    );
  }
}

interface SelectInstanceProps extends ConnectedProps<typeof connector> {}

interface SelectInstanceState {
  instanceUrl: string;
}

const mapStateToProps = (state: RootState) => ({
  instanceUrl: selectInstanceUrl(state),
});

const mapDispatchToProps = {
  setStatusBarColor: setStatusBarColor,
  storageSetItem: setItem,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(SelectInstance);
