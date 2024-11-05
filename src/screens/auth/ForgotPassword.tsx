/* eslint-disable react-native/no-inline-styles */
import {Button, Input, Row, Section, Space} from '@bsdaoquang/rncomponent';
import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {sizes} from '../../constants/sizes';
import {validateEmail} from '../../utils/helpers';

const ForgotPassword = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Hãy điền thông tin email',
      });
      return;
    }

    setIsLoading(true);
    await auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Toast.show({
          type: 'info',
          text1: 'Thông báo',
          text2: 'Email đã được gửi tới mail của bạn',
        }),
          setEmail('');
      })
      .catch((error: any) => {
        Toast.show({
          type: 'error',
          text1: 'Thông báo',
          text2: 'Hãy điền chính xác email nhé',
        });
        console.log(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container isScroll={false}>
      <View style={{flex: 1, height: '100%'}}>
        <ImageBackground
          source={require('../../assets/images/forget-password-background.jpg')}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
          }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}
          />
          <Section
            styles={{
              position: 'absolute',
              top: 40,
              paddingHorizontal: 8,
              left: 0,
              right: 0,
              zIndex: 100,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SearchScreen')}>
              <Ionicons name="chevron-back" size={36} color={colors.white} />
            </TouchableOpacity>
          </Section>
          <Section styles={{zIndex: 100}}>
            <Row
              justifyContent="center"
              styles={{
                flexDirection: 'column',
                height: sizes.height,
              }}>
              <Image
                source={require('../../assets/images/forget-password.png')}
                width={50}
                height={50}
                style={{width: 200, height: 200}}
              />
              <Space height={16} />
              <Row alignItems="flex-start" styles={{flexDirection: 'column'}}>
                <TextComponent
                  font={fontFamilies.firaSemiBold}
                  color={colors.white}
                  text="Quên mật khẩu"
                />
                <Space height={16} />
                <Input
                  required
                  helpText={
                    !validateEmail(email)
                      ? 'Hãy nhập đúng định dạng email'
                      : 'Hãy nhập email'
                  }
                  inputStyles={{
                    color: colors.black2,
                    fontFamily: fontFamilies.firaRegular,
                  }}
                  placeholderColor={colors.black4}
                  styles={{width: sizes.width - 40}}
                  placeholder="Nhập email để nhận mật khẩu mới"
                  value={email}
                  onChange={setEmail}
                />
                <Space height={8} />
                <Button
                  loading={isLoading}
                  radius={6}
                  textStyleProps={{fontFamily: fontFamilies.firaMedium}}
                  color={colors.blue}
                  styles={{width: sizes.width - 40}}
                  title="Gửi link đổi mật khẩu"
                  onPress={handleForgotPassword}
                />
                <Space height={4} />
                <TextComponent
                  color={colors.white}
                  styles={{textAlign: 'center'}}
                  text="Đảm bảo nhập đúng email để lấy lại mật khẩu bạn nhé"
                />
                <Space height={16} />
                <Row styles={{width: '100%'}} justifyContent="flex-end">
                  <Button
                    radius={6}
                    textStyleProps={{fontFamily: fontFamilies.firaMedium}}
                    color={colors.red}
                    title="Đăng nhập ngay"
                    onPress={() => navigation.navigate('Login')}
                  />
                </Row>
              </Row>
            </Row>
          </Section>
        </ImageBackground>
      </View>
    </Container>
  );
};

export default ForgotPassword;
