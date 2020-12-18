import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from '../screens/login';
import Barcode from '../screens/barcode';
import Splash from '../screens/splash';
import Signup from '../screens/signup';
import Dashboard from '../screens/dashboard';

import { colors } from '../styles';



const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const defaultProps = {
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: colors.light,
  headerTitleStyle: { fontWeight: 'bold' }
};





export const PublicNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="Barcode"
      component={Barcode}
      options={{
        headerShown: false
      }}
    />

    <Stack.Screen
      name="Splash"
      component={Splash}
      options={{
        headerShown: false
      }}
    />

    <Stack.Screen
      name="Signup"
      component={Signup}
      options={{
        headerStyle: {
          height: 40, 
        },
      }}
    />

    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        headerShown: false
      }}
    />
  
  </Stack.Navigator>
);

