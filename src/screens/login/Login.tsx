import React, {Fragment} from 'react';
import {StyleSheet} from 'react-native';
import FirstLayout from 'layouts/FirstLayout';
import TextField from 'components/StandardTextField';
import Button from 'components/DefaultButton';

class Login extends React.Component {
  render() {
    return (
      <FirstLayout
        header={'Login to OrangeHRM'}
        inputs={
          <Fragment>
            <TextField
              label={'Username'}
              iconName={'account-outline'}
              style={styles.usernameTextField}
            />
            <TextField label={'Password'} iconName={'lock-outline'} />
          </Fragment>
        }
        actions={<Button title={'Login'} onPress={() => {}} primary />}
      />
    );
  }
}

const styles = StyleSheet.create({
  usernameTextField: {
    marginBottom: 16,
  },
});

export default Login;
