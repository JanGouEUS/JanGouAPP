import React, { Component } from 'react';
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  Linking,
  Platform,
  Text,
  ImageBackground,
  Modal,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import Share from 'react-native-share';

import CustomHeader from '../components/customHeader';

import openMap from 'react-native-open-maps';
import { instance } from '../../model';
import { observer } from 'mobx-react';

import MyCarousel from '../components/menuCarousel';
import strings from '../../ui/assets/strings';
import IconDescription from '../components/iconDescription';
import { TouchableOpacity } from 'expo-dark-mode-switch/build/Elements';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

interface Props { }

const getOS = function () {
  return Platform.OS == 'ios' ? stylesIOS : stylesAnd;
};

const shareTaberna = async (tabernaId: string, title: string) => {
  /* const shareOptions = {
    title: 'Share taberna',
    url: ' https://jangou.eus/Splash/taberna?id=' + tabernaId,
    failOnCancel: false,
  }; */
  const url = ' https://jangou.eus/Splash?id=' + tabernaId;
  const icon = instance().config.images.jangou_bertikala;
  const shareOptions = {
    title,
    subject: title,
    message: `${url}`,
    linkMetadata: {
      title: title,
      icon: icon
    }
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
class DetailView extends React.Component<Props> {
  state = {
    modalVisible: false,
  };
  constructor(props: Props) {
    super(props);
    instance().login.languageEventEmitter.addListener('language', () =>
      this.handleLan(),
    );
  }
  setModalVisible = (visible: boolean) => {
    this.setState({ modalVisible: visible });
  };
  handleLan() {
    this.forceUpdate();
  }

  _shareTaberna(tabernaId: string, title: string) {
    shareTaberna(tabernaId, title);
  }

  _onPressCall(tlf: string) {
    const url = Platform.OS === 'ios' ? 'telprompt:' + tlf : 'tel:' + tlf;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url)
            .then((data) => console.log('then', data))
            .catch((err) => {
              throw err;
            });
        }
      })
      .catch((err) => console.log('An error occurred', err));
  }

  _getDescription(bar: any, lang: string) {
    let localizedObject = bar.descriptions.find(
      (desc) => desc.language === lang,
    );
    return localizedObject ? localizedObject.description : '';
  }

  _getTimeTables(bar: any, lang: string) {
    let localizedObject = bar.timetables.find((desc) => desc.language === lang);
    return localizedObject ? localizedObject.timeTable : '';
  }
  _getMoreinfos(bar: any, lang: string) {
    let localizedObject = bar.more_infos.find((desc) => desc.language === lang);
    return localizedObject ? localizedObject.moreInfo : '';
  }
  _renderMoreInfos() {
    const selectedTaberna = instance().taberna.selectedTaberna;
    const colors = instance().config.colors;
    const images = instance().config.images;
    const showModal = this._getMoreinfos(
      selectedTaberna,
      instance().login.language,
    );

    return (
      showModal != '' && (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={modalStyles.centeredView}>
              <View style={modalStyles.modalView}>
                <Icon
                  reverse
                  // containerStyle={[{ marginTop: 0 - responsiveHeight(3) }]}
                  name="exclamation-triangle"
                  type="font-awesome"
                  color={colors.FONDOS}
                  reverseColor={colors.SKURA}
                  size={responsiveFontSize(3)}
                />
                <Text style={[modalStyles.modalText, { fontWeight: 'bold' }]}>
                  {strings.oharrak}
                </Text>
                <ScrollView style={{ maxHeight: responsiveWidth(60) }}>
                  <Text style={modalStyles.modalText}>
                    {this._getMoreinfos(
                      selectedTaberna,
                      instance().login.language,
                    )}
                  </Text>
                </ScrollView>
                <TouchableOpacity
                  style={{
                    ...modalStyles.closeButton,
                    backgroundColor: colors.SKURA,
                  }}
                  onPress={() => {
                    this.setModalVisible(false);
                  }}>
                  <Text style={{ fontSize: responsiveScreenFontSize(2.5) }}>
                    {strings.itxi}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                            <Image
                              style={styles.socialMediaIcons}
                              source={images.warning}
                            />
                          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => this.setModalVisible(true)}>
            <Icon
              reverse
              containerStyle={styles.imageIcons}
              name="exclamation-triangle"
              type="font-awesome"
              color={colors.FONDOS}
              reverseColor={colors.SKURA}
              size={responsiveFontSize(3)}
              onPress={() => this.setModalVisible(true)}
            />
          </TouchableOpacity> */}
        </View>
      )
    );
  }
  render() {
    const selectedTaberna = instance().taberna.selectedTaberna;
    const colors = instance().config.colors;
    const images = instance().config.images;
    let pay_procediments = selectedTaberna.pay_procediments;
    let request_methods=selectedTaberna.request_methods;
    let services = selectedTaberna.services;

    return (
      <View
        style={{
          backgroundColor: colors.PRIMARY,
          height: responsiveHeight(100),
        }}>
        {selectedTaberna && (
          <CustomHeader
            title={selectedTaberna.name}
            backButton={true}></CustomHeader>
        )}

        {selectedTaberna && (
          <ScrollView>
            <View
              style={{
                width: responsiveWidth(100),
                backgroundColor: colors.FONDO_DETAIL,
                alignSelf: 'center',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                paddingBottom: responsiveHeight(5),
              }}>
              <ImageBackground
                source={
                  selectedTaberna.imagelink != null
                    ? { uri: 'https://jangou.eus' + selectedTaberna.imagelink }
                    : instance().config.images.default
                }
                style={{
                  width: responsiveWidth(100),
                  height: responsiveHeight(40),
                  backgroundColor:
                    instance().config.viewModeValue == 1 ? 'white' : 'black',
                  
                }}>
                <View
                  style={{
                    backgroundColor: colors.BELTZA_TRANSPARENTE,
                    width: '100%',
                    height: '100%',
                    paddingHorizontal: responsiveWidth(4),
                    paddingTop: responsiveHeight(2),
                   justifyContent: 'space-between',
                  }}>
                    <View style={{}}>

                  <Text style={getOS().cardTitle}>{selectedTaberna.name}</Text>
                  <Text
                    numberOfLines={3}
                    ellipsizeMode="tail"
                    style={getOS().cardSubtitle}>
                    {selectedTaberna.address}
                  </Text>
                  <Text
                    numberOfLines={3}
                    ellipsizeMode="tail"
                    style={getOS().cardText}>
                    {this._getTimeTables(
                      selectedTaberna,
                      instance().login.language,
                    )}
                  </Text>
                  </View>
               
                  <View
                style={{
                  width: '100%',
                 
                  
                }}>
                <View>
                  <View
                    style={{
                      
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      {selectedTaberna.latitude != null &&
                        selectedTaberna.longitude != null && (
                          <TouchableOpacity onPress={() => this._onPressCall(selectedTaberna.telephone)}>
                            <Image
                              style={styles.socialMediaIcons}
                              source={images.phone}
                            />
                          </TouchableOpacity>
                     
                        )}

                      {selectedTaberna.latitude != null &&
                        selectedTaberna.longitude != null && (
                          <TouchableOpacity onPress={() => openMap({
                            latitude: parseFloat(selectedTaberna.longitude),
                            longitude: parseFloat(selectedTaberna.latitude),
                            travelType: 'walk',
                            provider: 'google',
                            end:
                              selectedTaberna.longitude +
                              ',' +
                              selectedTaberna.latitude,
                          })}>
                          <Image
                            style={styles.socialMediaIcons}
                            source={images.navigate}
                          />
                        </TouchableOpacity>
                    
                        )}
                          <TouchableOpacity onPress={() => this._shareTaberna(
                            selectedTaberna.idtaberna,
                            selectedTaberna.name,
                          )}>
                            <Image
                              style={styles.socialMediaIcons}
                              source={images.share}
                            />
                          </TouchableOpacity>
                      {}
                    </View>
                    {this._renderMoreInfos()}
                  </View>
                </View>
              </View>
                   </View>
              </ImageBackground>
             
              <View style={{ flex: 3, paddingHorizontal: responsiveWidth(4), borderColor: instance().config.colors.SKURA,
                  borderTopWidth: 1, width:'100%'}}>
                <Text
                  numberOfLines={3}
                  ellipsizeMode="tail"
                  style={[{ color: colors.TEXTS }, getOS().text]}>
                  {this._getDescription(
                    selectedTaberna,
                    instance().login.language,
                  )}
                </Text>
              </View>
              <View
                style={{ width: '100%', paddingHorizontal: responsiveWidth(4) }}>
                <View
                  style={{
                    borderColor:
                      instance().config.viewModeValue == 1
                        ? '#dddddd'
                        : '#666666',
                    borderBottomWidth: 1,
                    marginBottom: responsiveWidth(2),
                  }}>
                  <Text
                    style={[
                      {
                        color:
                          instance().config.viewModeValue == 1
                            ? '#dddddd'
                            : '#666666',
                      },
                      getOS().title,
                    ]}>
                    {strings.menu}
                  </Text>
                </View>
                <MyCarousel />
 
 
 
 {/* hasi */}
 <View
                  style={{
                    flexDirection: 'column',
                    paddingBottom: 0,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      borderColor:
                        instance().config.viewModeValue == 1
                          ? '#dddddd'
                          : '#666666',
                      borderBottomWidth: 1,
                      marginBottom: responsiveWidth(2),
                    }}>
                    <Text
                      style={[
                        {
                          color:
                            instance().config.viewModeValue == 1
                              ? '#dddddd'
                              : '#666666',
                        },
                        getOS().title,
                      ]}>
                      {strings.request_method}
                    </Text>
                  </View>
                  {request_methods.map((item: any, index: number) => {
                    // return <Text style={{color:'white'}}>asdfds</Text>;
                    return <IconDescription key={index} tag={item.method} />;
                  })}
                </View>
                {/* bukatu */}




                <View
                  style={{
                    flexDirection: 'column',
                    paddingBottom: 0,
                    justifyContent: 'space-between',
                    marginTop: responsiveWidth(6),
                  }}>
                  <View
                    style={{
                      borderColor:
                        instance().config.viewModeValue == 1
                          ? '#dddddd'
                          : '#666666',
                      borderBottomWidth: 1,
                      marginBottom: responsiveWidth(2),
                    }}>
                    <Text
                      style={[
                        {
                          color:
                            instance().config.viewModeValue == 1
                              ? '#dddddd'
                              : '#666666',
                        },
                        getOS().title,
                      ]}>
                      {strings.paymode}
                    </Text>
                  </View>
                  {pay_procediments.map((item: any, index: number) => {
                    return <IconDescription key={index} tag={item.method} />;
                  })}
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    paddingBottom: 0,
                    justifyContent: 'space-between',
                    marginVertical: responsiveWidth(6),
                  }}>
                  <View
                    style={{
                      borderColor:
                        instance().config.viewModeValue == 1
                          ? '#dddddd'
                          : '#666666',
                      borderBottomWidth: 1,
                      marginBottom: responsiveWidth(2),
                    }}>
                    <Text
                      style={[
                        {
                          color:
                            instance().config.viewModeValue == 1
                              ? '#dddddd'
                              : '#666666',
                        },
                        getOS().title,
                      ]}>
                      {strings.servicemode}
                    </Text>
                  </View>
                  {services.map((item: any, index: number) => {
                    return <IconDescription key={index} tag={item.services} />;
                  })}
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  marginVertical: responsiveHeight(4),
                  justifyContent: 'center',
                  paddingHorizontal: responsiveWidth(2),
                }}>
                {selectedTaberna.instagram && (
                  <TouchableOpacity onPress={() => Linking.openURL(selectedTaberna.instagram).catch((err) => console.error('An error occurred', err))}>
                    <Image
                      style={styles.socialMediaIcons}
                      source={images.instagram}
                    />
                  </TouchableOpacity>
                )}
                {selectedTaberna.facebook && (
                  <TouchableOpacity onPress={() => Linking.openURL(selectedTaberna.facebook).catch((err) => console.error('An error occurred', err))}>
                    <Image
                      style={styles.socialMediaIcons}
                      source={images.facebook}
                    />
                  </TouchableOpacity>
                )}
                {selectedTaberna.twitter && (
                  <TouchableOpacity onPress={() => Linking.openURL(selectedTaberna.twitter).catch((err) => console.error('An error occurred', err))}>
                    <Image
                      style={styles.socialMediaIcons}
                      source={images.twitter}
                    />
                  </TouchableOpacity>
                )}
                {selectedTaberna.whatsapp && (
                  <TouchableOpacity onPress={() => Linking.openURL(selectedTaberna.whatsapp).catch((err) => console.error('An error occurred', err))}>
                    <Image
                      style={styles.socialMediaIcons}
                      source={images.whatsapp}
                    />
                  </TouchableOpacity>
                )}
                {selectedTaberna.telegram && (
                  <TouchableOpacity onPress={() => Linking.openURL(selectedTaberna.telegram).catch((err) => console.error('An error occurred', err))}>
                    <Image
                      style={styles.socialMediaIcons}
                      source={images.telegram}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingHorizontal: responsiveWidth(2),
                }}>
                {selectedTaberna.web && selectedTaberna.web != '' && (
                   <TouchableOpacity onPress={() =>
                    Linking.openURL(selectedTaberna.web).catch((err) =>
                      console.log('An error occurred', err),
                    )
                  }>
                   <Image
                     style={styles.socialMediaIcons}
                     source={images.globe}
                   />
                 </TouchableOpacity>
                
                )}
                {selectedTaberna.email && selectedTaberna.email != '' && (
                   <TouchableOpacity onPress={() =>
                    Linking.openURL(
                      'mailto:' + selectedTaberna.email,
                    ).catch((err) => console.error('An error occurred', err))
                  }>
                   <Image
                     style={styles.socialMediaIcons}
                     source={images.mail}
                   />
                 </TouchableOpacity>
                
                )}
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

export default DetailView;
const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: responsiveWidth(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#000000bb',
  },
  modalView: {
    width: responsiveWidth(100),

    backgroundColor: 'white',
    borderRadius: 20,

    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: '#F194FF',
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: responsiveWidth(5),
    elevation: 2,
    margin: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    margin: 15,
    textAlign: 'center',
  },
});
const styles = StyleSheet.create({
  map: {
    width: responsiveWidth(90),
    height: responsiveHeight(20),
    alignSelf: 'center',
    marginBottom: responsiveHeight(3),
  },
  imageIcons: {
    zIndex: 1,
    alignSelf: 'flex-end',
    backgroundColor: instance().config.colors.SKURA,
    alignContent: 'center',
    marginHorizontal: responsiveWidth(2),
  },
  socialMediaIcons: {
    width: responsiveWidth(12),
    height: responsiveWidth(12),
    margin: responsiveWidth(2),
  },
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
