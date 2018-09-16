import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export const HeaderButton = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'center', // Stretch to fill limits of container
    backgroundColor: 'silver',
    borderWidth: 0,
    borderRadius: 5,
    borderColor: '#000',
    marginLeft: 5,
    marginRight:10,
    padding:7,
  },

  textStyle: {
    alignSelf: 'center',
    color: "rgba(92, 99,216, 1)",
    fontSize: 14,
    fontWeight: '600',
  }
};
