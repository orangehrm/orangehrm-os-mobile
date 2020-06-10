import React from 'react';
import {Subtract} from 'utility-types';
import {shallowEqual, useSelector} from 'react-redux';
import {selectTheme} from 'store/theme/selectors';
import {RootState} from 'store';
import {Theme} from 'theme/default';

const withTheme = <T extends WithTheme = WithTheme>(_options = {}) => {
  return (
    WrappedComponent: React.ComponentType<T>,
  ): React.FC<PropsWithoutTheme<T>> => {
    return (props: PropsWithoutTheme<T>) => {
      const theme = useSelector(
        (state: RootState) => selectTheme(state),
        shallowEqual,
      );
      return <WrappedComponent {...(props as T)} theme={theme} />;
    };
  };
};

export interface WithTheme {
  theme: Theme;
}

type PropsWithoutTheme<T extends WithTheme> = React.PropsWithChildren<
  Subtract<T, WithTheme>
>;

export default withTheme;
