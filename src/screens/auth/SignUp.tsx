/* eslint-disable react-native/no-inline-styles */
import {Button, Row, Space} from '@bsdaoquang/rncomponent';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Container, TextComponent} from '../../components';
import Input from '../../components/InputComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {sizes} from '../../constants/sizes';
import {Auth} from '../../utils/handleAuth';
import {validateEmail} from '../../utils/helpers';

const SignUp = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !username || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Hãy điền chính xác và đầy đủ thông tin',
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Mật khẩu nhập lại chưa chính xác',
      });
      return;
    }

    setIsLoading(true);
    try {
      const credentialUser = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const user = credentialUser.user;
      if (user) {
        if (username) {
          await user.updateProfile({
            displayName: username,
          });
        }
        await Auth.createProfile();
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Mail đã được sử dụng! Vui lòng thử lại!',
      });
      setIsLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo?.data?.idToken;

      if (!idToken) {
        throw new Error('Failed to get idToken from Google Sign-in');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(googleCredential);
    } catch (error: any) {
      console.log(error.message);
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Lỗi đăng nhập với Google! Vui lòng thử lại',
      });
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '245540911377-2dhjjqp3utoe1naqns0s7dlrmoph9ncv.apps.googleusercontent.com',
    });
  }, []);

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
                  value={username}
                  onChange={setUsername}
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
                  value={password}
                  onChange={setPassword}
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
                    password !== confirmPassword
                      ? 'Mật khẩu nhập lại chưa đúng'
                      : 'Hãy nhập lại mật khẩu'
                  }
                  password
                  label="Nhập lại mật khẩu"
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
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
