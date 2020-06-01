import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavigatorService from './navigatorService';

import SkuraScreen from '../ui/screens/skuraScreen';
import MapScreen from '../ui/screens/map';
import CardScreen from '../ui/screens/cardList';
import DetailScreen from '../ui/screens/detailView';
import DrawerMenuScreen from '../ui/screens/drawerMenu';

import ShowMenu from '../ui/screens/showMenu';

import LottieIcon from '../ui/components/lottieIcon';
import {instance} from '../model';

import {colors} from '../ui/style/colors';
import {SCREENS} from './navigatorService';

const ListStack = createStackNavigator();
const ListStackNavigator = ({}) => {
  return (
    <ListStack.Navigator headerMode="none">
      <ListStack.Screen name={SCREENS.TABERNA_LIST} component={CardScreen} />
    </ListStack.Navigator>
  );
};

const MapStack = createStackNavigator();
const MapStackNavigator = ({}) => {
  return (
    <MapStack.Navigator headerMode="none">
      <MapStack.Screen name={SCREENS.TABERNAK_MAP} component={MapScreen} />
    </MapStack.Navigator>
  );
};

const DetailStack = createStackNavigator();
const DetailStackNavigator = ({}) => {
  return (
    <DetailStack.Navigator headerMode="none">
      <DetailStack.Screen
        name={SCREENS.TABERNA_DETAIL}
        component={DetailScreen}
      />
      <DetailStack.Screen name={SCREENS.MENU_GALERY} component={ShowMenu} />
    </DetailStack.Navigator>
  );
};

const BottonTab = createBottomTabNavigator();
const BottonTabNavigator = ({}) => {
  return (
    <BottonTab.Navigator
      backBehavior="none"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: 'white',
        style: {
          backgroundColor: colors.PRINCIPAL, // TabBar background
        },
      }}>
      <BottonTab.Screen
        name="Map"
        component={MapStackNavigator}
        options={{
          tabBarIcon: (value: {focused: boolean}) => {
            return (
              <LottieIcon
                pathSel={require('../ui/resources/animations/mapa_dark.json')}
                path={require('../ui/resources/animations/mapa_skura.json')}
                onAnimationFinish={() =>
                  instance().tabsIcons.setAnimatingMap(false)
                }
                icon={'map'}
              />
            );
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (instance().tabsIcons.activeTab != 'map') {
              instance().tabsIcons.setActiveTab('map');
              instance().tabsIcons.setAnimatingMap(true);
            }
          },
        }}
      />

      <BottonTab.Screen
        name="List"
        component={ListStackNavigator}
        options={{
          tabBarIcon: (value: {focused: boolean}) => {
            return (
              <LottieIcon
                pathSel={require('../ui/resources/animations/zerrenda_dark.json')}
                path={require('../ui/resources/animations/zerrenda_skura.json')}
                onAnimationFinish={() =>
                  instance().tabsIcons.setAnimatingList(false)
                }
                icon={'list'}
              />
            );
          },
        }}
        listeners={{
          tabPress: (e) => {
            if (instance().tabsIcons.activeTab != 'list') {
              instance().tabsIcons.setActiveTab('list');
              instance().tabsIcons.setAnimatingList(true);
            }
          },
        }}
      />
    </BottonTab.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const DrawerNavigator = ({}) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerMenuScreen {...props} />}>
      <Drawer.Screen name={SCREENS.TABS_MENU} component={BottonTabNavigator} />
    </Drawer.Navigator>
  );
};
const GeneralStack = createStackNavigator();

export default function App() {
  const linking = {
    prefixes: [ 'https://yourURL/'],
    config: {
      Splash: 'taberna',
    },
  };

  return (
    <NavigationContainer
      linking={linking}
      fallback={SkuraScreen} //Hau erabiltzen da linking-a resolbitzen dan bitartian
      ref={(navigatorRef) => {
        if (navigatorRef) NavigatorService.setContainer(navigatorRef);
      }}>
      <GeneralStack.Navigator initialRouteName="SkuraScreen">
        <GeneralStack.Screen
          name={SCREENS.SPLASH_SCREEN}
          component={SkuraScreen}
          options={{headerShown: false}}
        />
        <GeneralStack.Screen
          name={SCREENS.DRAWER}
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
        <GeneralStack.Screen
          name={SCREENS.TABERNA_DETAIL}
          component={DetailStackNavigator}
          options={{headerShown: false}}
        />
      </GeneralStack.Navigator>
    </NavigationContainer>
  );
}
