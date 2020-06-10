import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';

const MainLayout = (props: React.PropsWithChildren<MainLayoutProps>) => {
  const {theme, children} = props;
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.palette.statusBar}
      />
      <SafeAreaView
        style={[styles.safeArea, {backgroundColor: theme.palette.background}]}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="always">
          <KeyboardAvoidingView style={styles.root}>
            {children}
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

interface MainLayoutProps extends WithTheme {}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  root: {
    flex: 1,
  },
});

export default withTheme<MainLayoutProps>()(MainLayout);
