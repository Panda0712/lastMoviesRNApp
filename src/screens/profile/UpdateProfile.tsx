import {Text, TouchableOpacity, View} from 'react-native';
import {Container} from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constants/colors';

const UpdateProfile = ({navigation}: any) => {
  return (
    <Container
      fixed
      title="Cập nhật thông tin"
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }
      style={{backgroundColor: colors.black5}}>
      <Text>UpdateProfile</Text>
    </Container>
  );
};

export default UpdateProfile;
