/* eslint-disable no-nested-ternary */
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useNetInfo} from "@react-native-community/netinfo";

import Splash from './screens/splash';
import {
  PublicNavigator,
  PrivateNavigator,
} from '../components/lib/appNavigator';

  


const Root = () => {
  const User = useSelector((state) => state.User);
  const {isAuthenticated} = User;
  const [isLoading, setLoading] = useState(false);
  const netInfo = useNetInfo();

  useEffect(()=>{
    checkNetworkStatus();
  })

  const checkNetworkStatus = () => {
    console.log('netinfo', netInfo.isConnected.toString());
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <PrivateNavigator /> : <PublicNavigator />}
    </NavigationContainer>
  );
};

export default Root;
