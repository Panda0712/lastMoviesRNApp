/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';
import {colors} from '../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View} from 'react-native';
import {TextComponent} from '../components';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIcon: ({focused, color, size}) => {
          color = focused ? colors.black : colors.black4;
          size = 24;
          let icon = <Entypo name="home" color={color} size={size} />;
          let name = 'Trang chủ';

          if (route.name === 'CartTab') {
            icon = <Ionicons name="cart" color={color} size={size} />;
            name = 'Giỏ hàng';
          } else if (route.name === 'ProfileTab') {
            icon = <FontAwesome name="user" color={color} size={size} />;
            name = 'Tài khoản';
          } else if (route.name === 'FoodTab') {
            icon = <Ionicons name="fast-food" color={color} size={size} />;
            name = 'Thực đơn';
          }

          return (
            <View style={{alignItems: 'center'}}>
              {icon}
              <TextComponent text={name} />
            </View>
          );
        },
      })}>
      <Tab.Screen name="HomeTab" component={HomeNavigator} />
      <Tab.Screen name="ProfileTab" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
