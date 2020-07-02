/*
 * This file is part of OrangeHRM
 *
 * Copyright (C) 2020 onwards OrangeHRM (https://www.orangehrm.com/)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import React from 'react';
import {
  View,
  ViewProps,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import {Radio, NativeBase} from 'native-base';
import Text from 'components/DefaultText';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

function DefaultRadioItem(props: DefaultRadioItemProps) {
  const {title, theme, fullWidth, radioProps, onPress, style} = props;

  return (
    <>
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={[
            styles.radioView,
            fullWidth ? styles.fullWidth : undefined,
            style,
          ]}>
          <Text>{title}</Text>
          <Radio
            color={theme.palette.default}
            selectedColor={theme.palette.secondary}
            selected={false}
            onPress={onPress}
            {...radioProps}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

interface DefaultRadioItemProps
  extends WithTheme,
    Pick<TouchableWithoutFeedbackProps, 'onPress'>,
    Pick<ViewProps, 'style'> {
  title: string;
  fullWidth?: boolean;
  radioProps: NativeBase.Radio;
}

const styles = StyleSheet.create({
  radioView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fullWidth: {
    width: '100%',
    textAlign: 'center',
  },
});

export default withTheme<DefaultRadioItemProps>()(DefaultRadioItem);
