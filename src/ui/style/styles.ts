'use strict';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {colors} from './colors';

export const customStyle = StyleSheet.create({
  EXAMPLE_button: {
    width: responsiveWidth(80),
    height: responsiveHeight(6),
    justifyContent: 'center',
    backgroundColor: colors.PRINCIPAL,
    shadowOpacity: 0.8,
    shadowRadius: 4,
    borderRadius: 6,
    alignItems: 'center',
  },
});
