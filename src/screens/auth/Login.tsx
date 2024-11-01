/* eslint-disable react-native/no-inline-styles */
import {Button, Input, Row, Space} from '@bsdaoquang/rncomponent';
import React, {useState} from 'react';
import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
import {Container, TextComponent} from '../../components';
import {sizes} from '../../constants/sizes';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {validateEmail} from '../../utils/helpers';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import {Auth} from '../../utils/handleAuth';

const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Hãy điền chính xác và đầy đủ thông tin',
      });
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      if (user) {
        await Auth.updateProfile(user);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Lỗi đăng nhập! Vui lòng kiểm tra lại thông tin',
      });
      setIsLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {};

  return (
    <Container isScroll={false}>
      <View style={{flex: 1, height: '100%'}}>
        <ImageBackground
          source={require('../../assets/images/login.jpg')}
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
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          />

          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/images/logo.png')}
              width={100}
              height={100}
              style={{width: 300, height: 300}}
            />
            <View style={{width: sizes.width - 40}}>
              <Input
                placeholderColor={colors.black3}
                labelStyleProps={{
                  color: colors.white,
                  fontFamily: fontFamilies.firaMedium,
                }}
                required
                clear
                helpText={
                  !validateEmail(email)
                    ? 'Hãy nhập đúng định dạng email'
                    : 'Hãy nhập email'
                }
                label="Email"
                placeholder="Nhập email"
                value={email}
                onChange={setEmail}
              />
              <Input
                placeholderColor={colors.black3}
                labelStyleProps={{
                  color: colors.white,
                  fontFamily: fontFamilies.firaMedium,
                }}
                password
                required
                helpText="Hãy nhập mật khẩu"
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={setPassword}
              />
              <Space height={12} />
              <Button
                loading={isLoading}
                textStyleProps={{fontFamily: fontFamilies.firaSemiBold}}
                color={colors.red}
                title="Đăng nhập"
                onPress={handleLogin}
              />
            </View>

            <Row justifyContent="flex-end">
              <TextComponent color={colors.white} text="Không có tài khoản?" />
              <Space width={10} />
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <TextComponent
                  styles={{
                    fontFamily: fontFamilies.firaMedium,
                    textDecorationLine: 'underline',
                  }}
                  color={colors.white}
                  text="Đăng ký ngay"
                />
              </TouchableOpacity>
            </Row>

            <Space height={30} />

            <Button
              styles={{width: sizes.width - 40}}
              iconPosition="left"
              icon={<AntDesign name="google" size={24} color={colors.white} />}
              color={colors.google}
              title="Đăng nhập với Google"
              onPress={handleLoginWithGoogle}
            />
          </View>
        </ImageBackground>
      </View>
    </Container>
  );
};

export default Login;
