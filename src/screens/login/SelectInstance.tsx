import React from 'react';
import FirstLayout from 'layouts/FirstLayout';
import TextField from 'components/StandardTextField';
import Button from 'components/DefaultButton';

class SelectInstance extends React.Component {
  render() {
    return (
      <FirstLayout
        header={'Enter OrangeHRM URL'}
        inputs={<TextField label={'Instance URL'} iconName={'link-variant'} />}
        actions={<Button title={'Continue'} onPress={() => {}} primary />}
      />
    );
  }
}

export default SelectInstance;
