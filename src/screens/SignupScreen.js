import React, {useState, useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {IconButton} from 'react-native-paper';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import {AuthContext} from '../navigation/AuthProvider';

export default function SignupScreen({navigation}) {
  const {register} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome </Text>
      <TextInput
        label="Email"
        mode = "outlined"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        label="Password"
        mode = "outlined"
        value={password}
        onChangeText={(pass) => setPassword(pass)}
        secureTextEntry
      />
      <Button
        title="Register"
        modeValue="contained"
        onPress={() => register(email, password)}
      />
      <IconButton
        icon="keyboard-backspace"
        color="#6646ee"
        style={styles.icon}
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#000',
  },
  icon: {
    marginTop: 15,
  },
});
