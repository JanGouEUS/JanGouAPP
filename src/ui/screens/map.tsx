import React from 'react';
import {
  View,
  ImageBackground,
  Platform,
  Alert,
} from 'react-native';
import {observer} from 'mobx-react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {instance} from '../../model';
import MapCarousel from '../components/mapCarousel';
import openMap from 'react-native-open-maps';
import {toJS} from 'mobx';
import IconSkura from '../resources/svg/IconSkura';
import CustomHeader from '../components/customHeader';
import strings from '../../../src/ui/assets/strings';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {TouchableOpacity} from 'expo-dark-mode-switch/build/Elements';
import {PAGINATION} from '../../utils/constants';
import {getDistanceFromLatLonInMeters} from '../../utils/functions';

const animationDuration: number = 2000;
const followZoomLevel: number = 25;
const zoomLevel: number = 15;

const _mapOptions = Object.keys(MapboxGL.StyleURL).map((key: any) => {
  console.log(key);
  return {
    label: key,
    data: MapboxGL.StyleURL[key],
  };
});

type Camera = {
  center: {
    latitude: number;
    longitude: number;
  };
  pitch: number;
  heading: number;
  zoom: number;
};

interface Props {}
interface State {
  styleURL: string;
}

const getColors = function () {
  return instance().config.colors;
};

@observer
export default class Map extends React.Component<Props, State> {
  map: MapboxGL.MapView | null | undefined;
  camera: MapboxGL.Camera | null | undefined;
  onUserMarkerPress: (() => void) | undefined;

  constructor(props: Props) {
    super(props);

    this.state = {
      styleURL: _mapOptions[0].data,
    };
    this.onPressAlertPositiveButton = this.onPressAlertPositiveButton.bind(
      this,
    );
    MapboxGL.setAccessToken('YOUR MAPBOX ACCESS TOKEN');
  }

  handleLan() {
    this.forceUpdate();
  }

  async componentDidMount() {
    MapboxGL.locationManager.start();
    instance().login.languageEventEmitter.addListener('language', () =>
      this.handleLan(),
    );
  }

  onPressAlertPositiveButton(index: number) {
    this._changeCarousel(index);
  }

  _onPointSelected(item: any, index: number) {
    instance().taberna.setSelectedTaberna(item.idtaberna);
    instance().taberna.setSelectedIndex(index);
    instance().map.setLat(parseFloat(item.longitude));
    instance().map.setLon(parseFloat(item.latitude));
    // this.camera.setCamera({
    //  centerCoordinate: [item.latitude, item.longitude],,
    //   zoomLevel: 17,
    //   animationDuration: 1000,
    // });
  }

  _createMarkers(item: any, index: number) {
    return (
      <MapboxGL.PointAnnotation
        key={index + '_' + Date.now()}
        id={index.toString()}
        coordinate={[item.latitude, item.longitude]}
        onSelected={() => this._onPointSelected(item, index)}>
        {instance().taberna.selectedTaberna &&
        instance().taberna.selectedTaberna.idtaberna == item.idtaberna ? (
          <IconSkura name="MarkerSel" height="60" width="60" />
        ) : (
          <IconSkura name="Marker" height="45" width="45" />
        )}
      </MapboxGL.PointAnnotation>
    );
  }

  _onAnimationFinish() {
    openMap({
      latitude: instance().taberna.selectedTaberna.latitude,
      longitude: instance().taberna.selectedTaberna.longitude,
      travelType: 'walk',
      provider: 'google',
      end:
        instance().taberna.selectedTaberna.latitude.toString() +
        ',' +
        instance().taberna.selectedTaberna.longitude.toString(),
    });
  }

  _changeCarousel(index: number) {
    var taberna: any = instance().taberna.tabernaList[index];
    instance().taberna.setSelectedTaberna(taberna.idtaberna);
    this._onPointSelected(taberna, index);
  }

  _isDistanceBetweenPointBiggerThantDistance(
    point1Lat: number,
    point1Lon: number,
    point2Lat: number,
    point2Lon: number,
    distance: number,
  ) {
    return (
      getDistanceFromLatLonInMeters(
        point1Lat,
        point1Lon,
        point2Lat,
        point2Lon,
      ) > distance
    );
  }

