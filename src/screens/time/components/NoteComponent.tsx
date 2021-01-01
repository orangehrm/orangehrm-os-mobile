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
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TextInput as RNTextInput,
  Platform,
} from 'react-native';
import useTheme from 'lib/hook/useTheme';
import Text from 'components/DefaultText';
import Icon from 'components/DefaultIcon';
import IconButton, {IconButtonProps} from 'components/DefaultIconButton';
import TextInput, {TextInputProps} from 'components/DefaultTextInput';
import {$PropertyType} from 'utility-types';
import Divider from 'components/DefaultDivider';

const PickNote = (props: PickNoteProps) => {
  const {onPress, note} = props;
  const theme = useTheme();
  return (
    <>
      <View>
        <TouchableWithoutFeedback
          style={[styles.marginForShadow]}
          onPress={onPress}>
          <View style={[styles.cardButtonContent]}>
            <View
              style={[
                styles.buttonLeftView,
                {paddingBottom: theme.spacing * 4},
              ]}>
              <Icon
                name={'comment-text'}
                style={{paddingLeft: theme.spacing * 3}}
              />
              <Text
                style={{
                  paddingTop: theme.spacing * 0.5,
                  paddingBottom: theme.spacing * 1,
                  paddingLeft: theme.spacing * 3,
                }}>
                {'Add Note'}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {note && note !== '' ? (
          <>
            <Divider />
            <TouchableWithoutFeedback onPress={onPress}>
              <View
                style={{
                  paddingTop: theme.spacing * 1,
                  paddingRight: theme.spacing * 3,
                  paddingLeft: theme.spacing * 3,
                  paddingVertical: theme.spacing * 4,
                  backgroundColor: theme.palette.background,
                }}>
                <Text>{note}</Text>
              </View>
            </TouchableWithoutFeedback>
          </>
        ) : null}
      </View>
    </>
  );
};

interface PickNoteProps {
  onPress?: () => void;
  note?: string;
}

const styles = StyleSheet.create({
  buttonLeftView: {
    flexDirection: 'row',
  },
  cardButtonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textView: {
    flex: 1,
    ...Platform.select({
      ios: {
        justifyContent: 'center',
      },
    }),
  },
  marginForShadow: {
    ...Platform.select({
      ios: {
        marginBottom: 2,
      },
    }),
  },
});

export default PickNote;

export const PickNoteInput = React.forwardRef<RNTextInput, TextInputProps>(
  (props, ref) => {
    return (
      <>
        <TextInput
          ref={ref}
          placeholder={'Add a Note...'}
          multiline
          maxLength={250}
          autoFocus
          {...props}
        />
      </>
    );
  },
);

export const PickNoteFooter = React.forwardRef<
  RNTextInput,
  PickNoteFooterProps
>((props, ref) => {
  const {value: comment, onChangeText, ...buttonProps} = props;
  const theme = useTheme();
  return (
    <View
      style={[
        styles.footerView,
        {
          backgroundColor: theme.palette.backgroundSecondary,
          paddingHorizontal: theme.spacing * 4,
        },
      ]}>
      <View style={styles.textView}>
        <PickNoteInput
          ref={ref}
          autoFocus={true}
          onChangeText={onChangeText}
          value={comment}
        />
      </View>
      <View style={{paddingTop: theme.spacing * 0.5}}>
        <IconButton
          iconProps={{name: 'send', color: 'red'}}
          buttonProps={buttonProps}
        />
      </View>
    </View>
  );
});

export interface PickNoteFooterProps
  extends Pick<TextInputProps, 'onChangeText' | 'value' | 'autoFocus'>,
    NonNullable<$PropertyType<IconButtonProps, 'buttonProps'>> {
  onPress: () => void;
}
