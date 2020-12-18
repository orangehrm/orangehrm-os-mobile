import React from 'react';
import {Text, TouchableOpacity, View, Dimensions} from 'react-native';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import {connect} from 'react-redux';

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
          style={{
            width: width / 7,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: theme.spacing * 4.5,
              fontWeight: '700',
              color: isActive ? theme.palette.secondary : 'gray',
            }}>
            {this.props.day.format('ddd')}
          </Text>
          <View
            style={{
              backgroundColor: isActive ? theme.palette.secondary : '#eaeaea',
              paddingLeft: theme.spacing * 2.5,
              paddingTop: theme.spacing * 2,
              paddingBottom: theme.spacing * 2,
              paddingRight: theme.spacing * 2.5,
              borderRadius: theme.spacing * 25,
            }}>
            <Text
              style={{
                fontSize: theme.spacing * 4.5,
                fontWeight: '700',
                color: isActive ? '#fff' : 'gray',
              }}>
              {this.props.day.format('DD')}
            </Text>
          </View>
          <Text
            style={{
              fontSize: theme.spacing * 4,
              color: isActive ? theme.palette.secondary : 'gray',
            }}>
            {hours}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

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

const AttendanceDetailedHeaderWithTheme = withTheme<
  AttendanceDetailedHeaderComponentProps
>()(AttendanceDetailedHeaderComponent);

export default connector(AttendanceDetailedHeaderWithTheme);
