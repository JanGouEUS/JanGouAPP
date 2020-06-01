import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Keyboard,
  ImageBackground,
  StyleSheet,
  Platform,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import NavigatorService from '../../navigation/navigatorService';
import {ListItem, Icon} from 'react-native-elements';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import * as Animatable from 'react-native-animatable';
import IconNoDescription from '../components/iconNoDescrption';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import {instance} from '../../model';
import CustomHeader from '../components/customHeader';
import openMap from 'react-native-open-maps';
import strings from '../../../src/ui/assets/strings';
import {PAY_METHOD, SERVICES_TYPE, FONT_TYPE} from '../../utils/constants';

interface Props {}

const getColors = function () {
  return instance().config.colors;
};
const getOS = function () {
  return Platform.OS == 'ios' ? stylesIOS : stylesAnd;
};
const url = 'https://jangou.eus';

@observer
export default class CardList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    instance().login.languageEventEmitter.addListener('language', () =>
      this.handleLan(),
    );
  }
  _goTOitem(item: any, index: number) {
    instance().taberna.setSelectedTaberna(item.idtaberna);
    instance().taberna.setSelectedIndex(index);
    NavigatorService.navigate('DetailScreen');
  }

  handleLan() {
    this.forceUpdate();
  }

  _getDescription(bar: any, lang: string) {
    let localizedObject = bar.descriptions.find(
      (desc) => desc.language === lang,
    );
    return (
      <Text
        numberOfLines={3}
        ellipsizeMode="tail"
        style={[getOS().cardText, {color: getColors().TEXTS_CARDS}]}>
        {localizedObject ? localizedObject.description : ''}
      </Text>
    );
  }

  _renderList(item: any, index: number) {
    let pay_procediments = item.pay_procediments;
    let services = item.services;
    return (
      <ListItem
        onPress={() => this._goTOitem(item, index)}
        underlayColor="transparent"
        containerStyle={{
          backgroundColor: getColors().PRIMARY,
          margin: 0,
          paddingVertical: 7,
        }}
        key={index}
        title={
          <ImageBackground
            source={
              item.imagelink
                ? {uri: url + item.imagelink}
                :  require('../assets/images/default.jpg')
            }
            style={{
              width: responsiveWidth(90),
              backgroundColor:
                instance().config.viewModeValue == 1 ? 'black' : 'white',
              borderColor: '#ffffffff',
              borderTopWidth: 1,
            }}>
            <View
              style={{
                width: responsiveWidth(90),
                backgroundColor: getColors().FONDO_CARDS,
                alignSelf: 'center',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: responsiveHeight(3),
                  paddingTop: responsiveHeight(3),
                }}>
                <View style={{flex: 3}}>
                  <Text
                    style={[
                      {color: getColors().TEXTS_CARDS},
                      getOS().cardTitle,
                    ]}>
                    {item.name}{' '}
                  </Text>
                  <Text
                    numberOfLines={3}
                    ellipsizeMode="tail"
                    style={[
                      getOS().cardSubtitle,
                      {color: getColors().TEXTS_CARDS},
                    ]}>
                    {item.address}
                  </Text>
                  <Text
                    numberOfLines={3}
                    ellipsizeMode="tail"
                    style={[
                      getOS().cardSubtitle,
                      {color: getColors().TEXTS_CARDS},
                    ]}>
                    {
                      item.timetables.find(
                        (desc) => desc.language === instance().login.language,
                      ).timeTable
                    }
                  </Text>

                  {this._getDescription(item, instance().login.language)}

                  {item._lat != null && item._lon != null ? (
                    <View
                      style={{
                        marginBottom: 0 - responsiveWidth(6),
                        zIndex: 2,
                        alignSelf: 'flex-end',
                        borderRadius: responsiveWidth(6),
                        width: responsiveWidth(12),
                        height: responsiveWidth(12),
                        backgroundColor: getColors().SKURA,
                        alignItems: 'center',
                        alignContent: 'center',
                        paddingVertical: responsiveWidth(3),
                      }}>
                      <Icon
                        style={{zIndex: 2, alignSelf: 'center'}}
                        name="location-arrow"
                        type="font-awesome"
                        color={'black'}
                        size={responsiveFontSize(3)}
                        onPress={() =>
                          openMap({
                            latitude: item.latitude,
                            longitude: item.longitude,
                            travelType: 'walk',
                            provider: 'google',
                            end: item._lat + ',' + item._lon,
                          })
                        }
                      />
                    </View>
                  ) : null}
                </View>
              </View>

              <View
                style={{
                  zIndex: -1,
                  width: '100%',
                  paddingVertical: responsiveWidth(3),
                  borderColor: getColors().SKURA,
                  borderTopWidth: 1,
                  paddingHorizontal: responsiveHeight(3),
                }}>
                <View
                  style={{
                    marginTop: responsiveWidth(3),
                    height: responsiveWidth(5),
                    flexDirection: 'row',
                    paddingBottom: 0,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    {pay_procediments.map((item: any, index: number) => {
                      return <IconNoDescription key={index} tag={item.method}  />;
                    })}
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    {services.map((item: any, index: number) => {
                      return <IconNoDescription key={index} tag={item.services} />;
                    })}
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        }
      />
    );
  }

  _renderKartak = (item: any, index: number) => (
    <Image
      style={{width: 20, height: 20, resizeMode: 'cover', alignSelf: 'center'}}
      source={{uri: item}}
    />
  );

  render() {
    const mTaberna = instance().taberna;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alingItems: 'center',
        }}>
        <CustomHeader
          title={strings.titleList}
          logo={true}
          menu={true}></CustomHeader>
        <SearchBar
          containerStyle={{backgroundColor: getColors().FONDO_SEARCH}}
          inputContainerStyle={{backgroundColor: getColors().FONDOS}}
          inputStyle={[
            Platform.OS == 'ios' ? stylesIOS.searchBar : stylesAnd.searchBar,
          ]}
          value={mTaberna.filter}
          onChangeText={(text: string) => mTaberna.setFilter(text)}
          placeholder={strings.search}
          onClear={() => {
            Keyboard.dismiss();
            mTaberna.setFilter('');
          }}
          clearIcon></SearchBar>
        <View style={{flex: 1, backgroundColor: getColors().PRIMARY}}>
          {toJS(mTaberna.tabernaList) ? (
            <ScrollView>
              {toJS(mTaberna.tabernaList)
                .filter((item) =>
                  item.name
                    .toLowerCase()
                    .includes(mTaberna.filter.toLowerCase()),
                )
                .map((item: any, index: number) =>
                  this._renderList(item, index),
                )}
            </ScrollView>
          ) : (
            <Text
              style={{
                fontSize: responsiveFontSize(1.5),
                fontWeight: 'bold',
                color: 'gray',
              }}>
              {' No FEstival '}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

const stylesIOS = StyleSheet.create({
  searchBar: {fontSize: responsiveFontSize(1)},
  cardTitle: {
    color: '#dddddd',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  cardSubtitle: {
    color: '#dddddd',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1),
  },
  cardText: {
    color: '#dddddd',
    marginVertical: responsiveHeight(2),
    fontSize: responsiveFontSize(1),
  },
});

const stylesAnd = {
  searchBar: {fontSize: responsiveFontSize(2)},
  cardTitle: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
  },
  cardSubtitle: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  cardText: {
    marginVertical: responsiveHeight(2),
    fontSize: responsiveFontSize(2),
  },
};
