import React from 'react';
import {StyleSheet} from 'react-native';
import {Item, Input, Icon, Label, NativeBase} from 'native-base';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

function StandardTextField(
  props: React.PropsWithChildren<StandardTextFieldProps>,
) {
  const {label, iconName, style, theme, ...restProps} = props;
  return (
    <Item floatingLabel style={[styles.item, style]}>
      <Label
        style={
          iconName === undefined ? undefined : {paddingLeft: theme.spacing * 8}
        }>
        {label}
      </Label>
      <Input {...restProps} />
      {iconName === undefined ? null : (
        <Icon active name={iconName} type="MaterialCommunityIcons" />
      )}
    </Item>
  );
}

interface StandardTextFieldProps extends NativeBase.Input, WithTheme {
  label: string;
  iconName?: string;
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row-reverse',
  },
});

export default withTheme<StandardTextFieldProps>()(StandardTextField);
