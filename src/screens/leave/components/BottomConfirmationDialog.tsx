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
import {View, StyleSheet} from 'react-native';
import Text from 'components/DefaultText';
import Button from 'components/DefaultButton';
import BottomDialog from 'components/BottomDialog';
import useTheme from 'lib/hook/useTheme';

const BottomConfirmationDialog = (props: BottomConfirmationDialogProps) => {
  const {action, onResetAction, onPressAction} = props;
  const theme = useTheme();

  return (
    <BottomDialog isVisible={action !== undefined} onCancel={onResetAction}>
      <View style={{padding: theme.spacing * 4}}>
        <Text
          style={{
            fontSize: theme.typography.headerFontSize,
            paddingBottom: theme.spacing * 3,
          }}>
          {'Confirmation required'}
        </Text>
        {action ? (
          <Text>{`Do you want to ${action.toLowerCase()} the leave request?`}</Text>
        ) : null}
        <View
          style={[
            styles.row,
            styles.confirmationButtonView,
            {paddingTop: theme.spacing * 5},
          ]}>
          <View
            style={[
              styles.confirmationButton,
              {paddingHorizontal: theme.spacing},
            ]}>
            <Button
              fullWidth
              title={'No'}
              bordered
              primary
              onPress={onResetAction}
            />
          </View>
          <View
            style={[
              styles.confirmationButton,
              {paddingHorizontal: theme.spacing},
            ]}>
            <Button fullWidth title={'Yes'} primary onPress={onPressAction} />
          </View>
        </View>
      </View>
    </BottomDialog>
  );
};

export interface BottomConfirmationDialogProps {
  action?: string;
  onResetAction: () => void;
  onPressAction: () => void;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  confirmationButtonView: {
    justifyContent: 'space-evenly',
  },
  confirmationButton: {
    flex: 0.5,
  },
});

export default BottomConfirmationDialog;
