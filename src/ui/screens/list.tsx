
import React from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';

import navigatorService from '../../navigation/navigatorService';

import { observer } from 'mobx-react';
import * as Animatable from 'react-native-animatable';
import { responsiveWidth,responsiveFontSize} from 'react-native-responsive-dimensions';
interface Props {
}
interface State {
}

@observer
export default class List extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
    }



    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alingItems: 'center',backgroundColor:'black' }}>
                <Animatable.View
                    animation={'zoomInDown'}
                    easing="ease-out"
                    delay={0}
                    style={{
                        alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row',
                    }}
                >
                    <Image style={{ width: responsiveWidth(80),resizeMode: 'contain', alignSelf: 'center' }} source={require("../resources/images/skura_txuria.png")} />
                </Animatable.View>
                <Animatable.View
                    animation={'bounceInDown'}
                    easing="ease-out"
                    delay={500}
                    style={{
                        alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row',
                    }}
                >
                    <Text style={{color:'#b5bd2c',fontSize:responsiveFontSize(3),fontWeight:'bold'}}>LIST</Text>
                </Animatable.View>

            </View>
        )
    }
}




