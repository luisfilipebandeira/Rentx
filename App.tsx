import React from 'react';

import { Scheduling } from './src/screens/Scheduling';

import { ThemeProvider } from 'styled-components'
import theme from './src/styles/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Scheduling />
    </ThemeProvider>
  );
}
