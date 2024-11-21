import {Row, Section, Space} from '@bsdaoquang/rncomponent';
import auth from '@react-native-firebase/auth';
import {Touchable, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {sizes} from '../../constants/sizes';
import {useEffect} from 'react';

interface UserProps {
  displayName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber?: string;
  gender?: string;
  birthday?: string;
}

const UpdateProfile = ({navigation}: any) => {
  const user: any = auth().currentUser;

  useEffect(() => {});

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
      <Section styles={{paddingVertical: 4, marginTop: 12}}>
        <TextComponent
          styles={{
            borderBottomWidth: 1,
            borderBottomColor: colors.black4,
            paddingBottom: 8,
          }}
          text="Thông tin tài khoản"
          color={colors.grey2}
          size={sizes.bigTitle}
        />
        <Space height={16} />
        <Row styles={{flexDirection: 'column'}}>
          <Row styles={{width: '100%'}} justifyContent="space-between">
            <Row>
              <MaterialIcons
                name="drive-file-rename-outline"
                size={sizes.icon}
                color={colors.white}
              />
              <Space width={8} />
              <TextComponent
                text="Tên người dùng"
                size={sizes.bigTitle}
                color={colors.white}
              />
            </Row>
            <TextComponent
              text={user?.displayName ?? ''}
              color={colors.white}
              size={sizes.bigTitle}
            />
          </Row>

          <Space height={12} />

          <Row styles={{width: '100%'}} justifyContent="space-between">
            <Row>
              <MaterialCommunityIcons
                name="email"
                size={sizes.icon}
                color={colors.white}
              />
              <Space width={8} />
              <TextComponent
                text="Email"
                size={sizes.bigTitle}
                color={colors.white}
              />
            </Row>
            <TextComponent
              text={user?.email ?? ''}
              color={colors.white}
              size={sizes.bigTitle}
            />
          </Row>

          <Space height={12} />

          <Row styles={{width: '100%'}} justifyContent="space-between">
            <Row>
              <MaterialIcons
                name="password"
                size={sizes.icon}
                color={colors.white}
              />
              <Space width={8} />
              <TextComponent
                text="Mật khẩu"
                size={sizes.bigTitle}
                color={colors.white}
              />
            </Row>
            <TouchableOpacity>
              <Row>
                <TextComponent
                  text="Cập nhật"
                  color={colors.yellow3}
                  size={sizes.bigTitle}
                />
                <Space width={4} />
                <Entypo
                  name="chevron-right"
                  size={sizes.icon}
                  color={colors.yellow3}
                />
              </Row>
            </TouchableOpacity>
          </Row>

          <Space height={12} />

          <Row styles={{width: '100%'}} justifyContent="space-between">
            <Row>
              <FontAwesome
                name="phone"
                size={sizes.icon}
                color={colors.white}
              />
              <Space width={8} />
              <TextComponent
                text="Số điện thoại"
                size={sizes.bigTitle}
                color={colors.white}
              />
            </Row>
            <TouchableOpacity>
              <Row>
                <TextComponent
                  text={user?.phoneNumber ?? 'Cập nhật'}
                  color={user?.phoneNumber ? colors.white : colors.yellow3}
                  size={sizes.bigTitle}
                />
                <Space width={4} />
                <Entypo
                  name="chevron-right"
                  size={sizes.icon}
                  color={colors.yellow3}
                />
              </Row>
            </TouchableOpacity>
          </Row>

          <Space height={12} />

          <Row styles={{width: '100%'}} justifyContent="space-between">
            <Row>
              <MaterialCommunityIcons
                name="gender-male-female"
                size={sizes.icon}
                color={colors.white}
              />
              <Space width={8} />
              <TextComponent
                text="Giới tính"
                size={sizes.bigTitle}
                color={colors.white}
              />
            </Row>
            <TouchableOpacity>
              <Row>
                <TextComponent
                  text={user?.gender ?? 'Cập nhật'}
                  color={user?.gender ? colors.white : colors.yellow3}
                  size={sizes.bigTitle}
                />
                <Space width={4} />
                <Entypo
                  name="chevron-right"
                  size={sizes.icon}
                  color={colors.yellow3}
                />
              </Row>
            </TouchableOpacity>
          </Row>

          <Space height={12} />

          <Row styles={{width: '100%'}} justifyContent="space-between">
            <Row>
              <FontAwesome
                name="birthday-cake"
                size={sizes.icon}
                color={colors.white}
              />
              <Space width={8} />
              <TextComponent
                text="Ngày sinh"
                size={sizes.bigTitle}
                color={colors.white}
              />
            </Row>
            <TouchableOpacity>
              <Row>
                <TextComponent
                  text={user?.birthday ?? 'Cập nhật'}
                  color={user?.birthday ? colors.white : colors.yellow3}
                  size={sizes.bigTitle}
                />
                <Space width={4} />
                <Entypo
                  name="chevron-right"
                  size={sizes.icon}
                  color={colors.yellow3}
                />
              </Row>
            </TouchableOpacity>
          </Row>
        </Row>
      </Section>

      <Space height={16} />

      <Section styles={{paddingVertical: 4}}>
        <TextComponent
          styles={{
            borderBottomWidth: 1,
            borderBottomColor: colors.black4,
            paddingBottom: 8,
          }}
          text="Tài khoản liên kết"
          color={colors.grey2}
          size={sizes.bigTitle}
        />
        <Space height={16} />
        <Row styles={{flexDirection: 'column'}}>
          <Row styles={{width: '100%'}} justifyContent="space-between">
            <Row>
              <FontAwesome
                name="google-plus-official"
                size={sizes.icon}
                color={colors.googleRed}
              />
              <Space width={8} />
              <TextComponent
                text="Google"
                size={sizes.bigTitle}
                color={colors.white}
              />
            </Row>
            <TextComponent
              text={user?.emailVerified ? 'Đã liên kết' : 'Chưa liên kết'}
              color={colors.white}
              size={sizes.bigTitle}
            />
          </Row>
        </Row>
      </Section>
    </Container>
  );
};

export default UpdateProfile;
