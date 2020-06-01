import React from 'react';
import {Icon} from 'react-native-elements';
import {View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import IconSkura from '../resources/svg/IconSkura';
import strings from '../assets/strings';
import {SERVICES_TYPE, PAY_METHOD, FONT_TYPE} from '../../utils/constants';
export interface Props {
  tag: string; //obligatorio
}

const ICON_NAME = 0;
const ICON_DESCRIPTION = 1;
const ICON_TYPE = 2;

export default class IconNoDescription extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  _getIconInfo(type: string) {
    switch (type) {
      case SERVICES_TYPE.TAKE_AWAY:
        return ['home', strings.ser_eraman, FONT_TYPE.FONT_AWESOME_5];
        break;
      case SERVICES_TYPE.PICK_UP:
        return ['shopping-bag', strings.ser_bila, FONT_TYPE.FONT_AWESOME_5];
        break;
      case SERVICES_TYPE.EAT_HERE:
        return ['restaurant', strings.ser_bertan, FONT_TYPE.IONICONS];
        break;
      case PAY_METHOD.COIN:
        return ['coins', strings.pay_coins, FONT_TYPE.FONT_AWESOME_5];
        break;
      case PAY_METHOD.CARD:
        return ['credit-card', strings.pay_card, FONT_TYPE.FONT_AWESOME_5]; //pause //user-alt-slash
        break;
      case PAY_METHOD.BIZUM:
        return ['credit-card', strings.pay_bizum, FONT_TYPE.FONT_AWESOME_5];
        break;
      default:
        return ['', '', ''];
    }
  }

  _bizum() {
    return (
      <View style={{marginHorizontal: responsiveWidth(2)}}>
        <IconSkura
          fill={'white'}
          name="Bizum"
          height={responsiveHeight(3)}
          width={responsiveHeight(2.8)}
          style={{alignSelf: 'flex-start'}}
        />
      </View>
    );
  }

  _iconDescription() {
    const iconValues = this._getIconInfo(this.props.tag);
    return (
      <View style={{marginHorizontal: responsiveWidth(2)}}>
        <Icon
          style={{alignSelf: 'center'}}
          name={iconValues[ICON_NAME]}
          type={iconValues[ICON_TYPE]}
          color={'white'}
          size={responsiveFontSize(2.5)}
        />
      </View>
    );
  }

  render() {
    const iconValues = this._getIconInfo(this.props.tag);
    if (iconValues[ICON_NAME] != '')
      return this.props.tag == PAY_METHOD.BIZUM
        ? this._bizum()
        : this._iconDescription();
    return <View></View>;
  }
}
