import React from 'react';
import { Component } from 'react';
import LottieView from 'lottie-react-native';
import { instance } from '../../model'

import { observer } from 'mobx-react';

import LottieIconStaticList from '../components/lottieIconStaticList'
export interface Props {
  path: string, //obligatorio
  pathSel:string,
  icon: string,//obligatorio
  onAnimationFinish: Function,
}

@observer
export default class LottieIcon extends Component<Props> {

  render() {
    if (this.props.icon == 'list') {

      return (

        instance().tabsIcons.animatingList?
          <LottieView
            ref={animationList => {
              this.animationList = animationList;
            }}
            source={this.props.pathSel}
            loop={false}
            autoPlay
            progress={0}
            onAnimationFinish={() => this.props.onAnimationFinish()}
          />

          :
          <LottieIconStaticList path={instance().tabsIcons.activeTab=='list'?this.props.pathSel:this.props.path}  />
          // <LottieIconStaticList path={this.props.path}  pathSel={this.props.pathSel}/>
      );
    } else {

      return (
        instance().tabsIcons.animatingMap?
        <LottieView
          
          source={this.props.pathSel}
          loop={false}
          autoPlay={true}
          progress={0}
          onAnimationFinish={() => this.props.onAnimationFinish()}
        />
        :
        <LottieIconStaticList path={instance().tabsIcons.activeTab=='map'?this.props.pathSel:this.props.path}  />
        // <LottieIconStaticList path={this.props.path} pathSel={this.props.pathSel}/>
       
      );

    }

  }
}
