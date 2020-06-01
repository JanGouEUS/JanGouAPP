import React from 'react';
import {Component} from 'react';

import LottieView from 'lottie-react-native';

import {observer} from 'mobx-react';

export interface Props {
  path: string; //obligatorio
}
@observer
export default class LottieIconStaticList extends Component {
  render() {
    return <LottieView source={this.props.path} loop={false} progress={1} />;
  }
}
