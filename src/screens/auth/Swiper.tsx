/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, ImageBackground, StatusBar, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {sizes} from '../../constants/sizes';
import {fontFamilies} from '../../constants/fontFamilies';
import {Button, Row} from '@bsdaoquang/rncomponent';

const SwiperScreen = ({navigation}: any) => {
  return (
    <Container isScroll={false}>
      <StatusBar translucent backgroundColor="transparent" />
      <Swiper>
        <View style={{flex: 1}}>
          <ImageBackground
            source={require('../../assets/images/swiper1.jpg')}
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
                style={{width: 200, height: 200}}
              />
              <TextComponent
                font={fontFamilies.firaSemiBold}
                size={sizes.bigTitle}
                styles={{textAlign: 'center'}}
                color={colors.white}
                text="Chào mừng bạn đến với Flickster - kho tàng phim hiện đại và chất lượng"
              />
            </View>
          </ImageBackground>
        </View>

        <View style={{flex: 1}}>
          <ImageBackground
            source={require('../../assets/images/swiper2.png')}
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
                bottom: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/logo.png')}
                width={100}
                height={100}
                style={{width: 200, height: 200}}
              />
              <TextComponent
                font={fontFamilies.firaSemiBold}
                size={sizes.bigTitle}
                styles={{textAlign: 'center'}}
                color={colors.white}
                text="Đăng nhập ngay để trải nghiệm dịch vụ của chúng tôi"
              />

              <Row
                styles={{
                  flexDirection: 'column',
                  position: 'absolute',
                  bottom: 40,
                }}>
                <Button
                  color={colors.red}
                  textStyleProps={{fontFamily: fontFamilies.firaSemiBold}}
                  styles={{paddingHorizontal: 30, paddingVertical: 8}}
                  title="Đăng nhập"
                  onPress={() => navigation.navigate('Login')}
                />
                <Button
                  color={colors.grey}
                  styles={{paddingHorizontal: 38, paddingVertical: 8}}
                  textStyleProps={{
                    fontFamily: fontFamilies.firaSemiBold,
                    color: colors.black,
                  }}
                  title="Đăng ký"
                  onPress={() => navigation.navigate('SignUp')}
                />
              </Row>
            </View>
          </ImageBackground>
        </View>
      </Swiper>
    </Container>
  );
};

export default SwiperScreen;
