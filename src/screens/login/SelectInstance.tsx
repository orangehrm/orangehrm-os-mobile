/**
 * OrangeHRM is a comprehensive Human Resource Management (HRM) System that captures
 * all the essential functionalities required for any enterprise.
 * Copyright (C) 2006 OrangeHRM Inc., http://www.orangehrm.com
 *
 * OrangeHRM is free software; you can redistribute it and/or modify it under the terms of
 * the GNU General Public License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * OrangeHRM is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program;
 * if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor,
 * Boston, MA  02110-1301, USA
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
