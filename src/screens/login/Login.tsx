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
import FirstLayout from 'layouts/FirstLayout';
import TextField from 'components/StandardTextField';
import Button from 'components/DefaultButton';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {selectInstanceUrl} from 'store/storage/selectors';
import {fetchAuthToken} from 'store/auth/actions';
import {setItem} from 'store/storage/actions';
import {USERNAME} from 'services/storage';

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  handleOnClick = () => {
    const {instanceUrl, stoarageSetItem} = this.props;
    if (instanceUrl !== null) {
      this.props.fetchAuthToken(
        instanceUrl,
        this.state.username,
        this.state.password,
      );
    }
    stoarageSetItem(USERNAME, this.state.username);
  };

  handleOnChange = (field: string) => (text: string) => {
    this.setState({[field]: text} as Pick<LoginState, any>);
  };

  render() {
    const {theme} = this.props;
    const {username, password} = this.state;
    return (
      <FirstLayout
        header={'Login to OrangeHRM'}
        content={
          <>
            <TextField
              label={'Username'}
              iconName={'account-outline'}
              style={{marginBottom: theme.spacing * 4}}
              value={username}
              onChangeText={this.handleOnChange('username')}
            />
            <TextField
              label={'Password'}
              iconName={'lock-outline'}
              secureTextEntry
              value={password}
              onChangeText={this.handleOnChange('password')}
            />
          </>
        }
        actions={
          <Button title={'Login'} onPress={this.handleOnClick} primary />
        }
      />
    );
  }
}

interface LoginProps extends WithTheme, ConnectedProps<typeof connector> {}

interface LoginState {
  username: string;
  password: string;
}

const mapStateToProps = (state: RootState) => ({
  instanceUrl: selectInstanceUrl(state),
});

const mapDispatchToProps = {
  fetchAuthToken: fetchAuthToken,
  stoarageSetItem: setItem,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(withTheme<LoginProps>()(Login));
