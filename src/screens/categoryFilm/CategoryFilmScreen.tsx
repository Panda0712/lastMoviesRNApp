/* eslint-disable react-native/no-inline-styles */
import {Row, Section, Space} from '@bsdaoquang/rncomponent';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {category, countries, flagImages, years} from '../../constants/category';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {sizes} from '../../constants/sizes';

const CategoryFilmScreen = ({navigation}: any) => {
  const renderListHeader = () => (
    <>
      <TextComponent
        styles={{fontFamily: fontFamilies.firaSemiBold}}
        size={sizes.bigTitle}
        color={colors.white}
        text="Phim theo danh mục"
      />
      <Space height={4} />
      <FlatList
        data={category}
        numColumns={2}
        keyExtractor={item => item.text}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CategoryDetails', {
                category: 'danh-sach',
                slug: item.slug,
                text: item.text,
              })
            }>
            <Row
              styles={{
                borderBottomColor: colors.black2,
                borderBottomWidth: 1,
                marginRight: index === category.length - 1 ? 0 : 12,
              }}>
              <Image
                source={require('../../assets/images/clapboard.png')}
                width={50}
                height={50}
                style={{width: 25, height: 25}}
              />
              <Space width={6} />
              <TextComponent
                font={fontFamilies.firaMedium}
                size={sizes.title}
                styles={{
                  paddingVertical: 4,
                }}
                key={index}
                text={item.text}
                color={colors.white}
              />
            </Row>
          </TouchableOpacity>
        )}
      />
      <Space height={16} />

      <TextComponent
        styles={{fontFamily: fontFamilies.firaSemiBold}}
        size={sizes.bigTitle}
        color={colors.white}
        text="Phim theo quốc gia"
      />
      <Space height={4} />
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
        data={countries}
        numColumns={2}
        keyExtractor={item => item.text}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CategoryDetails', {
                category: 'quoc-gia',
                slug: item.slug,
                text: item.text,
              })
            }>
            <Row
              styles={{
                borderBottomColor: colors.black2,
                borderBottomWidth: 1,
                marginRight: index === category.length - 1 ? 0 : 20,
              }}>
              <Image
                source={flagImages[item.imageKey]}
                width={50}
                height={50}
                style={{width: 30, height: 30}}
              />
              <Space width={10} />
              <TextComponent
                font={fontFamilies.firaMedium}
                size={sizes.title}
                styles={{
                  paddingVertical: 4,
                }}
                key={index}
                text={item.text}
                color={colors.white}
              />
            </Row>
          </TouchableOpacity>
        )}
      />

      <Space height={16} />

      <TextComponent
        styles={{fontFamily: fontFamilies.firaSemiBold}}
        size={sizes.bigTitle}
        color={colors.white}
        text="Phim theo năm"
      />
      <Space height={4} />
    </>
  );

  return (
    <Container
      isScroll={false}
      fixed
      title="Danh mục phim"
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }
      style={{backgroundColor: colors.black5}}>
      <Section styles={{marginTop: 10}}>
        <FlatList
          data={years}
          contentContainerStyle={{flexGrow: 1}}
          numColumns={4}
          keyExtractor={item => item}
          ListHeaderComponent={renderListHeader}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CategoryDetails', {
                  category: 'nam-phat-hanh',
                  slug: item,
                  text: item,
                })
              }>
              <Row
                styles={{
                  borderBottomColor: colors.black2,
                  borderBottomWidth: 1,
                  marginRight: index === category.length - 1 ? 0 : 12,
                }}>
                <Image
                  source={require('../../assets/images/schedule.png')}
                  width={50}
                  height={50}
                  style={{width: 30, height: 30}}
                />
                <Space width={6} />
                <TextComponent
                  font={fontFamilies.firaMedium}
                  size={sizes.title}
                  styles={{
                    paddingVertical: 4,
                  }}
                  key={index}
                  text={item}
                  color={colors.white}
                />
              </Row>
            </TouchableOpacity>
          )}
        />
      </Section>
    </Container>
  );
};

export default CategoryFilmScreen;
