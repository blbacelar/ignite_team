import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import theme from '../theme';
import { AppRoutes } from './app.routes';

export function Routes(){

  const COLORS = theme.COLORS;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.GRAY_600}}>
      <NavigationContainer>
        <AppRoutes/>
      </NavigationContainer>
    </View>
  );
}
