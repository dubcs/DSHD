import React from 'react';
import { View } from 'react-native';

export const Card = props => <View style={styles.containerStyle}>{props.children}</View>;

const styles = {
  containerStyle: {
    borderWidth: 5,
    borderRadius: 2,
    borderColor: 'white',
    backgroundColor:'silver',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  //  marginLeft: ,
  //  marginRight: 5,
  //  marginTop: 5,
  },
};
