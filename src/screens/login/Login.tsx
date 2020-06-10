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
