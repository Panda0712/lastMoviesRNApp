/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {Section} from '@bsdaoquang/rncomponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const AboutScreen = ({navigation}: any) => {
  return (
    <Container
      fixed
      title="Giới thiệu dịch vụ"
      back={
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }
      style={{backgroundColor: colors.black5, padding: 16}}>
      <Section styles={{paddingBottom: 80}}>
        <View style={{alignItems: 'center', paddingBottom: 15}}>
          <Image
            source={require('../../assets/images/logo.png')}
            width={50}
            height={50}
            style={{width: 220, height: 180}}
          />
        </View>

        <TextComponent
          color={colors.white}
          text="Chào mừng bạn đến với ứng dụng xem phim của chúng tôi! Chúng tôi là nhóm sinh viên yêu thích công nghệ và đam mê điện ảnh. Ứng dụng này được phát triển nhằm mang đến cho bạn trải nghiệm xem phim tiện lợi, dễ dàng tiếp cận mọi lúc, mọi nơi. Với thư viện phong phú và tính năng tối ưu, chúng tôi hy vọng sẽ giúp bạn có những giây phút giải trí trọn vẹn. Cảm ơn bạn đã sử dụng ứng dụng của chúng tôi!"
          styles={styless.text}
        />

        <View style={styless.divider} />

        <TextComponent
          text="Liên hệ với chúng tôi:"
          color={colors.white}
          styles={styless.text}
          font={fontFamilies.firaBold}
        />
        <View style={styless.contactRow}>
          <Ionicons
            name="call"
            size={20}
            color={colors.white}
            style={styless.icon}
          />
          <TextComponent
            text="0369332842"
            color={colors.white}
            styles={styless.contactText}
          />
        </View>
        <View style={styless.contactRow}>
          <MaterialCommunityIcons
            name="email"
            size={20}
            color={colors.white}
            style={styless.icon}
          />
          <TextComponent
            text="flickster@gmail.com"
            color={colors.white}
            styles={styless.contactText}
          />
        </View>
        <View style={styless.contactRow}>
          <FontAwesome6
            name="location-dot"
            size={20}
            color={colors.white}
            style={styless.icon}
          />
          <TextComponent
            text="280 An Dương Vương, phường 4, quận 5, TPHCM"
            color={colors.white}
            styles={
              (styless.contactText,
              {
                maxWidth: 320,
              })
            }
          />
        </View>
      </Section>
    </Container>
  );
};

const styless = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'justify',
    fontSize: 16,
    lineHeight: 28,
    fontFamily: 'firaMedium',
    marginHorizontal: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.grey,
    marginVertical: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  icon: {
    marginRight: 8,
  },
  contactText: {
    fontSize: 16,
  },
  link: {
    textDecorationLine: 'underline',
  },
  policyText: {
    fontSize: 16,
    color: colors.white,
    marginHorizontal: 8,
  },
});

export default AboutScreen;
