import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, Alert, Platform } from 'react-native';
import { observer } from 'mobx-react';
import { instance } from '../../model';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colorsDark, colorsLight } from '../style/colors';

import { imagesDark, imagesLight } from '../assets/images';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import Switch from 'expo-dark-mode-switch';
import strings from '../assets/strings';
import navigatorService from '../../navigation/navigatorService';
import { SCREENS } from '../../navigation/navigatorService';

const { width, height } = Dimensions.get('screen');
const getColors = function () {
    return (instance().config.colors);
}
const getOS = function () {
    return (Platform.OS == 'ios' ? stylesIOS : stylesAnd);
}


@observer
export default class DrawerMenu extends React.Component {
    constructor(props) {
        super(props);
        // instance().config.setColors(colorsDark)
    }

    _changemode(value: boolean) {
        instance().config.setViewModeValue(value ? 1 : 0);
        instance().config.setColors(value ? colorsDark : colorsLight)
        instance().config.setImages(value ? imagesDark : imagesLight)
    }

    async componentDidMount() {
        instance().login.languageEventEmitter.addListener('language', () => this.handleLan());
    }

    handleLan() {
        this.forceUpdate();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: getColors().FONDOS, justifyContent: 'space-between' }}>
                <View style={[styles.container, { backgroundColor: getColors().FONDOS, }]}>
                    <View style={[styles.cabecera]}>
                        <Image style={styles.image} source={instance().config.images.jangou_bertikala} />
                    </View>
                    <View style={{ alignItems: 'center', marginVertical: responsiveHeight(2), width: '80%' }}>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: getColors().TEXTS, width: '100%' }}>
                            <Text style={[{ color: getColors().TEXTS ,textAlign:'center'},getOS().title ]}> {strings.language}</Text>
                        </View>
                        <View style={{ flexDirection: 'row',margin:responsiveWidth(4) }}>
                            <TouchableOpacity onPress={() => instance().login.setLanguageAsync('eu')}>
                                <Text style={[{ color: instance().login.language == 'eu' ? getColors().TEXTS : getColors().SKURA }, getOS().text]}>EU</Text>
                            </TouchableOpacity>
                            <Text style={[{ color: getColors().SKURA }, Platform.OS == 'ios' ? stylesIOS.text : stylesAnd.text]}>|</Text>
                            <TouchableOpacity onPress={() => instance().login.setLanguageAsync('es')}>
                                <Text style={[{ color: instance().login.language == 'es' ? getColors().TEXTS : getColors().SKURA }, getOS().text]}>ES</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginVertical: responsiveHeight(2), width: '80%', }}>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: getColors().TEXTS,width: '100%' }}>
                            <Text style={[{ color: getColors().TEXTS, borderBottomColor: getColors().TEXTS }, getOS().title2]}>{strings.mode}</Text>
                        </View>
                        <Switch style={{ margin: responsiveWidth(5) }} value={instance().config.viewModeValue} onChange={value => this._changemode(value)} />
                    </View>


                </View >
                <View style={{ alignItems: 'center', justifyContent: 'flex-start', margin: 10 }}>
                    <Image style={{ width: '100%', height: '25%', resizeMode: 'contain' }} source={instance().config.images.skura} />
                </View >
            </View >

        )
    }
}

var styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'column'
    },
    cabecera: {
        marginTop: 30,
        width: '80%',
        height: '40%',
        alignItems: 'center',
        flexDirection: 'column', justifyContent: 'space-between'
    },
    image: {
        width: '60%',
        height: '100%',
        resizeMode: 'contain',
    },

});



var stylesIOS = StyleSheet.create({
    title: {
        fontSize: responsiveFontSize(1.5),
        textAlign: 'center',
        width: '100%',
        marginVertical: responsiveHeight(2)
    },
    title2: {
        fontSize: responsiveFontSize(1.5),
        margin: responsiveWidth(2),
       
        marginVertical: responsiveHeight(2)
    },
    text: {
        fontSize: responsiveFontSize(1.5), margin: responsiveWidth(2)
    },
    separation: {
        fontSize: responsiveFontSize(2), margin: responsiveWidth(2.5)
    }
});

var stylesAnd = StyleSheet.create({
    title: {
        fontSize: responsiveFontSize(2.5), textAlign: 'center', marginVertical: responsiveHeight(1), width: '100%'
    },
    title2: {
        fontSize: responsiveFontSize(2.5), margin: responsiveWidth(2), textAlign: 'center', width: '100%', marginVertical: responsiveHeight(2)
    },
    text: {
        fontSize: responsiveFontSize(2.5), margin: responsiveWidth(2)
    },
    separation: {
        fontSize: responsiveFontSize(3), margin: responsiveWidth(2)
    }
});