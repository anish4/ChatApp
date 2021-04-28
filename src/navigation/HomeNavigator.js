import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {IconButton} from 'react-native-paper'

import HomeScreen from '../screens/HomeScreen';
import AddRoomScreen from '../screens/AddRoomScreen'
import RoomScreen from '../screens/RoomScreen';

const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();

const ChatApp = ()=>{
  return(
    <ChatAppStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#11283F',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: '500',
      },
      headerTitleAlign:'center'
    }}>
      <ChatAppStack.Screen name="Home" component={HomeScreen} options={({navigation})=>(
        {headerRight:()=>(<IconButton icon='account-multiple-plus' size={24} color='#fff' onPress={()=>navigation.navigate('AddRoom')}/>)}
      )}/>
      <ChatAppStack.Screen name = 'Room' component={RoomScreen} options={({route})=>({title:route.params.name})}/>
    </ChatAppStack.Navigator>
  )
}

export default function HomeNavigator() {
  return (
    <ModalStack.Navigator  headerMode='none'>
      <ModalStack.Screen name="ChatApp" component={ChatApp}/>
      <ModalStack.Screen name="AddRoom" component={AddRoomScreen}/>
    </ModalStack.Navigator>
  )
}
