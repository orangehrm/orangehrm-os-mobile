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
  StyleSheet,
  ViewProps,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import Dialog, {DialogProps} from 'components/DefaultDialog';

const SnackDialog = (props: React.PropsWithChildren<SnackDialogProps>) => {
  const {
    theme,
    children,
    isVisible,
    closeSnackMessage,
    viewProps,
    ...dialogProps
  } = props;

  return (
    <Dialog
      isVisible={isVisible}
      hideModalContentWhileAnimating
      onBackButtonPress={closeSnackMessage}
      onSwipeComplete={closeSnackMessage}
      swipeDirection={['left', 'right', 'down']}
      coverScreen={false}
      hasBackdrop={false}
      //https://github.com/react-native-community/react-native-modal/issues/163
      useNativeDriver={false}
      swipeThreshold={50}
      // avoidKeyboard
      {...dialogProps}
      style={[styles.dialog, dialogProps.style]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <SafeAreaView>
          <View
            {...viewProps}
            style={[
              {
                backgroundColor: theme.palette.background,
                borderRadius: theme.borderRadius,
              },
              viewProps?.style,
            ]}>
            {children}
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Dialog>
  );
};

interface SnackDialogProps extends WithTheme, DialogProps {
  closeSnackMessage?: () => void;
  viewProps?: ViewProps;
}

const styles = StyleSheet.create({
  dialog: {
    justifyContent: 'flex-end',
  },
});

export default withTheme<SnackDialogProps>()(SnackDialog);
