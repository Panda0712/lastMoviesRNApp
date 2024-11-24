import {Button, Row, Section, Space} from '@bsdaoquang/rncomponent';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container} from '../../components';
import Input from '../../components/InputComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {sizes} from '../../constants/sizes';
import {validatePhoneNumber} from '../../utils/helpers';

const UpdateSpecificInfor = ({navigation, route}: any) => {
  const [data, setData] = useState('');

  const {infor, title, userId, userData}: any = route.params;

  const handleUpdate = async () => {
    if (!data) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Vui lòng nhập dữ liệu',
      });
    }

    try {
      await firestore()
        .collection('users')
        .doc(userId)
        .update({[infor]: data});

      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: `Cập nhật ${title} thành công`,
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Cập nhật thất bại',
      });
    }
  };

  return (
    <Container
      fixed
      title={`Cập nhật ${title}`}
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }
      style={{backgroundColor: colors.black5}}>
      <Section styles={{marginTop: 20}}>
        <Row styles={{flexDirection: 'column'}}>
          <Input
            placeholder={userData[infor] ?? `Nhập ${title}`}
            color={colors.black5}
            value={data}
            onChange={setData}
            required
            helpText={
              infor === 'phoneNumber' && !validatePhoneNumber(data)
                ? 'Hãy nhập đúng số điện thoại'
                : `Vui lòng nhập ${title}`
            }
            inputStyles={{color: colors.white}}
            styles={{width: sizes.width}}
          />
          <Space height={4} />
          <Button
            onPress={handleUpdate}
            color={colors.red}
            textStyleProps={{
              fontFamily: fontFamilies.firaSemiBold,
              fontSize: sizes.title,
            }}
            title="Cập nhật"
            styles={{width: sizes.width}}
          />
        </Row>
      </Section>
    </Container>
  );
};

export default UpdateSpecificInfor;
