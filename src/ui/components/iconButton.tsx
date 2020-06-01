import React from 'react';
import {colors} from '../style/colors';
import {Icon} from 'react-native-elements';
import {StyleSheet, Platform} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';

export interface Props {
  iconName: string; //obligatorio
  iconAction: Function; //obligatorio
  disabled?: boolean;
}

const os = Platform.OS;

export default class IconButton extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <Icon
        containerStyle={stylesIB.bottomRightFloatingButton}
        reverse
        raised
        color={colors.SKURA}
        name={this.props.iconName}
        type="font-awesome"
        reverseColor="white"
        disabled={false}
        onPress={() => this.props.iconAction()}
      />
    );
  }
}
const stylesIB = StyleSheet.create({
  bottomRightFloatingButton: {
    zIndex: 1,
    position: 'absolute',
    top: os == 'ios' ? responsiveHeight(15) : responsiveHeight(14),
    right: responsiveHeight(3),
  },
});
