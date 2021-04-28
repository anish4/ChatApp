import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import {AuthContext} from './AuthProvider';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import Loading from '../components/Loading';

export default function Routes() {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setloading] = useState(true);
  const [Initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (Initializing) setInitializing(false);
    setloading(false);
  };
  useEffect(() => {
    const suscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return suscriber;
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
