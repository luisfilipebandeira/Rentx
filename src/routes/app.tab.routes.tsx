import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import HomeSvg from '../assets/home.svg'
import CarSvg from '../assets/car.svg'
import PeopleSvg from '../assets/people.svg'

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  MyCars: undefined;
};

import {Profile} from '../screens/Profile'
import {MyCars} from '../screens/MyCars'

import {AppStackRoutes} from './app.stack.routes'
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator<RootStackParamList>();

export function AppTabRoutes() {
  const theme = useTheme()

  return (
      <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.main,
          tabBarInactiveTintColor: theme.colors.text_detail,
          tabBarShowLabel: false,
          tabBarStyle: {
            paddingVertical: Platform.OS === 'ios' ? 20 : 0,
            height: 78,
            borderStartColor: theme.colors.background_primary
          }
        }}>
        
        <Tab.Screen
          name="Home" 
          component={AppStackRoutes}
          options={{
            tabBarIcon: (({color}) => (
              <HomeSvg width={24} height={24} fill={color} />
            ))
          }}
        />
        <Tab.Screen 
          name="MyCars" 
          component={MyCars}
          options={{
            tabBarIcon: (({color}) => (
              <CarSvg width={24} height={24} fill={color} />
            ))
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={Profile} 
          options={{
            tabBarIcon: (({color}) => (
              <PeopleSvg width={24} height={24} fill={color} />
            ))
          }}  
        />
      </Tab.Navigator>
  );
}
