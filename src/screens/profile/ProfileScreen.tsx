/* eslint-disable react-native/no-inline-styles */
import {Row, Section, Space} from '@bsdaoquang/rncomponent';
import auth from '@react-native-firebase/auth';
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {sizes} from '../../constants/sizes';
import {fontFamilies} from '../../constants/fontFamilies';

const ProfileScreen = ({navigation}: any) => {
  const user = auth().currentUser;

  return (
    <Container
      fixed
      title="Tài khoản cá nhân"
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }
      style={{backgroundColor: colors.black}}>
      <Row styles={{flexDirection: 'column'}}>
        <Image
          source={require('../../assets/images/logo.png')}
          width={50}
          height={50}
          style={{width: 220, height: 180}}
        />
        <TextComponent
          font={fontFamilies.firaSemiBold}
          size={sizes.bigTitle}
          color={colors.white}
          text={user?.displayName ?? ''}
        />
      </Row>
      <Space height={30} />
      <Section>
        <Row styles={{flexDirection: 'column'}}>
          <Row
            styles={{
              width: '100%',
              paddingVertical: 12,
              borderBottomColor: colors.black2,
              borderBottomWidth: 1,
            }}
            justifyContent="space-between"
            flex={1}>
            <Row>
              <AntDesign name="user" color={colors.grey} size={sizes.icon} />
              <Space width={12} />
              <TextComponent color={colors.white} text="Thông tin tài khoản" />
            </Row>
            <TextComponent size={sizes.icon} color={colors.grey} text=">" />
          </Row>

          <Row
            styles={{
              width: '100%',
              paddingVertical: 12,
              borderBottomColor: colors.black2,
              borderBottomWidth: 1,
            }}
            justifyContent="space-between"
            flex={1}>
            <Row>
              <AntDesign name="hearto" color={colors.grey} size={sizes.icon} />
              <Space width={12} />
              <TextComponent color={colors.white} text="Danh sách yêu thích" />
            </Row>
            <TextComponent size={sizes.icon} color={colors.grey} text=">" />
          </Row>

          <Row
            styles={{
              width: '100%',
              paddingVertical: 12,
              borderBottomColor: colors.black2,
              borderBottomWidth: 1,
            }}
            justifyContent="space-between"
            flex={1}>
            <Row>
              <AntDesign
                name="questioncircleo"
                color={colors.grey}
                size={sizes.icon}
              />
              <Space width={12} />
              <TextComponent color={colors.white} text="Góp ý dịch vụ" />
            </Row>
            <TextComponent size={sizes.icon} color={colors.grey} text=">" />
          </Row>

          <Row
            styles={{
              width: '100%',
              paddingVertical: 12,
              borderBottomColor: colors.black2,
              borderBottomWidth: 1,
            }}
            justifyContent="space-between"
            flex={1}>
            <Row>
              <AntDesign
                name="infocirlceo"
                color={colors.grey}
                size={sizes.icon}
              />
              <Space width={12} />
              <TextComponent color={colors.white} text="Giới thiệu" />
            </Row>
            <TextComponent size={sizes.icon} color={colors.grey} text=">" />
          </Row>

          <Row
            onPress={() => auth().signOut()}
            styles={{
              width: '100%',
              paddingVertical: 12,
              borderBottomColor: colors.black2,
              borderBottomWidth: 1,
            }}
            justifyContent="space-between"
            flex={1}>
            <Row>
              <AntDesign name="logout" color={colors.grey} size={sizes.icon} />
              <Space width={12} />
              <TextComponent color={colors.white} text="Đăng xuất" />
            </Row>
            <TextComponent size={sizes.icon} color={colors.grey} text=">" />
          </Row>
        </Row>
      </Section>
    </Container>
  );
};

export default ProfileScreen;
