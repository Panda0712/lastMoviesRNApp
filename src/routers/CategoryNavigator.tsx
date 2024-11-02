import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {CategoryFilmScreen} from '../screens';

const CategoryNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CategoryFilmScreen" component={CategoryFilmScreen} />
    </Stack.Navigator>
  );
};

export default CategoryNavigator;
