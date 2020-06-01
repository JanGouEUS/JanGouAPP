import React from 'react';
import SvgIcon from 'react-native-svg-icon';
import svgs from './svgs'; // point to your svgs.js wherever that may be
const IconSkura = (props) => <SvgIcon {...props} svgs={svgs} />;
export default IconSkura;