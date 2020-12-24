import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect} from 'react-redux';
import {convertDateObjectToStringFormat} from 'lib/helpers/attendance';

class AttendanceDetailedHeaderComponent extends React.Component<
  AttendanceDetailedHeaderComponentProps,
  AttendanceDetailedHeaderComponentState
> {
  constructor(props: AttendanceDetailedHeaderComponentProps) {
    super(props);
  }

  toggle = () => {
    if (this.props.isActive === false) {
      this.props.selectDate(this.props.day);
    }
  };

  render() {
    const {isActive, hours, theme} = this.props;
    return (
      <TouchableOpacity onPress={this.toggle} style={{}}>
        <View
          style={[
            styles.justifyContentCenter,
            styles.alignItemsCenter,
            {
              width: width / 7,
            },
          ]}>
          <View style={{paddingTop: theme.spacing * 2}}>
            <Text
              style={[
                styles.fontWeightBold,
                {
                  fontSize: theme.spacing * 4.5,
                  color: isActive
                    ? theme.palette.secondary
                    : theme.typography.primaryColor,
                },
              ]}>
              {convertDateObjectToStringFormat(this.props.day, 'ddd')}
            </Text>
          </View>
          <View
            style={{
              paddingTop: theme.spacing * 2,
              paddingBottom: theme.spacing * 2,
            }}>
            <View
              style={{
                backgroundColor: isActive
                  ? theme.palette.secondary
                  : theme.palette.backgroundSecondary,
                paddingLeft: theme.spacing * 2.5,
                paddingTop: theme.spacing * 2,
                paddingBottom: theme.spacing * 2,
                paddingRight: theme.spacing * 2.5,
                borderRadius: theme.spacing * 25,
              }}>
              <Text
                style={[
                  {
                    fontSize: theme.spacing * 4.5,
                    color: isActive
                      ? theme.palette.background
                      : theme.typography.primaryColor,
                  },
                ]}>
                {convertDateObjectToStringFormat(this.props.day, 'DD')}
              </Text>
            </View>
          </View>
          <View style={{paddingBottom: theme.spacing * 2}}>
            <Text
              style={{
                fontSize: theme.spacing * 4,
                color: isActive
                  ? theme.palette.secondary
                  : theme.typography.primaryColor,
              }}>
              {hours}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  justifyContentCenter: {
    justifyContent: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  fontWeightBold: {
    fontWeight: '700',
  },
});

interface AttendanceDetailedHeaderComponentState {}
interface AttendanceDetailedHeaderComponentProps extends WithTheme {
  isActive: boolean;
  day: moment.Moment;
  selectDate: (day: moment.Moment) => void;
  hours: string;
}
const {width} = Dimensions.get('window');

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

const AttendanceDetailedHeaderWithTheme = withTheme<AttendanceDetailedHeaderComponentProps>()(
  AttendanceDetailedHeaderComponent,
);

export default connector(AttendanceDetailedHeaderWithTheme);
