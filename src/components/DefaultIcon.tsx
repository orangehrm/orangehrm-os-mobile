import React from 'react';
import {Icon, NativeBase} from 'native-base';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

function DefaultIcon(props: DefaultIconProps) {
  const {theme, ...restProps} = props;
  return (
    <Icon
      type="MaterialCommunityIcons"
      {...restProps}
      style={[
        {
          color: theme.typography.primaryColor,
          fontSize: theme.typography.iconSize,
        },
      ]}
    />
  );
}

interface DefaultIconProps extends NativeBase.Icon, WithTheme {}

export default withTheme<DefaultIconProps>()(DefaultIcon);
