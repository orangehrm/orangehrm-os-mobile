import React from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Item, Input, Icon, Label, NativeBase} from 'native-base';

function StandardTextField(
  props: React.PropsWithChildren<StandardTextFieldProps>,
) {
  const {label, iconName, style, ...restProps} = props;
  const itemStyle: StyleProp<ViewStyle> = [styles.item];
  if (style) {
    itemStyle.push(style);
  }
  return (
    <Item floatingLabel style={itemStyle}>
      <Label style={iconName === undefined ? undefined : styles.label}>
        {label}
      </Label>
      <Input {...restProps} />
      {iconName === undefined ? null : (
        <Icon active name={iconName} type="MaterialCommunityIcons" />
      )}
    </Item>
  );
}

interface StandardTextFieldProps extends NativeBase.Input {
  label: string;
  iconName?: string;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  label: {
    paddingLeft: 32,
  },
  item: {
    flexDirection: 'row-reverse',
  },
});

export default StandardTextField;
