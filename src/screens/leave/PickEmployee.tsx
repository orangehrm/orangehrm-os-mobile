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
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput as RNTextInput,
  Platform,
} from 'react-native';
import {debounce, DebouncedFunc} from 'lodash';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import SafeAreaLayout from 'layouts/SafeAreaLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import Text from 'components/DefaultText';
import Divider from 'components/DefaultDivider';
import FlatButton from 'components/FlatButton';
import Avatar from 'components/DefaultAvatar';
import TextInput, {TextInputProps} from 'components/DefaultTextInput';
import Spinner from 'components/DefaultSpinner';
import {
  PickEmployeeRouteParams,
  PickEmployeeNavigationProp,
} from 'screens/leave/navigators';
import {getFirstAndLastNames} from 'lib/helpers/name';
import {selectSubordinates} from 'store/leave/assign-leave/selectors';
import {fetchSubordinates} from 'store/leave/assign-leave/actions';
import {Subordinate} from 'store/leave/assign-leave/types';

class PickEmployee extends React.Component<PickEmployeeProps> {
  inputRef: RNTextInput | null;
  fetchSubordinates: DebouncedFunc<(text: string) => {}>;

  constructor(props: PickEmployeeProps) {
    super(props);
    this.inputRef = null;
    this.fetchSubordinates = debounce((text: string) => {
      props.fetchSubordinates(text);
    }, 500);
  }

  pickEmployee = (employee: Subordinate) => () => {
    const {route, navigation} = this.props;
    const {pickEmployee} = route.params;
    pickEmployee(employee);
    navigation.goBack();
  };

  onPressEmployeePicker = () => {
    if (this.inputRef?.isFocused()) {
      this.inputRef?.blur();
    } else {
      this.inputRef?.focus();
    }
  };

  onChangeText = (text: string) => {
    const {route, navigation} = this.props;
    const {setTextValue} = route.params;
    navigation.setParams({textValue: text});
    setTextValue(text);

    this.fetchSubordinates(text);
  };

  render() {
    const {theme, route, employees} = this.props;
    const {textValue} = route.params;
    const paddingRight = theme.spacing * 6;

    if (employees && !employees.has(textValue)) {
      this.fetchSubordinates(textValue);
    }

    return (
      <SafeAreaLayout>
        <View
          style={[
            styles.flex,
            {backgroundColor: theme.palette.backgroundSecondary},
          ]}>
          <View style={[styles.row, styles.inflex]}>
            <FlatButton
              text={'Employee'}
              icon={'account'}
              rightIcon={false}
              elevation
              onPress={this.onPressEmployeePicker}
            />
          </View>
          <View style={styles.inflex}>
            <PickEmployeeTextInput
              ref={(input) => {
                this.inputRef = input;
              }}
              autoFocus
              value={textValue}
              onChangeText={this.onChangeText}
              onPressIn={this.onPressEmployeePicker}
              style={[
                {
                  paddingRight,
                  paddingLeft: theme.spacing * 12,
                  backgroundColor: theme.palette.background,
                  ...Platform.select({
                    ios: {
                      paddingVertical: theme.spacing * 4,
                    },
                  }),
                },
                styles.textInputView,
              ]}
            />
          </View>
          <View style={[styles.row, styles.flex]}>
            {employees?.get(textValue)?.length === 0 ? (
              <View style={[styles.row, styles.flex, styles.center]}>
                <Text
                  style={{
                    padding: theme.spacing * 4,
                  }}>
                  {'No matching records found'}
                </Text>
              </View>
            ) : (
              <FlatList
                ListEmptyComponent={
                  <View
                    style={{
                      paddingTop: theme.spacing * 4,
                    }}>
                    <Spinner />
                  </View>
                }
                ItemSeparatorComponent={() => {
                  return <Divider />;
                }}
                ListHeaderComponent={<Divider />}
                ListFooterComponent={
                  <View
                    style={{
                      paddingBottom: theme.spacing * 2,
                    }}
                  />
                }
                data={employees?.get(textValue)}
                renderItem={({item}) => {
                  const fullName = getFirstAndLastNames(item);
                  return (
                    <TouchableOpacity onPress={this.pickEmployee(item)}>
                      <View
                        style={[
                          styles.row,
                          styles.flex,
                          {
                            paddingVertical: theme.spacing * 3,
                            paddingRight,
                            paddingLeft: theme.spacing * 4,
                            backgroundColor: theme.palette.background,
                          },
                        ]}>
                        <Avatar name={fullName} small />
                        <View
                          style={[
                            styles.row,
                            styles.flex,
                            styles.listItemView,
                            {
                              paddingTop: theme.spacing * 2,
                              paddingLeft: theme.spacing * 4,
                            },
                          ]}>
                          <Text style={styles.fullName}>{fullName}</Text>
                          <Text style={styles.employeeId}>
                            {item.employeeId}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item.empNumber.toString()}
                keyboardShouldPersistTaps="handled"
              />
            )}
          </View>
        </View>
      </SafeAreaLayout>
    );
  }
}

interface PickEmployeeProps
  extends WithTheme,
    ConnectedProps<typeof connector> {
  navigation: PickEmployeeNavigationProp;
  route: PickEmployeeRouteParams;
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  inflex: {
    flex: 0,
  },
  row: {
    flexDirection: 'row',
  },
  listItemView: {
    justifyContent: 'space-between',
  },
  textInputView: {
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {height: 0.5, width: 0},
    elevation: 1,
  },
  center: {
    justifyContent: 'center',
  },
  fullName: {
    flex: 5,
  },
  employeeId: {
    flex: 1,
    textAlign: 'right',
  },
});

const mapStateToProps = (state: RootState) => ({
  employees: selectSubordinates(state),
});

const mapDispatchToProps = {
  fetchSubordinates: fetchSubordinates,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const PickEmployeeWithTheme = withTheme<PickEmployeeProps>()(PickEmployee);

export default connector(PickEmployeeWithTheme);

export const PickEmployeeTextInput = React.forwardRef<
  RNTextInput,
  TextInputProps
>((props, ref) => {
  return (
    <TextInput
      ref={ref}
      placeholder={'Type for hints...'}
      maxLength={100}
      {...props}
    />
  );
});
