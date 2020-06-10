import React from 'react';
import {ActivityIndicator} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

const DefaultSpinner = (props: DefaultSpinnerProps) => {
  const {theme} = props;
  return <ActivityIndicator size="large" color={theme.palette.secondary} />;
};

interface DefaultSpinnerProps extends WithTheme {}

export default withTheme<DefaultSpinnerProps>()(DefaultSpinner);
