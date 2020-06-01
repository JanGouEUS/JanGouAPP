import React, {Component} from 'react';
import {View, Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Icon} from 'react-native-elements';
import Share from 'react-native-share';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {observer} from 'mobx-react';
import {instance} from '../../model';
import navigatorService from '../../navigation/navigatorService';
import {colors} from '../style/colors';

const url = 'https://yourURL';

const shareSingleImage = async (image: string) => {
  const shareOptions = {
    title: 'Share file',
    url: url + image,
    failOnCancel: false,
  };

  try {
    const ShareResponse = await Share.open(shareOptions);
    return JSON.stringify(ShareResponse, null, 2);
  } catch (error) {
    console.log('Error =>', error);
    return error;
  }
};

@observer
export default class ShowMenu extends Component {
  state = {
    index: 0,
    modalVisible: true,
  };

  _closeView() {
    this.setState({modalVisible: false});
    navigatorService.back();
  }

  _shareImage(image: string) {
    shareSingleImage(image);
  }

  render() {
    var selectedT: any = instance().taberna.selectedTaberna;
    var len: any = instance().taberna.selectedTaberna.food_card_images.length;

    const newArray = [];
    for (let i = 0; i < len; i++) {
      newArray.push({
        url: url + selectedT.food_card_images[i].image,
        freeHeight: true,
      });
    }

    return (
      <View>
        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => this._closeView()}>
          <Icon
            containerStyle={{
              position: 'absolute',
              zIndex: 1,
              right: responsiveWidth(5),
              top: responsiveWidth(7),
            }}
            type="ionicons"
            name="close"
            size={responsiveFontSize(4)}
            color={colors.SKURA}
            onPress={() => navigatorService.back()}
          />
          <View
            style={{
              borderRadius: responsiveWidth(6),
              width: responsiveWidth(12),
              height: responsiveWidth(12),
              backgroundColor: colors.SKURA,
              alignItems: 'center',
              alignContent: 'center',
              paddingVertical: responsiveWidth(3),
              marginHorizontal: responsiveWidth(2),
              position: 'absolute',
              zIndex: 1,
              right: responsiveWidth(2),
              bottom: responsiveWidth(7),
            }}>
            <Icon
              style={{alignSelf: 'center'}}
              name="share"
              type="ionicons"
              color={'black'}
              size={responsiveFontSize(3)}
              onPress={() =>
                this._shareImage(
                  selectedT.food_card_images[instance().tabsIcons.activeSlide]
                    .image,
                )
              }
            />
          </View>

          <ImageViewer
            imageUrls={newArray}
            index={instance().tabsIcons.activeSlide}
            onSwipeDown={() => {
              console.log('onSwipeDown');
            }}
            onMove={(data) => console.log(data)}
            enableSwipeDown={true}></ImageViewer>
        </Modal>
      </View>
    );
  }
}
