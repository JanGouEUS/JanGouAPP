import React from 'react';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
import {View as AView} from 'react-native-animatable';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import {observer} from 'mobx-react';
import {instance} from '../../model';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {Icon} from 'react-native-elements';
import NavigatorService from '../../navigation/navigatorService';
import strings from '../assets/strings';

const {width: screenWidth} = Dimensions.get('window');
const url = 'https://yourURL';

const getColors = function () {
  return instance().config.colors;
};
const getOS = function () {
  return Platform.OS == 'ios' ? stylesIOS : stylesAnd;
};

@observer
export default class MapCarousel extends React.Component<Props, State> {
  onPositiveButtonPress = (index: number) => {
    this.props.onPressPositiveButton(index);
  };

  _renderItem({item, index}, parallaxProps) {
    return (
      <AView animation="bounceInUp" style={{width: responsiveWidth(85)}}>
        <TouchableOpacity
          style={[
            styles.cardTouchable,
            {backgroundColor: instance().config.colors.FONDO_ITEM_MAP},
          ]}
          onPress={() => NavigatorService.navigate('DetailScreen')}>
          <View style={{}}>
            <ImageBackground
              style={styles.cardBackground}
              source={
                item.imagelink
                  ? {uri: url + item.imagelink}
                  : require('../assets/images/default.jpg')
              }
            />
          </View>
          <View style={getOS().textView}>
            <Text
              numberOfLines={2}
              style={[getOS().text, {color: getColors().TEXT_ITEM_MAP}]}>
              {item.name}
            </Text>
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={[getOS().text2, {color: getColors().TEXT_ITEM_MAP}]}>
              {item.description}
            </Text>
            <View
              style={[
                getOS().border,
                {borderColor: getColors().TEXT_ITEM_MAP},
              ]}></View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                reverse
                name={'info'}
                type="font-awesome"
                color={getColors().SKURA}
                size={responsiveFontSize(1)}
              />
              <Text style={[getOS().more, {color: getColors().SKURA}]}>
                {' '}
                {strings.more}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </AView>
    );
  }

  render() {
    return (
      <View
        style={[
          styles.cardView,
          {backgroundColor: instance().config.colors.TRANSPARENT},
        ]}>
        <Carousel
          data={instance().taberna.tabernaList}
          firstItem={instance().taberna.selectedIndex}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          renderItem={this._renderItem}
          hasParallaxImages={true}
          onSnapToItem={(index) => this.onPositiveButtonPress(index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardView: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: responsiveWidth(8),
    height: responsiveHeight(20),
  },
  cardTouchable: {
    borderRadius: 2,
    width: responsiveWidth(85),
    height: responsiveHeight(20),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  cardBackground: {
    flex: 1,
    width: responsiveWidth(40),
    height: responsiveHeight(15),
    margin: responsiveHeight(2),
    // marginVertical: responsiveHeight(2),
    // marginHorizontal: responsiveHeight(2),
    resizeMode: 'cover',
    // justifyContent: "flex-end",
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});

const stylesIOS = StyleSheet.create({
  textView: {
    // alignSelf: 'center',
    justifyContent: 'center',
    height: responsiveHeight(20),
    width: responsiveWidth(35),
    paddingHorizontal: responsiveWidth(1),
  },

  text: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
  },

  text2: {
    width: responsiveWidth(20),
    height: responsiveWidth(8),
    fontSize: responsiveFontSize(0.7),
  },

  border: {
    borderBottomWidth: 1,
    padding: responsiveHeight(0.5),
    width: responsiveWidth(25),
  },

  more: {
    textAlign: 'center',
    fontSize: responsiveFontSize(1),
  },
});

const stylesAnd = StyleSheet.create({
  textView: {
    // backgroundColor:'red',
    justifyContent: 'center',
    width: responsiveWidth(35),
    height: responsiveHeight(20),
    paddingHorizontal: responsiveWidth(1),
  },

  text: {
    textAlignVertical: 'top',
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
  },
  more: {
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
  },

  text2: {
    width: responsiveWidth(20),
    height: responsiveWidth(8),
    fontSize: responsiveFontSize(1.5),
  },

  border: {
    borderBottomWidth: 1,
    padding: responsiveHeight(0.5),
    width: responsiveWidth(25),
    marginBottom: responsiveWidth(2),
  },
});
