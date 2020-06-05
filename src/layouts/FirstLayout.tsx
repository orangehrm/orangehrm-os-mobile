import React from 'react';
import {
  SafeAreaView,
  ScrollView,
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

function FirstLayout(props: FirstLayoutProps) {
  const {header, inputs, actions, more} = props;
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollView}>
        <KeyboardAvoidingView style={styles.root}>
          <View style={styles.rootView}>
            <View style={styles.main}>
              <Image
                source={require('images/orangehrm-logo-full.png')}
                style={styles.logo}
              />
              <Card fullWidth>
                <CardHeader style={styles.header}>
                  <Text style={styles.headerText}>{header}</Text>
                </CardHeader>
                <CardContent style={styles.cardContent}>{inputs}</CardContent>
                <CardActions>
                  <View style={styles.cardActions}>{actions}</View>
                </CardActions>
              </Card>
            </View>
            {more === undefined ? null : <View>{more}</View>}
            <View>
              <Footer />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

interface FirstLayoutProps {
  header: string;
  inputs: React.ReactNode;
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
    marginHorizontal: 8,
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
  header: {
    padding: 16,
    paddingVertical: 16,
    backgroundColor: 'orange',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  cardContent: {
    padding: 16,
  },
  cardActions: {
    flex: 1,
    flexDirection: 'row-reverse',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
});

export default FirstLayout;
