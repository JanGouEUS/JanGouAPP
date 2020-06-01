import {fetch_POST, fetch_POST_json} from './utils';
import AsyncStorage from '@react-native-community/async-storage';
import {hosts, endPoints} from './config';
import {PAGINATION} from '../utils/constants';

class Platform {
  private host: string;
  private userCredentials: {email: string; password: string; token: string};
  private userProfile: {
    address: string;
    id: string;
    display_name: string;
    image: string;
    phone: string;
    email: string;
  };

  constructor() {
    this.host = hosts.dev; //CHOOSE BETWEEN PRODUCTION OR DEVELOPMENT SERVER
    this.userCredentials = {email: '', password: '', token: ''};
    this.userProfile = {
      address: '',
      id: '',
      display_name: '',
      image: '',
      phone: '',
      email: '',
    };
  }

  /********** ASYNC STORAGE ***************** */
  async getLanguage() {
    const result = await AsyncStorage.getItem('lang');
    console.log('getLanguage', result);
    return result;
  }

  setLanguage(value: string) {
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem('lang', value)
        .then(() => {
          console.log('setLanguageok saved', value);
          resolve(true);
        })
        .catch(() => reject(false));
    });
  }

  async getViewMode() {
    const result = await AsyncStorage.getItem('viewmode');
    console.log('viewmode', result);
    return result;
  }

  setViewMode(value: number) {
    return new Promise((resolve, reject) => {
      AsyncStorage.setItem('viewmode', value.toString())
        .then(() => {
          console.log('viewmode saved', value);
          resolve(true);
        })
        .catch(() => reject(false));
    });
  }

  //*****API */

  async getTabernak(lat: number, long: number, searchText?: string) {
    console.log('getttt');
    try {
      const response = await fetch_POST_json(
        this.host + endPoints.getTabernak,
        {
          name: searchText ? searchText : '',
          lat: lat,
          lon: long,
          how_many: PAGINATION.GENERAL,
        },
      );
      console.log('responseQQ', response);
      return response;
    } catch (error) {
      console.log('error getTabernak' + error);
      return error;
    }
  }
}

let platform = new Platform();
export default platform;
