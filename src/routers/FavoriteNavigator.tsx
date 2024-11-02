import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {FavoriteScreen} from '../screens';

const FavoriteNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
    </Stack.Navigator>
  );
};

export default FavoriteNavigator;
