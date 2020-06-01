import {CommonActions} from '@react-navigation/native';
import {DrawerActions, StackActions} from '@react-navigation/routers';
let _container: any;

function setContainer(container: Object) {
  _container = container;
}

function navigate(routeName: string, params?: Object) {
  console.log('navigate');
  _container.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params,
    }),
  );
}

function replace(routeName: string, params?: Object) {
  _container.dispatch(StackActions.replace(routeName, params));
}

function push(routeName: string, params?: Object) {
  _container.dispatch(StackActions.push(routeName, params));
}
function jumpTo(routeName: string, params?: Object) {
  _container.dispatch(StackActions.push(routeName, params));
}

function getCurrentRoute(): Object | null {
  if (!_container || !_container.state.nav) {
    return null;
  }

  return _container.state.nav.routes[_container.state.nav.index] || null;
}

function back() {
  console.log('back');
  _container.dispatch(CommonActions.goBack());
}

function toggle() {
  console.log('TOGGLE');
  _container.dispatch(DrawerActions.toggleDrawer());
}

export default {
  setContainer,
  navigate,
  getCurrentRoute,
  back,
  replace,
  toggle,
  push,
  jumpTo,
};

export const SCREENS = {
  TABERNA_LIST: 'CardScreen',
  TABERNAK_MAP: 'MapScreen',
  TABERNA_DETAIL: 'DetailScreen',
  MENU_GALERY: 'ShowMenu',
  DRAWER: 'Drawer',
  SPLASH_SCREEN: 'Splash',
  TABS_MENU: 'Tabs',
};
