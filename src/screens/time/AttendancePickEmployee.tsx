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
} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import SafeAreaLayout from 'layouts/SafeAreaLayout';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'store';
import Text from 'components/DefaultText';
import Divider from 'components/DefaultDivider';
import Avatar from 'components/DefaultAvatar';
import TextInput, {TextInputProps} from 'components/DefaultTextInput';
// import {
//   PickEmployeeNavigationProp,
// } from 'screens/leave/navigators';
import {EmployeeObject} from 'store/time/my-attendance/types';
import {getFirstAndLastNames} from 'lib/helpers/name';
import {
  fetchSubordinates,
  pickSubordinate,
} from 'store/time/my-attendance/actions';
import {selectSubordinates} from 'store/time/my-attendance/selectors';

class AttendancePickEmployee extends React.Component<
  AttendancePickEmployeeProps,
  AttendancePickEmployeeState
> {
  constructor(props: AttendancePickEmployeeProps) {
    super(props);
    this.state = {
      text: '',
    };
  }

  componentDidMount() {
    if (this.props.subordinates === undefined) {
      this.onRefresh();
    }
  }

  componentDidUpdate(prevProps: AttendancePickEmployeeProps) {
    if (prevProps !== this.props && this.props.subordinates === undefined) {
      this.onRefresh();
    }
  }

  onRefresh = () => {
    this.props.fetchSubordinates();
  };

  filterFunction = (text: string) => (item: EmployeeObject) => {
    const fullName = getFirstAndLastNames(item);
    const regex = new RegExp(text, 'i');
    return item.employeeId.includes(text) || regex.test(fullName);
  };

  pickEmployee = (employee: EmployeeObject) => () => {
    this.props.pickSubordinate(employee);
    this.props.navigation.goBack();
  };

  onChangeText = (text: string) => {
    this.setState({text});
  };

  render() {
    const {theme, subordinates} = this.props;
    const {text} = this.state;

    let filteredData = subordinates;
    if (text !== '') {
      const filterFn = this.filterFunction(text);
      filteredData = subordinates?.filter(filterFn);
    } else {
      filteredData = subordinates;
    }

    const paddingRight = theme.spacing * 6;

    return (
      <SafeAreaLayout>
        <View
          style={[
            styles.flex,
            {backgroundColor: theme.palette.backgroundSecondary},
          ]}>
          <View style={styles.inflex}>
            <PickEmployeeTextInput
              autoFocus
              value={text}
              onChangeText={this.onChangeText}
              style={[
                {
                  paddingRight,
                  paddingLeft: theme.spacing * 12,
                  backgroundColor: theme.palette.background,
                  paddingVertical: theme.spacing * 4,
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
                  <RefreshControl
                    refreshing={false}
                    onRefresh={this.onRefresh}
                  />
                }
              />
            )}
          </View>
        </View>
      </SafeAreaLayout>
    );
  }
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

interface AttendancePickEmployeeProps
  extends WithTheme,
    ConnectedProps<typeof connector> {
  navigation: NavigationProp<ParamListBase>;
}

interface AttendancePickEmployeeState {
  text: string;
}

const mapStateToProps = (state: RootState) => ({
  subordinates: selectSubordinates(state),
});

const mapDispatchToProps = {
  fetchSubordinates,
  pickSubordinate,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const AttendancePickEmployeeWithTheme = withTheme<AttendancePickEmployeeProps>()(
  AttendancePickEmployee,
);

export default connector(AttendancePickEmployeeWithTheme);

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
