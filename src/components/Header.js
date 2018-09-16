
import React from 'react';
import { Text, View } from 'react-native';

// Create a component

const Header = (props) => {
  const { textStyle, viewStyle } = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#73fa79',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  }
};
// Render it to a device.
export default Header;
