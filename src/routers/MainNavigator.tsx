import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AboutScreen,
  CategoryDetails,
  CategoryScreen,
  ContactScreen,
  MovieDetails,
  PosterScreen,
  SearchScreen,
  UpdateProfile,
  UpdateSpecificInfor,
  UserScreen,
} from '../screens';
import PasswordReset from '../screens/password/PasswordReset';
import TabNavigator from './TabNavigator';
import NotificationScreen from '../screens/notification/NotificationScreen';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PosterScreen" component={PosterScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
      <Stack.Screen name="ContactScreen" component={ContactScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen name="UserScreen" component={UserScreen} />
      <Stack.Screen name="PasswordScreen" component={PasswordReset} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="UpdateScreen" component={UpdateSpecificInfor} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
