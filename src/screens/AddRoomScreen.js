import React, {useState} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {IconButton} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import TextInput from '../components/TextInput';
import FormButton from '../components/Button';

export default function AddRoomScreen({navigation}) {
  const [room, setRoom] = useState('');

  const handlePress = () => {
    if (room.length > 2) {
      firestore()
        .collection('ROOMS')
        .add({
          name: room,
          latestMessage: {
            createdAt: new Date().getTime(),
            text: `You joined ${room}!!! Please keep the chat clean.`,
          },
        })
        .then((docsRef) => {
          docsRef.collection('MESSAGES').add({
            text: `You joined ${room}!!! Please keep the chat clean.`,
            createdAt: new Date().getTime(),
            system: 'true',
          });
        })
        .then(() => navigation.navigate('Home'));
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#11283F" barStyle="dark-content" />
      <View style={styles.cross}>
        <IconButton
          icon="window-close"
          size={20}
          color="#fff"
          onPress={() => navigation.goBack()}
          style={styles.icon}
        />
      </View>

      <Text style={styles.text}>
        Create a new room and chat with your friends
      </Text>
      <TextInput
        label="Enter room name"
        mode="flat"
        value={room}
        onChangeText={setRoom}
      />
      <FormButton
        modeValue="contained"
        title="Create room"
        disabled={room.length <= 2}
        onPress={handlePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  cross: {
    position: 'absolute',
    right: 15,
    top: 10,
    backgroundColor: '#11283F',
    borderRadius: 50,
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 5,
  },
  icon: {
    fontWeight: 'bold',
  },
});
