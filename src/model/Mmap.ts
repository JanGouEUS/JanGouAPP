import {observable, action, computed, toJS} from 'mobx';
import Geolocation from 'react-native-geolocation-service';
import {Platform, PermissionsAndroid, ToastAndroid, Alert} from 'react-native';

export class Mmap {
  constructor() {}

  @observable _lat: number = 43.311715498458284;
  @observable _lon: number = -1.9006255282977236;
  @observable _latAux: number = 43.311715498458284;
  @observable _lonAux: number = -1.9006255282977236;
  @observable _watchID: number = 0;
  @observable _hasPermission: boolean = false;

  @action setLat(value: number) {
    this._lat = value;
  }

  @computed get lat() {
    return this._lat;
  }

  @action setLon(value: number) {
    this._lon = value;
  }

  @computed get lon() {
    return this._lon;
  }

  @action setWatchID(value: number) {
    this._watchID = value;
  }

  @computed get watchID() {
    return this._watchID;
  }

  hasLocationPermission = async () => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  getLocation = async () => {
    console.log('getLocation');
    const hasLocationPermission = await this.hasLocationPermission();
    return new Promise((resolve, reject) => {
      this._hasPermission = hasLocationPermission;
      if (!hasLocationPermission) resolve(false);
      Geolocation.getCurrentPosition(
        (position) => {
          this._lat = position.coords.latitude;
          this._lon = position.coords.longitude;
          resolve(true);
        },
        (error) => {
          console.log('getLocationerror', error);
          resolve({
            success: false,
            error,
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 50,
          forceRequestLocation: true,
        },
      );
    });
  };
}
