# JanGouAPP
JanGou APP on react-native. JanGou is an app whose aim is to make easy for restaurants and bar to publish their menus and interesting info digitaly. This repo contains the code for deploying an Android and iOS app, and it is supposed to use the backend published in this repo: [jangou server repo](https://github.com/JanGouEUS/JanGouServer)

## 📋 Requirements
React Native apps may target iOS 10.0 and Android 4.1 (API 16) or newer. You may use Windows, macOS, or Linux as your development operating system, though building and running iOS apps is limited to macOS.
 
## Install
Clone this repo: 
```
git clone https://github.com/JanGouEUS/JanGouServer.git
```

## Deploy
``` yarn install
```
### Android
```react-native run-android`
``
### iOS
``` cd ios
pod install
react-native run-ios
```

## Configure maps with mapbox
In order to use mapbox in the app you need an Mapbox access token. Check here how to do it: [mapbox access token doc](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/)

Then copy you access token in map.jtx file
```
line 68               MapboxGL.setAccessToken('YOUR MAPBOX ACCESS TOKEN');
```






