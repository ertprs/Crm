import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Logs, 
  Login,
  Barcode,
  Splash,
  Signup,
  Dashboard,
  Start,
} from '../screens';

import {colors} from '../styles';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const defaultProps = {
  headerStyle: {backgroundColor: colors.primary},
  headerTintColor: colors.light,
  headerTitleStyle: {fontWeight: 'bold'},
};

export const PublicNavigator = () => (
  <Stack.Navigator initialRouteName="Start">
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="Start"
      component={Start}
      options={{
        headerShown: false,
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
  </Stack.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Dashboard">
    <Drawer.Screen name="Dashboard" component={Dashboard} />
    <Drawer.Screen name="Barcode" component={Barcode} />
  </Drawer.Navigator>
);


export const PrivateNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Barcode"
      component={Barcode}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="Splash"
      component={Splash}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="Home"
      component={DrawerNavigator}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="Logs"
      component={Logs}
      options={{
        headerShown: false,
      }}
    />

  </Stack.Navigator>
);

