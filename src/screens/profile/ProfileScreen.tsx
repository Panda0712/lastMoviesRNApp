import {View, Text} from 'react-native';
import React from 'react';
import {Button} from '@bsdaoquang/rncomponent';
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title="Sign out" onPress={() => auth().signOut()} />
    </View>
  );
};

export default ProfileScreen;
