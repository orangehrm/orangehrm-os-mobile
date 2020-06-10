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
