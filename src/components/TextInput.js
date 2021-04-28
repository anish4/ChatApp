import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {TextInput as PTextInput} from 'react-native-paper';

const {height, width} = Dimensions.get('window');

const TextInput = ({label,mode, ...rest}) => {
  return (
    <PTextInput
      label={label}
      mode={mode}
      placeholderTextColor="#11283F"
      {...rest}
      style={{...styles.input}}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15,
  },
});

export default TextInput;
