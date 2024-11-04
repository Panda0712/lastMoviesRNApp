/* eslint-disable react-native/no-inline-styles */
import {Button, Row, Section, Space} from '@bsdaoquang/rncomponent';
import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
import Swiper from 'react-native-swiper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import CategoryComponent from '../../components/CategoryComponent';
import FlatListComponent from '../../components/FlatListComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {Movie} from '../../constants/models';
import {sizes} from '../../constants/sizes';
import {
  getCurrentMovies,
  getSpecificCategoryMovies,
  getStreamingMovies,
} from '../../lib/actions';

const HomeScreen = ({navigation}: any) => {
  const [streamingMovies, setStreamingMovies] = useState<Movie[]>([]);
  const [currentMovies, setCurrentMovies] = useState<Movie[]>([]);
  const [seriesMovies, setSeriesMovies] = useState<Movie[]>([]);
  const [cinemaMovies, setCinemaMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [loveMovies, setLoveMovies] = useState<Movie[]>([]);
  const [tvShows, setTVShows] = useState<Movie[]>([]);
  const [sexMovies, setSexMovies] = useState<Movie[]>([]);

  const getMovies = async () => {
    const item: any = await getStreamingMovies();
    setStreamingMovies(item);
  };

  const getCurrentMoviesHome = async () => {
    const item: any = await getCurrentMovies();
    setCurrentMovies(item);
  };

  const getCurrentSeriesMovies = async () => {
    const item: any = await getSpecificCategoryMovies('phim-bo');
    setSeriesMovies(item);
  };

  const getCurrentCinemaMovies = async () => {
    const item: any = await getSpecificCategoryMovies('phim-le');
    setCinemaMovies(item);
  };

  const getCurrentActionMovies = async () => {
    const item: any = await getSpecificCategoryMovies('hanh-dong');
    setActionMovies(item);
  };

  const getCurrentLoveMovies = async () => {
    const item: any = await getSpecificCategoryMovies('tinh-cam');
    setLoveMovies(item);
  };

  const getCurrentTVShows = async () => {
    const item: any = await getSpecificCategoryMovies('tv-shows');
    setTVShows(item);
  };

  const getCurrentSexMovies = async () => {
    const item: any = await getSpecificCategoryMovies('phim-18');
    setSexMovies(item);
  };

  useEffect(() => {
    getMovies();
    getCurrentMoviesHome();
    getCurrentSeriesMovies();
    getCurrentCinemaMovies();
    getCurrentActionMovies();
    getCurrentLoveMovies();
    getCurrentTVShows();
    getCurrentSexMovies();
  }, []);

  return (
    <Container style={{backgroundColor: colors.black}}>
      <Section
        styles={{
          position: 'absolute',
          top: 15,
          paddingHorizontal: 8,
          left: 0,
          right: 0,
          zIndex: 100,
        }}>
        <Row justifyContent="space-between" alignItems="center">
          <Image
            style={{width: 110, height: 110}}
            source={require('../../assets/images/logo.png')}
            width={100}
            height={100}
          />
          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
            <Ionicons name="search" size={36} color={colors.white} />
          </TouchableOpacity>
        </Row>
      </Section>
      <View>
        <Swiper showsPagination={false} style={{height: 380}}>
          {streamingMovies.map((item, index) => (
            <View key={index} style={{width: sizes.width}}>
              <ImageBackground
                source={{uri: item.poster_url}}
                width={50}
                height={50}
                style={{width: '100%', height: 380}}>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                  }}
                />

                <Row styles={{height: '100%'}} alignItems="flex-end">
                  <Row
                    styles={{
                      width: '100%',
                      height: 80,
                      marginBottom: 4,
                    }}
                    alignItems="center">
                    <TouchableOpacity>
                      <Row styles={{flexDirection: 'column', marginBottom: 12}}>
                        <AntDesign
                          name="hearto"
                          size={sizes.icon}
                          color={colors.white}
                        />
                        <TextComponent color={colors.white} text="Yêu thích" />
                      </Row>
                    </TouchableOpacity>
                    <Space width={28} />
                    <Button
                      icon={
                        <Entypo
                          color={colors.black}
                          name="controller-play"
                          size={20}
                        />
                      }
                      radius={6}
                      styles={{paddingVertical: 2, paddingHorizontal: 16}}
                      textStyleProps={{
                        fontFamily: fontFamilies.firaSemiBold,
                        fontSize: sizes.text,
                        marginBottom: 3,
                      }}
                      color={colors.white}
                      title="Xem ngay"
                      onPress={() =>
                        navigation.navigate('MovieDetails', {movie: item})
                      }
                    />
                    <Space width={28} />
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('MovieDetails', {movie: item})
                      }>
                      <Row styles={{flexDirection: 'column', marginBottom: 12}}>
                        <AntDesign
                          name="infocirlceo"
                          size={sizes.icon}
                          color={colors.white}
                        />
                        <TextComponent color={colors.white} text="Chi tiết" />
                      </Row>
                    </TouchableOpacity>
                  </Row>
                </Row>
              </ImageBackground>
            </View>
          ))}
        </Swiper>
      </View>
      <Space height={12} />
      <Section>
        <CategoryComponent text="Phim đang chiếu" slug="phim-dang-chieu" />
        <Space height={8} />
        <FlatListComponent data={currentMovies} />
      </Section>

      <Section>
        <CategoryComponent text="Phim bộ" slug="phim-bo" />
        <Space height={8} />
        <FlatListComponent data={seriesMovies} />
      </Section>

      <Section>
        <CategoryComponent text="Phim lẻ" slug="phim-le" />
        <Space height={8} />
        <FlatListComponent data={cinemaMovies} />
      </Section>

      <Section>
        <CategoryComponent text="Hành động" slug="hanh-dong" />
        <Space height={8} />
        <FlatListComponent data={actionMovies} />
      </Section>

      <Section>
        <CategoryComponent text="Tình cảm" slug="tinh-cam" />
        <Space height={8} />
        <FlatListComponent data={loveMovies} />
      </Section>

      <Section>
        <CategoryComponent text="TV Shows" slug="tv-shows" />
        <Space height={8} />
        <FlatListComponent data={tvShows} />
      </Section>

      <Section>
        <CategoryComponent text="Phim 18+" slug="phim-18" />
        <Space height={8} />
        <FlatListComponent data={sexMovies} />
      </Section>
    </Container>
  );
};

export default HomeScreen;
