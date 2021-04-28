import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import {IconButton} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import {AuthContext} from '../navigation/AuthProvider';
import Loading from '../components/Loading';

export default function RoomScreen({route}) {
  const room = route.params;
  const [messages, setMessages] = useState([]);
  const {user} = useContext(AuthContext);
  const currentUser = user.toJSON();

  useEffect(() => {
    const unsuscribe = firestore()
      .collection('ROOMS')
      .doc(room.id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const message = querySnapshot.docs.map((docSnapshot) => {
          const data = {
            _id: docSnapshot.id,
            text: '',
            createdAt: new Date().getTime(),
            ...docSnapshot.data(),
          };
          if (!docSnapshot.data().system) {
            data.user = {
              ...docSnapshot.data().user,
              name: docSnapshot.data().user.email,
            };
          }

          return data;
        });
        setMessages(message);
      });
    return () => unsuscribe();
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#11283F',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendContainer}>
          <IconButton icon="send-circle" size={35} color="#11283F" />
        </View>
      </Send>
    );
  };

  const scrollDown = () => {
    return (
      <View style={styles.scrollContainer}>
        <IconButton icon="chevron-down" color="#000" size={35} />
      </View>
    );
  };

  // helper method communicating a message
  async function handleSend(newMessage) {
    const text = newMessage[0].text;
    firestore()
      .collection('ROOMS')
      .doc(room.id)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          email: currentUser.email,
        },
      });
    await firestore()
      .collection('ROOMS')
      .doc(room.id)
      .set(
        {
          latestMessage: {
            text: text,
            createdAt: new Date().getTime(),
          },
        },
        {
          merge: true,
        },
      );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessage) => handleSend(newMessage)}
      user={{_id: currentUser.uid, name: currentUser.email}}
      alwaysShowSend
      renderBubble={renderBubble}
      placeholder="Type message here!!"
      renderSend={renderSend}
      keyboardShouldPersistTaps="never"
      scrollToBottom
      scrollToBottomComponent={scrollDown}
      renderLoading={() => <Loading />}
    />
  );
}

const styles = StyleSheet.create({
  sendContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
