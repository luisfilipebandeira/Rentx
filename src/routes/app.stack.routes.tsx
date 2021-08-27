import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {CarDTO} from '../dtos/CarDTO'

export type RootStackParamList = {
  HomeInitial: undefined;
  CarDetails: {car: CarDTO};
  Scheduling: {car: CarDTO};
  SchedulingDetails: {car: CarDTO, dates: string[]};
  Confirmation: {title: string, message: string, nextScreenRoute: string};
  MyCars: undefined;
};

import {Home} from '../screens/Home'
import {CarDetails} from '../screens/CarDetails'
import {Scheduling} from '../screens/Scheduling'
import {SchedulingDetails} from '../screens/SchedulingDetails'
import {Confirmation} from '../screens/Confirmation'
import {MyCars} from '../screens/MyCars'

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppStackRoutes() {
  return (
      <Stack.Navigator 
        initialRouteName="HomeInitial"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen 
          name="HomeInitial" 
          component={Home} 
          options={{
            gestureEnabled: false
          }} />
        <Stack.Screen name="CarDetails" component={CarDetails} />
        <Stack.Screen name="Scheduling" component={Scheduling} />
        <Stack.Screen name="SchedulingDetails" component={SchedulingDetails} />
        <Stack.Screen name="Confirmation" component={Confirmation} />
        <Stack.Screen name="MyCars" component={MyCars} />
      </Stack.Navigator>
  );
}
