import React from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import MainLayout from 'layouts/MainLayout';
import Text from 'components/DefaultText';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';

class MyLeaveEntitilementsAndUsage extends React.Component<
  MyLeaveEntitilementsAndUsageProps
> {
  render() {
    return (
      <MainLayout>
        <Text>{'TODO: My Leave Entitlements and Usage'}</Text>
      </MainLayout>
    );
  }
}

interface MyLeaveEntitilementsAndUsageProps
  extends WithTheme,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withTheme<MyLeaveEntitilementsAndUsageProps>()(
  connector(MyLeaveEntitilementsAndUsage),
);
