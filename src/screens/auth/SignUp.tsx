/* eslint-disable react-native/no-inline-styles */
import {Button, Input, Row, Space} from '@bsdaoquang/rncomponent';
import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {sizes} from '../../constants/sizes';
import auth from '@react-native-firebase/auth';
import {Auth} from '../../utils/handleAuth';
import Toast from 'react-native-toast-message';
import {validateEmail} from '../../utils/helpers';

const initialValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUp = ({navigation}: any) => {
  const [signUpForm, setSignUpForm] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (
      !signUpForm.email ||
      !signUpForm.password ||
      !signUpForm.username ||
      !signUpForm.confirmPassword
    ) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Hãy điền chính xác và đầy đủ thông tin',
      });
      return;
    }

    setIsLoading(true);
    try {
      const credentialUser = await auth().createUserWithEmailAndPassword(
        signUpForm.email,
        signUpForm.password,
      );

      const user = credentialUser.user;
      if (user) {
        if (signUpForm.username) {
          await user.updateProfile({
            displayName: signUpForm.username,
          });
        }
        await Auth.createProfile();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {};

  const handleChangeValue = (key: string, value: string) => {
    if (!key || !value) {
      return;
    }

    const items: any = {...signUpForm};
    items[`${key}`] = value;
    setSignUpForm(items);
  };

  return (
    <Container isScroll={false}>
      <View style={{flex: 1, height: '100%'}}>
        <ImageBackground
          source={require('../../assets/images/signup.jpg')}
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

            <ScrollView>
              <View style={{width: sizes.width - 40}}>
                <Input
                  clear
                  placeholderColor={colors.black3}
                  labelStyleProps={{
                    color: colors.white,
                    fontFamily: fontFamilies.firaMedium,
                  }}
                  required
                  helpText="Hãy nhập tên"
                  label="Tên người dùng"
                  placeholder="Nhập tên người dùng"
                  value={signUpForm.username}
                  onChange={val => handleChangeValue('username', val)}
                />
                <Input
                  clear
                  placeholderColor={colors.black3}
                  labelStyleProps={{
                    color: colors.white,
                    fontFamily: fontFamilies.firaMedium,
                  }}
                  required
                  helpText={
                    !validateEmail(signUpForm.email)
                      ? 'Hãy nhập đúng định dạng email'
                      : 'Hãy nhập email'
                  }
                  label="Email"
                  placeholder="Nhập email"
                  value={signUpForm.email}
                  onChange={val => handleChangeValue('email', val)}
                />
                <Input
                  clear
                  placeholderColor={colors.black3}
                  labelStyleProps={{
                    color: colors.white,
                    fontFamily: fontFamilies.firaMedium,
                  }}
                  required
                  password
                  helpText="Hãy nhập mật khẩu"
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu"
                  value={signUpForm.password}
                  onChange={val => handleChangeValue('password', val)}
                />
                <Input
                  clear
                  placeholderColor={colors.black3}
                  labelStyleProps={{
                    color: colors.white,
                    fontFamily: fontFamilies.firaMedium,
                  }}
                  required
                  helpText={
                    signUpForm.password === signUpForm.confirmPassword
                      ? 'Mật khẩu nhập lại chưa đúng'
                      : 'Hãy nhập lại mật khẩu'
                  }
                  password
                  label="Nhập lại mật khẩu"
                  placeholder="Nhập lại mật khẩu"
                  value={signUpForm.confirmPassword}
                  onChange={val => handleChangeValue('confirmPassword', val)}
                />
                <Space height={12} />
                <Button
                  loading={isLoading}
                  textStyleProps={{fontFamily: fontFamilies.firaSemiBold}}
                  color={colors.red}
                  title="Đăng ký"
                  onPress={handleSignUp}
                />
              </View>

              <Row justifyContent="flex-end">
                <TextComponent color={colors.white} text="Đã có tài khoản?" />
                <Space width={10} />
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <TextComponent
                    styles={{
                      fontFamily: fontFamilies.firaMedium,
                      textDecorationLine: 'underline',
                    }}
                    color={colors.white}
                    text="Đăng nhập ngay"
                  />
                </TouchableOpacity>
              </Row>

              <Space height={30} />

              <Button
                styles={{width: sizes.width - 40}}
                iconPosition="left"
                icon={
                  <AntDesign name="google" size={24} color={colors.white} />
                }
                color={colors.google}
                title="Đăng nhập với Google"
                onPress={handleSignInWithGoogle}
              />
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </Container>
  );
};

export default SignUp;