  async _regionDidChange() {
    const mTaberna = instance().taberna;
    const mMap = instance().map;
    const center = await this.map.getCenter();
    const zoomOpeningBounds = await this.map.getVisibleBounds();
    console.log('Zoom bounds', zoomOpeningBounds);
    if (
      !mTaberna.doWeHaveAllTaberna &&
      (this._isDistanceBetweenPointBiggerThantDistance(
        center[1],
        center[0],
        mMap.lat,
        mMap.lon,
        mTaberna.tabernaList[mTaberna.tabernaList.length - 1].distance,
      ) ||
        this._isDistanceBetweenPointBiggerThantDistance(
          center[1],
          center[0],
          zoomOpeningBounds[0][1],
          zoomOpeningBounds[0][0],
          mTaberna.tabernaList[mTaberna.tabernaList.length - 1].distance,
        ))
    ) {
      console.log('_regionDidChange significatnnn --> hacer el get!!', center);
      mTaberna.getTabernak(center[1], center[0]);
      mMap.setLat(center[1]);
      mMap.setLon(center[0]);
    }
  }

  async _getUserLocation() {
    instance().taberna.setSelectedTaberna('');
    let getLocation = await instance().map.getLocation();
    if (
      getLocation.error &&
      getLocation.error.code == 1 &&
      Platform.OS == 'ios'
    )
      Alert.alert('Ve a ajustes y activa la localizacion');
    this.camera?.flyTo([instance().map.lon, instance().map.lat], 2000);
  }

  _renderLocationIcon() {
    return (
      <TouchableOpacity
        onPress={() => this._getUserLocation()}
        disabled={instance().map.gettingLocation}
        style={{
          zIndex: 1,
          position: 'absolute',
          backgroundColor:
            instance().config.viewModeValue == 0
              ? 'transparet'
              : getColors().SKURA,
          borderRadius: 25,
          padding: responsiveHeight(1),
          top:
            Platform.OS == 'ios' ? responsiveHeight(15) : responsiveHeight(10),
          left: responsiveHeight(3),
        }}>
        <ImageBackground
          style={{width: 30, height: 30}}
          source={instance().config.images.iconLocation}
        />
      </TouchableOpacity>
    );
  }

  _renderMap() {
    return (
      <MapboxGL.MapView
        ref={(c) => (this.map = c)}
        logoEnabled={false}
        animated
        userTrackingMode={2}
        styleURL={
          instance().config.viewModeValue
            ? MapboxGL.StyleURL.Dark
            : MapboxGL.StyleURL.Light
        }
        style={{flex: 1}}
        onUserLocationUpdate={() => console.log('SE onUserLocationUpdate')}
        onRegionDidChange={() => this._regionDidChange()}
        onPress={() => instance().taberna.setSelectedTaberna('')}>
        <MapboxGL.Camera
          ref={(c) => (this.camera = c)}
          // followZoomLevel={followZoomLevel}
          zoomLevel={zoomLevel}
          animationMode={'flyTo'}
          animationDuration={animationDuration}
          centerCoordinate={[instance().map.lon, instance().map.lat]}
        />
        <MapboxGL.UserLocation onPress={this.onUserMarkerPress} />
        {toJS(instance().taberna.tabernaList).map(
          (item: any, index: number) => {
            return this._createMarkers(item, index);
          },
        )}
      </MapboxGL.MapView>
    );
  }

  _renderCarousel() {
    if (instance().taberna.selectedTaberna)
      return (
        <MapCarousel
          onPressPositiveButton={this.onPressAlertPositiveButton}></MapCarousel>
      );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alingItems: 'center',
          backgroundColor: getColors().PRIMARY,
        }}>
        <CustomHeader
          title={strings.title}
          logo={true}
          menu={true}></CustomHeader>

        {this._renderLocationIcon()}
        {this._renderMap()}
        {this._renderCarousel()}
      </View>
    );
  }
}
