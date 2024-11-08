/* eslint-disable react-native/no-inline-styles */
import {Row, Section, Space} from '@bsdaoquang/rncomponent';
import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {sizes} from '../../constants/sizes';
import Entypo from 'react-native-vector-icons/Entypo';

const ProfileScreen = ({navigation}: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const user = auth().currentUser;
  const userEmail = user?.email;

  const toggleExaple = () => {
    setIsExpanded(!isExpanded);
  };

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
        {user?.photoURL ? (
          <Row alignItems="center">
            <Row
              styles={{
                position: 'relative',
                borderRadius: 100,
                width: 40,
                height: 40,
                overflow: 'hidden',
              }}>
              <Image
                source={{uri: user.photoURL}}
                width={20}
                height={20}
                style={{width: 40, height: 40}}
              />
            </Row>
            <Space width={12} />
            <TextComponent
              styles={{marginBottom: 3}}
              font={fontFamilies.firaSemiBold}
              size={sizes.bigTitle}
              color={colors.white}
              text={user?.displayName ?? ''}
            />
          </Row>
        ) : (
          <TextComponent
            font={fontFamilies.firaSemiBold}
            size={sizes.bigTitle}
            color={colors.white}
            text={user?.displayName ?? ''}
          />
        )}
      </Row>
      <Space height={30} />
      <Section>
        <Row styles={{flexDirection: 'column'}}>
          <Row
            onPress={toggleExaple}
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
              <TextComponent
                color={colors.white}
                text="Thông tin tài khoản"
                size={sizes.title}
                font={fontFamilies.firaMedium}
              />
            </Row>
            <Entypo
              name="chevron-small-right"
              size={sizes.icon}
              color={colors.grey}
            />
          </Row>
          <Space height={12} />
          {isExpanded && (
            <Section styles={{flexDirection: 'column'}}>
              <Row>
                <Row
                  justifyContent="flex-start"
                  styles={{
                    width: '100%',
                    borderBottomColor: colors.black2,
                    borderWidth: 1,
                    paddingBottom: 8,
                  }}
                  onPress={() => {}}>
                  <AntDesign
                    name="mail"
                    color={colors.white}
                    size={sizes.icon}
                  />
                  <Space width={12} />
                  <TextComponent text={userEmail ?? ''} color={colors.white} />
                </Row>
              </Row>

              {user?.photoURL ? (
                <></>
              ) : (
                <>
                  <Space height={16} />
                  <Row>
                    <Row
                      justifyContent="flex-start"
                      styles={{
                        width: '100%',
                        borderBottomColor: colors.black2,
                        borderWidth: 1,
                        paddingBottom: 8,
                      }}
                      onPress={() => navigation.navigate('PasswordScreen')}>
                      <AntDesign
                        name="lock1"
                        color={colors.white}
                        size={sizes.icon}
                      />
                      <Space width={12} />
                      <TextComponent text="Đổi mật khẩu" color={colors.white} />
                    </Row>
                  </Row>
                </>
              )}
            </Section>
          )}
          <Row
            onPress={() => {
              navigation.navigate('ContactScreen');
            }}
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
              <TextComponent
                color={colors.white}
                text="Góp ý dịch vụ"
                font={fontFamilies.firaMedium}
                size={sizes.title}
              />
            </Row>
            <Entypo
              name="chevron-small-right"
              size={sizes.icon}
              color={colors.grey}
            />
          </Row>

          <Space height={20} />

          <Row
            onPress={() => {
              navigation.navigate('AboutScreen');
            }}
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
              <TextComponent
                color={colors.white}
                text="Giới thiệu"
                font={fontFamilies.firaMedium}
                size={sizes.title}
              />
            </Row>
            <Entypo
              name="chevron-small-right"
              size={sizes.icon}
              color={colors.grey}
            />
          </Row>

          <Space height={20} />

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
              <TextComponent
                color={colors.white}
                text="Đăng xuất"
                font={fontFamilies.firaMedium}
                size={sizes.title}
              />
            </Row>
            <Entypo
              name="chevron-small-right"
              size={sizes.icon}
              color={colors.grey}
            />
          </Row>
        </Row>
      </Section>
    </Container>
  );
};

export default ProfileScreen;
