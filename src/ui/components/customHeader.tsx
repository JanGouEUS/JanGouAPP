import React, {Component} from 'react';
import {View, Image, StatusBar, Platform, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import navigatorService from '../../navigation/navigatorService';

import {observer} from 'mobx-react';
import {instance} from '../../model';

export interface Props {
  backButton?: boolean;
  title: string;
  menu?: boolean;
  logo?: boolean;
}

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

function StatusBarPlaceHolder() {
  return Platform.OS === 'ios' ? (
    <View
      style={{
        width: '100%',
        height: STATUS_BAR_HEIGHT,
        backgroundColor: instance().config.colors.HEADER,
      }}>
      <StatusBar
        barStyle={
          instance().config.viewModeValue === 0
            ? 'dark-content'
            : 'light-content'
        }
      />
    </View>
  ) : (
    <StatusBar
      backgroundColor={instance().config.colors.HEADER}
      barStyle={
        instance().config.viewModeValue === 0 ? 'dark-content' : 'light-content'
      }
    />
  );
}

@observer
export default class CustomHeader extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const colors = instance().config.colors;

    return (
      <View>
        <StatusBarPlaceHolder />
        <View
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(8),
            flexDirection: 'row',
            backgroundColor: colors.HEADER,
            alignItems: 'center',
            elevation: 1,
            justifyContent: 'space-between',
            paddingTop: responsiveHeight(2),
          }}>
          <View
            style={{
              position: 'absolute',
              top: responsiveHeight(2),
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {this.props.logo ? (
              <Image
                source={instance().config.images.jangou_horizontala}
                style={generalStyle.logo}
              />
            ) : (
              <Text
                style={[
                  Platform.OS == 'ios'
                    ? stylesIOS.headerText
                    : stylesAND.headerText,
                  {color: colors.HEADER_CONTENT},
                ]}>
                {this.props.title}
              </Text>
            )}
          </View>
          <View style={{width: responsiveWidth(20)}}>
            {this.props.menu && (
              <Icon
                type="ionicons"
                name="menu"
                size={responsiveHeight(4)}
                color={colors.HEADER_CONTENT}
                onPress={() => navigatorService.toggle()}
              />
            )}
            {this.props.backButton && (
              <Icon
                type="ionicons"
                name="arrow-back"
                size={responsiveHeight(4)}
                color={colors.HEADER_CONTENT}
                onPress={() => navigatorService.back()}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const stylesIOS = StyleSheet.create({
  headerText: {
    fontSize: 15,
    position: 'absolute',
  },
});

const stylesAND = StyleSheet.create({
  headerText: {
    fontSize: 20,
    position: 'absolute',
  },
});

const generalStyle = StyleSheet.create({
  logo: {
    width: responsiveWidth(25),
    height: responsiveHeight(8),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
