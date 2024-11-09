/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextComponent} from '../components';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';
import {sizes} from '../constants/sizes';
import CategoryNavigator from './CategoryNavigator';
import FavoriteNavigator from './FavoriteNavigator';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.black5,
          height: 70,
          justifyContent: 'center',
          borderColor: colors.black,
          alignItems: 'center',
        },
        tabBarIcon: ({focused, color, size}) => {
          color = focused ? colors.grey : colors.grey4;
          size = 22;
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
            <View style={{alignItems: 'center'}}>
              {icon}
              <TextComponent
                color={colors.white}
                font={fontFamilies.firaRegular}
                size={sizes.desc}
                text={name}
              />
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
