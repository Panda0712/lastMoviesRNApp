import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Container} from '../../components';
import {colors} from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CategoryFilmScreen = ({navigation}: any) => {
  return (
    <Container
      fixed
      title="Danh mục phim"
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }
      style={{backgroundColor: colors.black}}>
      <Text>CategoryFilmScreen</Text>
    </Container>
  );
};

export default CategoryFilmScreen;
