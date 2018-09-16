import React from 'react';
import { View,Text, Image} from 'react-native';

const DELISH_IMAGE = require('../images/noDSHD.png')

export const DshdLogoPage = () => {
    return (
      <View style={styles.spinnerStyle}>
      <Image
        source={DELISH_IMAGE}
        style={styles.textStyle}
      />
      </View>
    );

}
const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(92, 99,216, 1)',
  },
  textStyle: {
    alignSelf:'center',
    height:150,
    width:150,

  }
};
