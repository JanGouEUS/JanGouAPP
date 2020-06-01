import {observable, action, computed, toJS} from 'mobx';
import {PAGINATION} from '../utils/constants';

import {getTabernak} from '../dataInterface';

export class Mtaberna {
  @observable _id: string = '';
  @observable _name: string = '';
  @observable _description: string = '';
  @observable _address: string = '';
  @observable _latitude: string = '';
  @observable _longitude: string = '';
  @observable _url: string = '';
  @observable _email: string = '';
  @observable _telephone: string = '';
  @observable _facebook: string = '';
  @observable _twitter: string = '';
  @observable _instagram: string = '';
  @observable _telegram: string = '';
  @observable _imagelink: string = '';
  @observable _logolink: string = '';
  @observable _tabernaList: any = [];
  @observable _selectedTaberna: string = '';
  @observable _error: string = '';
  @observable _selectedIndex: number = 0;
  @observable _filter: string = '';

  private lastLat: number = 0;
  private lastLon: number = 0;

  @action setSelectedTaberna(value: any) {
    this._selectedTaberna = value;
  }

  @computed get selectedTaberna() {
    if (this._selectedTaberna != '')
      return this.tabernaList.filter(
        (i) => i.idtaberna === this._selectedTaberna,
      )[0];
    return null;
  }
  @computed get tabernaList() {
    return this._tabernaList;
  }

  @action setSelectedIndex(value: number) {
    this._selectedIndex = value;
  }
  @computed get selectedIndex() {
    return this._selectedIndex;
  }

  @action setFilter(value: string) {
    if (!this.doWeHaveAllTaberna && value.length > 2) { 
      this.getTabernak(this.lastLat, this.lastLon, value);
    }
    this._filter = value;
  }
  @computed get filter() {
    return this._filter;
  }

  @computed get doWeHaveAllTaberna() {
    return this.tabernaList.length!=0 && this.tabernaList.length < PAGINATION.GENERAL;
  }

  getTabernak(lat: number, long: number, text?: string) {
    console.log('**********getTabernak' + lat + ',' + long);
    this.lastLat = lat;
    this.lastLon = long;
    return getTabernak(lat, long, text).then((response: any) => {
      if (response.status) {
        if (response.status == 500) {
          return false;
        } else if (response.status == 400) {
          return false;
        } else if (response.status == 405) {
          return false;
        }
      } else {
        if (response.length > 0) console.log(toJS(this._tabernaList));
        response.forEach((element: {idtaberna: any}) => {
          let tabernaExists = toJS(this._tabernaList).find(
            (taberna: {idtaberna: any}) =>
              element.idtaberna === taberna.idtaberna,
          );
          if (!tabernaExists) this._tabernaList.push(element);
        });
        return response;
      }
    });
  }
}
