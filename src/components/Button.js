import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export const Button = ({ onPress, children }) => {
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
    alignSelf: 'stretch', // Stretch to fill limits of container
    backgroundColor: "rgba(92, 99,216, 1)",
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },

    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  textStyle: {
    alignSelf: 'center',
    color: 'silver',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  }
};
