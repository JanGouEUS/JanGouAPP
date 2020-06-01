import {observable, action, computed} from 'mobx';

export class MtabsIcons {
  @observable _animatingList: boolean = false;
  @observable _animatingMap: boolean = false;
  @observable _activeTab: string = 'map';
  @observable _activeSlide: number = 1;

  @action setAnimatingList(value: boolean) {
    this._animatingList = value;
  }

  @computed get animatingList() {
    return this._animatingList;
  }

  @action setAnimatingMap(value: boolean) {
    this._animatingMap = value;
  }

  @computed get animatingMap() {
    return this._animatingMap;
  }

  @action setActiveTab(value: string) {
    this._activeTab = value;
  }
  @computed get activeTab() {
    return this._activeTab;
  }

  @action setActiveSlide(value: number) {
    this._activeSlide = value;
  }
  @computed get activeSlide() {
    return this._activeSlide;
  }
}
