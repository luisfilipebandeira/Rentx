import React from 'react';

import { Routes } from './src/routes';

import { ThemeProvider } from 'styled-components'
import theme from './src/styles/theme';

import { View } from 'react-native';

import {AppProvider} from './src/hooks'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <View style={{flex: 1}}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </View>
    </ThemeProvider>
  );
}
