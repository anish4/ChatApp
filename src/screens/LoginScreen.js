import React, {useState, useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import {AuthContext} from '../navigation/AuthProvider';

export default function LoginScreen({navigation}) {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome Back</Text>
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
        title="Login"
        modeValue="contained"
        onPress={() => login(email, password)}
      />
      <Button
        title="New user? Join here"
        modeValue="text"
        uppercase={false}
        onPress={() => navigation.navigate('Signup')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#000',
  },
});
