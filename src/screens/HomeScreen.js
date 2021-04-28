import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StatusBar, FlatList, Button} from 'react-native';
import {List, Divider} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import Loading from '../components/Loading';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function HomeScreen({navigation}) {
  const {user, logout} = useContext(AuthContext);
  const [thread, setThread] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('ROOMS')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const allroom = querySnapshot.docs.map((docSnapshot) => {
          return {
            id: docSnapshot.id,
            name: '',
            latestMessage: {
              text: '',
            },
            ...docSnapshot.data(),
          };
        });
        setThread(allroom);
        if (loading) {
          setLoading(false);
        }
      });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="#11283F" />
      <FlatList
        data={thread}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Room', {...item})}>
              <List.Item
                title={item.name}
                description={item.latestMessage.text}
                left={(props) => <List.Icon {...props} icon="account-group" />}
              />
            </TouchableOpacity>
          );
        }}
      />
      <Button title=" logout" onPress={() => logout()} />
    </View>
  );
}
