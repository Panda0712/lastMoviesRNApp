/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Input, Row, Section, Space} from '@bsdaoquang/rncomponent';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {Movie} from '../../constants/models';
import {sizes} from '../../constants/sizes';
import {getSearchMovies, getStreamingMovies} from '../../lib/actions';

const SearchScreen = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [guessMovies, setGuessMovies] = useState<Movie[]>([]);
  const [searchMovies, setSearchMovies] = useState<Movie[]>([]);

  const handleGetGuestMovies = useCallback(async () => {
    const items: Movie[] = await getStreamingMovies();
    setGuessMovies(items);
  }, []);

  const handleGetSearchMovies = useCallback(async (query: string) => {
    const items: Movie[] = await getSearchMovies(query);
    setSearchMovies(items);
  }, []);

  useEffect(() => {
    handleGetGuestMovies();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchMovies([]);
      return;
    }
    handleGetSearchMovies(searchQuery);
  }, [searchQuery]);

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
            inputStyles={{color: colors.white}}
            color={colors.black2}
            styles={{width: 300, paddingVertical: 4}}
            value={searchQuery}
            onChange={setSearchQuery}
            placeholderColor={colors.white}
            placeholder="Tên phim, show, diễn viên, kênh TV"
          />
        </Row>
      </Section>

      <Section>
        {searchMovies.length > 0 ? (
          <>
            <TextComponent
              font={fontFamilies.firaSemiBold}
              size={sizes.bigTitle}
              color={colors.white}
              text="Kết quả tìm kiếm"
            />
            <Space height={20} />
            <FlatList
              key={searchMovies.length > 0 ? 'search' : 'guess'}
              data={searchMovies}
              numColumns={2}
              keyExtractor={item => item.name}
              renderItem={({item, index}) => (
                <Row
                  onPress={() =>
                    navigation.navigate('MovieDetails', {
                      movie: item,
                    })
                  }
                  key={index}
                  styles={{marginHorizontal: 6, marginVertical: 6}}>
                  <Image
                    source={{uri: item.poster_url}}
                    width={50}
                    height={50}
                    style={{width: sizes.width * 0.43, height: 100}}
                  />
                </Row>
              )}
              initialNumToRender={8}
              removeClippedSubviews
            />
          </>
        ) : searchMovies.length === 0 && searchQuery ? (
          <Section>
            <Row
              alignItems="center"
              styles={{flexDirection: 'column', marginTop: 20}}>
              <Image
                source={require('../../assets/images/not-found.png')}
                width={50}
                height={50}
                style={{width: 150, height: 100}}
              />
              <Space height={12} />
              <TextComponent
                size={sizes.bigTitle}
                color={colors.white}
                text="Không tìm thấy kết quả"
              />
            </Row>
          </Section>
        ) : (
          <>
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
                    <Entypo
                      color={colors.white}
                      name="controller-play"
                      size={24}
                    />
                  </Row>
                </TouchableOpacity>
              )}
              initialNumToRender={8}
              removeClippedSubviews
            />
          </>
        )}
      </Section>
    </Container>
  );
};

export default SearchScreen;
