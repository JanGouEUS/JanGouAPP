import React from 'react';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';

import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import {observer} from 'mobx-react';
import {instance} from '../../model';
import NavigatorService from '../../navigation/navigatorService';
const url = 'https://yourURL';

const {width: screenWidth} = Dimensions.get('window');
export interface Props {
  path: string; //obligatorio
}

const goForward = (item, index) => {
  instance().tabsIcons.setActiveSlide(index);
  NavigatorService.navigate('ShowMenu');
};
const getColors = function () {
  return instance().config.colors;
};
@observer
export default class MyCarousel extends React.Component<Props, State> {
  _renderItem({item, index}, parallaxProps) {
    return (
      <TouchableOpacity onPress={() => goForward(item, index)}>
        <View style={styles.item}>
          <ParallaxImage
            source={{uri: url + item.image}}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
        </View>
      </TouchableOpacity>
    );
  }

  get pagination() {
    var len: any = instance().taberna.selectedTaberna.food_card_images.length;
    console.log(len);
    return (
      <Pagination
        dotsLength={len}
        activeDotIndex={instance().tabsIcons.activeSlide}
        containerStyle={{backgroundColor: getColors().FONDO_DETAIL}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: getColors().TEXTS,
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }
  render() {
    var selectedT: any = instance().taberna.selectedTaberna;

    return (
      <View>
        <Carousel
          data={selectedT.food_card_images}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          renderItem={this._renderItem}
          hasParallaxImages={true}
          onSnapToItem={(index) => instance().tabsIcons.setActiveSlide(index)}
        />
        {this.pagination}
      </View>
    );
  }
}
const menuHeight = (297 * screenWidth) / 210;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: menuHeight - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});
