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
import {View, StyleSheet, TextInput} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  StackActions,
} from '@react-navigation/native';
import FirstLayout from 'layouts/FirstLayout';
import TextField from 'components/StandardTextField';
import Button from 'components/DefaultButton';
import Text from 'components/DefaultText';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import withGlobals, {WithGlobals} from 'lib/hoc/withGlobals';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import {selectInstanceUrl} from 'store/storage/selectors';
import {fetchAuthToken, checkInstanceFinished} from 'store/auth/actions';
import {SELECT_INSTANCE} from 'screens';

class Login extends React.Component<LoginProps, LoginState> {
  passwordInput: TextInput | null | any;

  constructor(props: LoginProps) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
    };
    this.passwordInput = null;
  }

  handleLoginOnPress = () => {
    if (this.state.username === '' || this.state.password === '') {
      this.setUsernameError(this.state.username);
      this.setPasswordError(this.state.password);
    } else {
      this.props.fetchAuthToken(this.state.username, this.state.password); //get auth token
    }
  };

  handleSelectInstanceOnClick = () => {
    const {navigation, resetInstanceCheckState} = this.props;
    resetInstanceCheckState();
    navigation.dispatch(StackActions.replace(SELECT_INSTANCE));
  };

  handleOnChange = (field: string) => (text: string) => {
    this.setState({[field]: text} as Pick<LoginState, any>);
    if (field === 'username') {
      this.setUsernameError(text);
    } else if (field === 'password') {
      this.setPasswordError(text);
    }
  };

  handleFocusPassword = () => {
    this.passwordInput?._root?.focus();
  };

  setUsernameError = (username: string) => {
    this.setState({
      usernameError: username === '' ? 'Username cannot be empty' : '',
    });
  };

  setPasswordError = (password: string) => {
    this.setState({
      passwordError: password === '' ? 'Password cannot be empty' : '',
    });
  };

  render() {
    const {theme} = this.props;
    let {instanceUrl} = this.props;
    const {username, password, usernameError, passwordError} = this.state;

    if (instanceUrl === null || instanceUrl === '') {
      instanceUrl = 'Enter your OrangeHRM URL';
    }
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
              helperText={usernameError === '' ? undefined : usernameError}
              itemProps={{error: usernameError === '' ? false : true}}
              onSubmitEditing={this.handleFocusPassword}
              returnKeyType={'next'}
              autoCorrect={false}
            />
            <TextField
              label={'Password'}
              iconName={'lock-outline'}
              secureTextEntry
              value={password}
              onChangeText={this.handleOnChange('password')}
              helperText={passwordError === '' ? undefined : passwordError}
              itemProps={{error: passwordError === '' ? false : true}}
              onSubmitEditing={this.handleLoginOnPress}
              getRef={(input) => {
                this.passwordInput = input;
              }}
            />
          </>
        }
        actions={
          <Button title={'Login'} onPress={this.handleLoginOnPress} primary />
        }
        more={
          <>
            <View
              style={[
                styles.selectInstance,
                {marginTop: theme.spacing * 2, marginBottom: theme.spacing},
              ]}>
              <View>
                <Text>{'Your instance is'}</Text>
              </View>
              <Text
                style={[
                  styles.instanceText,
                  {
                    color: theme.palette.secondary,
                    paddingHorizontal: theme.spacing * 4,
                    paddingVertical: theme.spacing * 2,
                  },
                ]}
                onPress={this.handleSelectInstanceOnClick}>
                {instanceUrl}
              </Text>
            </View>
          </>
        }
      />
    );
  }
}

interface LoginProps
  extends WithTheme,
    WithGlobals,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

interface LoginState {
  username: string;
  password: string;
  usernameError: string;
  passwordError: string;
}

const styles = StyleSheet.create({
  selectInstance: {
    alignItems: 'center',
  },
  instanceText: {
    textAlign: 'center',
  },
});

const mapStateToProps = (state: RootState) => ({
  instanceUrl: selectInstanceUrl(state),
});

const mapDispatchToProps = {
  fetchAuthToken: fetchAuthToken,
  resetInstanceCheckState: checkInstanceFinished,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const LoginWithTheme = withTheme<LoginProps>()(Login);

const LoginWithGlobals = withGlobals<LoginProps>()(LoginWithTheme);

export default connector(LoginWithGlobals);
