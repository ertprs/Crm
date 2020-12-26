/* eslint-disable no-nested-ternary */
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Splash from './screens/splash';

import {
  PublicNavigator,
  PrivateNavigator,
} from '../components/lib/appNavigator';

// create screen for signup
// create screen for intro

const Root = () => {
  const User = useSelector((state) => state.User);
  const {isAuthenticated} = User;
  const [isLoading, setLoading] = useState(false);

  return (
    <NavigationContainer>
      {
      // isLoading ? (
      //   <Splash />
      // ) : // check if loggedIn or not
        isAuthenticated ? <PrivateNavigator /> : <PublicNavigator />
      }
    </NavigationContainer>
  );
};

export default Root;
