import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Home} from '../screens/Home'
import {CarDetails} from '../screens/CarDetails'
import {Scheduling} from '../screens/Scheduling'
import {SchedulingDetails} from '../screens/SchedulingDetails'
import {SchedulingComplete} from '../screens/SchedulingComplete'

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  return (
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CarDetails" component={CarDetails} />
        <Stack.Screen name="Scheduling" component={Scheduling} />
        <Stack.Screen name="SchedulingDetails" component={SchedulingDetails} />
        <Stack.Screen name="SchedulingComplete" component={SchedulingComplete} />
      </Stack.Navigator>
  );
}
