import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Confirmation: {title: string, message: string, nextScreenRoute: string};
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: {user: {name: string, email: string, driverLicense: string}};
};

import {Confirmation} from '../screens/Confirmation'
import {Splash} from '../screens/Splash'
import {SignIn} from '../screens/SignIn'
import {SignUpFirstStep} from '../screens/SignUp/SignUpFirstStep'
import {SignUpSecondStep} from '../screens/SignUp/SignUpSecondStep'

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AuthRoutes() {
  return (
      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUpFirstStep" component={SignUpFirstStep} />
        <Stack.Screen name="SignUpSecondStep" component={SignUpSecondStep} />
        <Stack.Screen name="Confirmation" component={Confirmation} />
      </Stack.Navigator>
  );
}
