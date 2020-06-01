import React from 'react';
import {Icon} from 'react-native-elements';
import {StyleSheet, Platform, View, Text} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import IconSkura from '../resources/svg/IconSkura';

import {instance} from '../../model';
import strings from '../assets/strings';

import {
  SERVICES_TYPE,
  PAY_METHOD,
  FONT_TYPE,
  REQUEST_METHOD,
} from '../../utils/constants';
export interface Props {
  tag: string;
}

const ICON_NAME = 0;
const ICON_DESCRIPTION = 1;
const ICON_TYPE = 2;
const getOS = function () {
  return Platform.OS == 'ios' ? stylesIOS : stylesAnd;
};
export default class IconDescription extends React.Component<Props> {
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
      case REQUEST_METHOD.WHATSAPP:
        return ['whatsapp', strings.request_whatsapp, FONT_TYPE.FONT_AWESOME_5];
        break;
      case REQUEST_METHOD.EMAIL:
        return ['envelope', strings.request_mail, FONT_TYPE.FONT_AWESOME_5];
        break;
      case REQUEST_METHOD.TELEGRAM:
        return [
          'telegram-plane',
          strings.request_telegram,
          FONT_TYPE.FONT_AWESOME_5,
        ];
        break;
      case REQUEST_METHOD.TELEPHONE:
        return ['phone', strings.request_phone, FONT_TYPE.FONT_AWESOME_5];
        break;
      default:
        return ['asterisk', type, FONT_TYPE.FONT_AWESOME_5];
    }
  }
  _bizum() {
    const colors = instance().config.colors;
    return (
      <View style={styles.iconsAndTextRowView}>
        <IconSkura
          fill={colors.TEXTS}
          name="Bizum"
          height={responsiveHeight(3)}
          width={responsiveHeight(2.8)}
          style={{alignSelf: 'flex-start'}}
        />
        <Text style={[{color: colors.TEXTS}, getOS().textMotak]}>
          {strings.pay_bizum}
        </Text>
      </View>
    );
  }
  _iconDescription() {
    const colors = instance().config.colors;
    const iconValues = this._getIconInfo(this.props.tag);
    return (
      <View style={styles.iconsAndTextRowView}>
        <Icon
          style={{alignSelf: 'center'}}
          name={iconValues[ICON_NAME]}
          type={iconValues[ICON_TYPE]}
          color={colors.TEXTS}
          size={responsiveFontSize(2.5)}
        />
        <Text style={[{color: colors.TEXTS}, getOS().textMotak]}>
          {iconValues[ICON_DESCRIPTION]}
        </Text>
      </View>
    );
  }
  render() {
    const colors = instance().config.colors;
    const iconValues = this._getIconInfo(this.props.tag);

    return this.props.tag == PAY_METHOD.BIZUM
      ? this._bizum()
      : this._iconDescription();
  }
}
const styles = StyleSheet.create({
  iconsAndTextRowView: {
    marginRight: responsiveWidth(6),
    flexDirection: 'row',
    marginTop: responsiveHeight(2),
  },
});

var stylesIOS = StyleSheet.create({
  cardTitle: {
    color: '#dddddd',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  title: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.5),
  },
  text: {
    fontSize: responsiveFontSize(1),
    marginVertical: responsiveHeight(2),
  },
  textMotak: {
    fontSize: responsiveFontSize(1),
    fontWeight: 'bold',
    marginLeft: responsiveWidth(3),
  },
  cardText: {
    color: '#dddddd',
    marginVertical: responsiveHeight(1),
    fontSize: responsiveFontSize(1),
  },
  cardSubtitle: {
    color: '#dddddd',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1),
  },
});

var stylesAnd = StyleSheet.create({
  cardTitle: {
    color: '#dddddd',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
  },
  cardText: {
    color: '#dddddd',
    marginVertical: responsiveHeight(1),
    fontSize: responsiveFontSize(2),
  },
  cardSubtitle: {
    color: '#dddddd',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  title: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  text: {
    fontSize: responsiveFontSize(2),
    marginVertical: responsiveHeight(2),
  },
  textMotak: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
    marginLeft: responsiveWidth(3),
  },
});
