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
  RefreshControl,
  Platform,
} from 'react-native';
import SafeAreaLayout from 'layouts/SafeAreaLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import Text from 'components/DefaultText';
import Divider from 'components/DefaultDivider';
import FlatButton from 'screens/leave/components/FlatButton';
import Avatar from 'components/DefaultAvatar';
import TextInput, {TextInputProps} from 'components/DefaultTextInput';
import {
  PickEmployeeRouteParams,
  PickEmployeeNavigationProp,
} from 'screens/leave/navigators';
import {Employee} from 'screens/leave/navigators';
import {getFirstAndLastNames} from 'lib/helpers/name';

class PickEmployee extends React.Component<PickEmployeeProps> {
  inputRef: RNTextInput | null;

  constructor(props: PickEmployeeProps) {
    super(props);
    this.inputRef = null;
  }

  filterFunction = (text: string) => (item: Employee) => {
    const fullName = item.firstName + ' ' + item.lastName;
    const regex = new RegExp(text, 'i');
    return item.employeeId.includes(text) || regex.test(fullName);
  };

  pickEmployee = (employee: Employee) => () => {
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

  render() {
    const {theme, route, navigation} = this.props;
    const {employees, textValue, setTextValue, onRefresh} = route.params;

    let filteredData;
    if (textValue !== '') {
      const filterFn = this.filterFunction(textValue);
      filteredData = employees?.filter(filterFn);
    } else {
      filteredData = employees;
    }

    const paddingRight = theme.spacing * 6;

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
              onChangeText={(text) => {
                navigation.setParams({textValue: text});
                setTextValue(text);
              }}
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
            {filteredData === undefined || filteredData.length === 0 ? (
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
                data={filteredData}
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
                keyExtractor={(item) => item.empNumber}
                keyboardShouldPersistTaps="handled"
                refreshControl={
                  <RefreshControl refreshing={false} onRefresh={onRefresh} />
                }
              />
            )}
          </View>
        </View>
      </SafeAreaLayout>
    );
  }
}

interface PickEmployeeProps extends WithTheme {
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

export default withTheme<PickEmployeeProps>()(PickEmployee);

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
