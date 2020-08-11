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
} from 'react-native';
import useTheme from 'lib/hook/useTheme';
import Text from 'components/DefaultText';
import CardButton from 'screens/leave/components/CardButton';
import Icon from 'components/DefaultIcon';
import IconButton, {IconButtonProps} from 'components/DefaultIconButton';
import TextInput, {TextInputProps} from 'components/DefaultTextInput';
import {$PropertyType} from 'utility-types';

const PickLeaveRequestComment = (props: PickLeaveRequestCommentProps) => {
  const {onPress, comment} = props;
  const theme = useTheme();
  return (
    <>
      <View>
        <CardButton
          style={[styles.cardButton, {height: theme.spacing * 12}]}
          onPress={onPress}>
          <View style={[styles.cardButtonContent]}>
            <View style={styles.buttonLeftView}>
              <Icon name={'comment-text'} />
              <Text style={{paddingTop: theme.spacing * 0.5}}>{'Comment'}</Text>
            </View>
          </View>
        </CardButton>
        {comment && comment !== '' ? (
          <TouchableWithoutFeedback onPress={onPress}>
            <View
              style={{
                paddingRight: theme.spacing * 4,
                paddingLeft: theme.spacing * 12,
                paddingVertical: theme.spacing * 4,
                backgroundColor: theme.palette.background,
              }}>
              <Text>{comment}</Text>
            </View>
          </TouchableWithoutFeedback>
        ) : null}
      </View>
    </>
  );
};

interface PickLeaveRequestCommentProps {
  onPress?: () => void;
  comment?: string;
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
  cardButton: {
    borderRadius: 0,
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textView: {
    flex: 1,
  },
});

export default PickLeaveRequestComment;

export const PickLeaveRequestCommentInput = React.forwardRef<
  RNTextInput,
  TextInputProps
>((props, ref) => {
  return (
    <>
      <TextInput
        ref={ref}
        placeholder={'Add a Comment...'}
        multiline
        maxLength={250}
        autoFocus
        {...props}
      />
    </>
  );
});

export const PickLeaveRequestCommentFooter = React.forwardRef<
  RNTextInput,
  PickLeaveRequestCommentFooterProps
>((props, ref) => {
  const {value: comment, onChangeText, autoFocus, ...buttonProps} = props;
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
        <PickLeaveRequestCommentInput
          ref={ref}
          autoFocus={autoFocus}
          onChangeText={onChangeText}
          value={comment}
        />
      </View>
      <View style={{paddingTop: theme.spacing * 0.5}}>
        <IconButton iconProps={{name: 'send'}} buttonProps={buttonProps} />
      </View>
    </View>
  );
});

export interface PickLeaveRequestCommentFooterProps
  extends Pick<TextInputProps, 'onChangeText' | 'value' | 'autoFocus'>,
    NonNullable<$PropertyType<IconButtonProps, 'buttonProps'>> {}
