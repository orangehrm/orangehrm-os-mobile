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
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import Card from 'components/DefaultCard';
import CardHeader from 'components/DefaultCardHeader';
import CardContent from 'components/DefaultCardContent';
import CardActions from 'components/DefaultCardActions';
import Footer from 'components/DefaultFooter';
import Text from 'components/DefaultText';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {Root} from 'native-base';

const FirstLayout = (props: FirstLayoutProps) => {
  const {header, content, actions, more, theme} = props;
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.palette.statusBar}
      />
      <SafeAreaView
        style={[styles.safeArea, {backgroundColor: theme.palette.background}]}>
        <Root>
          <KeyboardAvoidingView style={styles.root}>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              contentContainerStyle={styles.scrollView}
              keyboardShouldPersistTaps="handled">
              <View
                style={[
                  styles.rootView,
                  {marginHorizontal: theme.spacing * 2},
                ]}>
                <View style={styles.main}>
                  <Image
                    source={require('images/orangehrm-logo-full.png')}
                    style={styles.logo}
                  />
                  <Card fullWidth style={{marginBottom: theme.spacing * 4}}>
                    <CardHeader
                      style={{
                        padding: theme.spacing * 4,
                        paddingVertical: theme.spacing * 4,
                        backgroundColor: theme.palette.secondary,
                      }}>
                      <Text
                        style={{
                          color: theme.typography.secondaryColor,
                          fontSize: theme.typography.headerFontSize,
                        }}>
                        {header}
                      </Text>
                    </CardHeader>
                    <CardContent style={{padding: theme.spacing * 4}}>
                      {content}
                    </CardContent>
                    <CardActions>
                      <View
                        style={[
                          styles.cardActions,
                          {
                            paddingHorizontal: theme.spacing * 4,
                            paddingBottom: theme.spacing * 2,
                          },
                        ]}>
                        {actions}
                      </View>
                    </CardActions>
                  </Card>
                </View>
                {more === undefined ? null : <View>{more}</View>}
                <View>
                  <Footer />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Root>
      </SafeAreaView>
    </>
  );
};

interface FirstLayoutProps extends WithTheme {
  header: string;
  content: React.ReactNode;
  actions: React.ReactNode;
  more?: React.ReactNode;
}

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
  rootView: {
    alignItems: 'stretch',
    marginVertical: '2%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  main: {
    alignItems: 'center',
  },
  logo: {
    width: '70%',
    height: undefined,
    resizeMode: 'contain',
    aspectRatio: 2,
  },
  cardActions: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
});

export default withTheme<FirstLayoutProps>()(FirstLayout);
