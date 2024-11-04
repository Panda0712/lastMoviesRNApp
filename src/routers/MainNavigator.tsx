import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TabNavigator from './TabNavigator';
import {
  AboutScreen,
  CategoryDetails,
  CategoryScreen,
  ContactScreen,
  MovieDetails,
  SearchScreen,
  UserScreen,
} from '../screens';
import PasswordReset from '../screens/password/PasswordReset';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
      <Stack.Screen name="ContactScreen" component={ContactScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="UserScreen" component={UserScreen} />
      <Stack.Screen name="PasswordScreen" component={PasswordReset} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
