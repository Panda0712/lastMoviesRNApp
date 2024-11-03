/* eslint-disable react-native/no-inline-styles */
import {Input, Row, Section, Space} from '@bsdaoquang/rncomponent';
import React, {useEffect, useState} from 'react';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {sizes} from '../../constants/sizes';
import {fontFamilies} from '../../constants/fontFamilies';
import {Movie} from '../../constants/models';
import {getStreamingMovies} from '../../lib/actions';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SearchScreen = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [guessMovies, setGuessMovies] = useState<Movie[]>([]);

  const handleGetGuestMovies = async () => {
    const items: Movie[] = await getStreamingMovies();
    setGuessMovies(items);
  };

  useEffect(() => {
    handleGetGuestMovies();
  }, []);

  return (
    <Container isScroll={false} style={{backgroundColor: colors.black}}>
      <Section styles={{marginTop: 45}}>
        <Row alignItems="center" justifyContent="space-between">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              style={{marginBottom: 10}}
              name="chevron-back"
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
          <Input
            prefix={
              <AntDesign
                name="search1"
                size={sizes.title}
                color={colors.white}
              />
            }
            clear
            color={colors.black2}
            styles={{width: 300, paddingVertical: 4}}
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Tên phim, show, diễn viên, kênh TV"
          />
        </Row>
      </Section>

      <Section>
        <TextComponent
          font={fontFamilies.firaSemiBold}
          size={sizes.bigTitle}
          color={colors.white}
          text="Gợi ý tìm kiếm"
        />
        <Space height={16} />
        <FlatList
          style={{marginBottom: 160}}
          data={guessMovies}
          keyExtractor={item => item.name}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('MovieDetails', {
                  movie: item,
                })
              }>
              <Row
                justifyContent="space-between"
                styles={{
                  paddingVertical: 12,
                  borderBottomColor: colors.grey,
                  borderBottomWidth: 0.5,
                }}>
                <Row>
                  <Image
                    source={{uri: item.thumb_url}}
                    width={50}
                    height={50}
                    style={{width: 150, height: 80}}
                  />
                  <Space width={12} />
                  <TextComponent
                    styles={{maxWidth: 150}}
                    color={colors.white}
                    text={item.name}
                  />
                </Row>
                <Entypo color={colors.white} name="controller-play" size={24} />
              </Row>
            </TouchableOpacity>
          )}
        />
      </Section>
    </Container>
  );
};

export default SearchScreen;
