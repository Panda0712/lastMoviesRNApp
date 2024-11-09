/* eslint-disable react-native/no-inline-styles */
import {Button, Input, Space} from '@bsdaoquang/rncomponent';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {sizes} from '../../constants/sizes';
import {validatePhoneNumber} from '../../utils/helpers';

const ContactScreen = ({navigation}: any) => {
  const [feedback, setFeedback] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!feedback || !phone) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Vui lòng nhập nội dung',
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = {
        phoneNumber: phone,
        feedback,
      };
      await firestore().collection('feedbacks').add(data);
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: 'Gửi phản hồi thành công',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: error.message,
      });
    } finally {
      setIsLoading(false);
    }

    setFeedback('');
    setPhone('');
  };

  return (
    <Container
      fixed
      title="Ý kiến khách hàng"
      back={
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }
      style={{backgroundColor: colors.black5, padding: 16, flex: 1}}>
      <TextComponent
        size={sizes.title}
        font={fontFamilies.firaMedium}
        color={colors.white}
        text="Góp ý dịch vụ"
      />
      <Space height={16} />
      <Input
        labelStyleProps={{color: colors.white, marginBottom: 12}}
        label="Số điện thoại"
        required
        helpText={
          !validatePhoneNumber(phone)
            ? 'Hãy nhập đúng số điện thoại'
            : 'Vui lòng nhập số điện thoại'
        }
        color={colors.black}
        inputStyles={{color: colors.grey}}
        placeholder="Nhập số điện thoại"
        radius={6}
        value={phone}
        onChange={setPhone}
      />
      <Space height={16} />
      <Input
        labelStyleProps={{color: colors.white, marginBottom: 12}}
        label="Nội dung"
        required
        helpText="Vui lòng nhập nội dung"
        styles={[styles.input]}
        radius={2}
        color={colors.black}
        value={feedback}
        textAreal
        inputStyles={{color: colors.grey}}
        placeholder="Nhập ý kiến của bạn"
        placeholderColor={colors.white}
        onChange={setFeedback}
      />
      <TextComponent
        color={colors.white}
        text="Mọi ý kiến đóng góp của bạn sẽ là động lực để chúng tôi tiếp tục duy trì và phát triển dịch vụ tốt hơn ❤️"
      />
      <Space height={24} />
      <Button
        loading={isLoading}
        radius={4}
        textStyleProps={{fontFamily: fontFamilies.firaSemiBold}}
        color={colors.red}
        title="Gửi góp ý"
        onPress={handleSend}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 100,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: colors.white,
    marginBottom: 8,
    width: '100%',
  },
});

export default ContactScreen;
