import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../src/navigation/AppNavigator';

const App: React.FC = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);

export default App;