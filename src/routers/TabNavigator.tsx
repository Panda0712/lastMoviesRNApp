/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';
import { colors } from '../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';
import { TextComponent } from '../components';
import CategoryNavigator from './CategoryNavigator';
import FavoriteNavigator from './FavoriteNavigator';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIcon: ({ focused, color, size }) => {
          color = focused ? colors.black : colors.black4;
          size = 24;
          let icon = <Entypo name="home" color={color} size={size} />;
          let name = 'Trang chủ';

          if (route.name === 'CategoryTab') {
            icon = <FontAwesome name="film" color={color} size={size} />;
            name = 'Danh mục';
          } else if (route.name === 'ProfileTab') {
            icon = <FontAwesome name="user" color={color} size={size} />;
            name = 'Tài khoản';
          } else if (route.name === 'FavoriteTab') {
            icon = <Ionicons name="heart" color={color} size={size} />;
            name = 'Yêu thích';
          }

          return (
            <View style={{ alignItems: 'center' }}>
              {icon}
              <TextComponent text={name} />
            </View>
          );
        },
      })}>
      <Tab.Screen name="HomeTab" component={HomeNavigator} />
      <Tab.Screen name="CategoryTab" component={CategoryNavigator} />
      <Tab.Screen name="FavoriteTab" component={FavoriteNavigator} />
      <Tab.Screen name="ProfileTab" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
