import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
});

const Button = ({
  onPress, children, backgroundColor, fontColor,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonStyle, { backgroundColor }]}
    >
      <Text style={[styles.textStyle, { color: fontColor }]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
