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
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import Text from 'components/DefaultText';
import CardButton from 'screens/leave/components/CardButton';
import Icon from 'components/DefaultIcon';
import TextInput, {TextInputProps} from 'components/DefaultTextInput';

const PickLeaveRequestComment = (props: PickLeaveRequestCommentProps) => {
  const {theme, onPress, comment} = props;
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

interface PickLeaveRequestCommentProps extends WithTheme {
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
});

export default withTheme<PickLeaveRequestCommentProps>()(
  PickLeaveRequestComment,
);

export const PickLeaveRequestCommentInput = (props: TextInputProps) => {
  return (
    <>
      <TextInput
        placeholder={'Add a Comment...'}
        multiline
        maxLength={250}
        autoFocus
        {...props}
      />
    </>
  );
};
