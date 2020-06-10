import React from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import MainLayout from 'layouts/MainLayout';
import Text from 'components/DefaultText';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';

class LeaveList extends React.Component<LeaveListProps> {
  render() {
    return (
      <MainLayout>
        <Text>{'TODO: Leave List'}</Text>
      </MainLayout>
    );
  }
}

interface LeaveListProps extends WithTheme, ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withTheme<LeaveListProps>()(connector(LeaveList));
