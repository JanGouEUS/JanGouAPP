import React from 'react';
import {View, Platform} from 'react-native';
import navigatorService from '../../navigation/navigatorService';
import LottieView from 'lottie-react-native';
import {observer} from 'mobx-react';
import DeviceInfo from 'react-native-device-info';
import {SCREENS} from '../../navigation/navigatorService';
import {instance} from '../../model';
import {colors} from '../style/colors';

interface Props {}
interface State {}
@observer
export default class skuraScreen extends React.Component<Props, State> {
  watchID: number | null;
  constructor(props: Props) {
    super(props);
    this.watchID = null;
    this.state = {};
    instance().config.getMode();
    instance().login.getLanguageLogin();
  }

  async componentDidMount() {
    DeviceInfo.getAvailableLocationProviders().then((providers) => {
      console.log('++++++', providers);
      if (Platform.OS == 'ios' && providers.locationServicesEnabled) {
        this._getLoc();
      } else if (Platform.OS == 'android') {
        this._getLoc();
      } else {
        instance().taberna.getTabernak(instance().map.lat, instance().map.lon);
      }
    });
  }
  async _getLoc() {
    let getLocation = await instance().map.getLocation();
    instance().taberna.getTabernak(instance().map.lat, instance().map.lon);
  }

  _onAnimationFinish() {
    if (this.props.route.params && this.props.route.params.id) {
      instance().taberna.setSelectedTaberna(this.props.route.params.id);
      navigatorService.replace(SCREENS.TABERNA_DETAIL);
    } else {
      navigatorService.replace(SCREENS.DRAWER);
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alingItems: 'center',
          backgroundColor: colors.PRINCIPAL,
        }}>
        <LottieView
          source={require('../resources/animations/jangou_dark_animation.json')}
          loop={false}
          autoPlay
          progress={0}
          onAnimationFinish={() => this._onAnimationFinish()}
          speed={1}
        />
      </View>
    );
  }
}
