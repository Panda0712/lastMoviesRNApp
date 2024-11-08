/* eslint-disable react-native/no-inline-styles */
import {Button, Row, Section, Space} from '@bsdaoquang/rncomponent';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
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
import {handleLike} from '../../screens/favorite/FavoriteScreen';

const initialValue = {
  name: '',
  slug: '',
  original_name: '',
  thumb_url: '',
  poster_url: '',
  created: '',
  modified: '',
  description: '',
  total_episodes: 0,
  current_episode: '',
  time: '',
  quality: '',
  language: '',
  director: '',
  casts: '',
};

const HomeScreen = ({navigation}: any) => {
  const [streamingMovies, setStreamingMovies] = useState<Movie[]>([]);
  const [currentMovies, setCurrentMovies] = useState<Movie[]>([]);
  const [seriesMovies, setSeriesMovies] = useState<Movie[]>([]);
  const [cinemaMovies, setCinemaMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [loveMovies, setLoveMovies] = useState<Movie[]>([]);
  const [tvShows, setTVShows] = useState<Movie[]>([]);
  const [sexMovies, setSexMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<{[key: string]: boolean}>({});
  const [currentItem, setCurrentItem] = useState<Movie>(initialValue);

  const userId = auth().currentUser?.uid;

  const getMovies = async () => {
    const item: any = await getStreamingMovies();
    setStreamingMovies(item);
    setCurrentItem(item[0]);
  };

  const getCurrentMoviesHome = async () => {
    try {
      const item: any = await getCurrentMovies();
      setCurrentMovies(item);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFavorites = async (userId: string | undefined) => {
    if (!userId) return;
    const userRef = firestore().collection('favorites').doc(userId);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      const existingFavorites = userDoc.data()?.favorites || [];
      const favoriteMap: {[key: string]: boolean} = {};
      existingFavorites.forEach((movie: any) => {
        favoriteMap[movie.name] = true;
      });
      setFavorites(favoriteMap);
    }
  };

  const toggleFavoriteMovie = async (
    userId: string | undefined,
    name: string,
    slug: string,
    original_name: string,
    thumb_url: string,
    poster_url: string,
    created: string,
    modified: string,
    description: string,
    total_episodes: number,
    current_episode: string,
    time: string,
    quality: string,
    language: string,
    director: string,
    casts: string,
  ) => {
    try {
      const userRef = firestore().collection('favorites').doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        await userRef.set({favorites: []});
      }

      const existingFavorites = userDoc.data()?.favorites || [];
      const isMovieExists = existingFavorites.some(
        (movie: any) => movie.name === name,
      );

      const newFavorite = {
        name: name,
        slug: slug,
        original_name: original_name,
        thumb_url: thumb_url,
        poster_url: poster_url,
        created: created,
        modified: modified,
        description: description,
        total_episodes: total_episodes,
        current_episode: current_episode,
        time: time,
        quality: quality,
        language: language,
        director: director,
        casts: casts,
      };

      if (isMovieExists) {
        await userRef.update({
          favorites: firestore.FieldValue.arrayRemove(newFavorite),
        });
        setFavorites(prev => ({...prev, [name]: false}));
      } else {
        await userRef.update({
          favorites: firestore.FieldValue.arrayUnion({...newFavorite}),
        });
        setFavorites(prev => ({...prev, [name]: true}));
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function getCurrentSeriesMovies() {
    const item: any = await getSpecificCategoryMovies('phim-bo');
    setSeriesMovies(item);
  }

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
    fetchFavorites(userId);
  }, []);

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
          top: 20,
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
      <View style={{height: 450}}>
        {streamingMovies.length > 0 && (
          <Swiper
            onIndexChanged={index => {
              setCurrentItem(streamingMovies[index]);
            }}
            showsPagination={false}
            autoplay
            style={{height: 380}}>
            {streamingMovies.map((item, index) => (
              <Row
                key={index}
                styles={{
                  width: sizes.width,
                  borderRadius: 20,
                  overflow: 'hidden',
                }}>
                <ImageBackground
                  source={{uri: item.poster_url}}
                  width={50}
                  height={50}
                  style={{
                    width: '100%',
                    height: 380,
                    borderRadius: 20,
                    overflow: 'hidden',
                    shadowColor: colors.black,
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    elevation: 5,
                  }}>
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
                </ImageBackground>
              </Row>
            ))}
          </Swiper>
        )}

        <Space height={20} />

        <Row alignItems="flex-end">
          <Row
            styles={{
              height: 80,
              marginBottom: 4,
            }}
            alignItems="center">
            <TouchableOpacity
              onPress={() => {
                toggleFavoriteMovie(
                  userId,
                  currentItem.name,
                  currentItem.slug,
                  currentItem.original_name,
                  currentItem.thumb_url,
                  currentItem.poster_url,
                  currentItem.created,
                  currentItem.modified,
                  currentItem.description,
                  currentItem.total_episodes,
                  currentItem.current_episode,
                  currentItem.time,
                  currentItem.quality,
                  currentItem.language,
                  currentItem.director,
                  currentItem.casts,
                );
                handleLike(currentItem.name, userId);
              }}>
              <Row styles={{flexDirection: 'column', marginBottom: 12}}>
                <AntDesign
                  name="heart"
                  size={sizes.icon}
                  color={
                    favorites[currentItem.name] ? colors.red : colors.white
                  }
                />
                <TextComponent color={colors.white} text="Yêu thích" />
              </Row>
            </TouchableOpacity>
            <Space width={28} />
            <Button
              icon={
                <Entypo color={colors.black} name="controller-play" size={20} />
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
                navigation.navigate('MovieDetails', {movie: currentItem})
              }
            />
            <Space width={28} />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MovieDetails', {movie: currentItem})
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
      </View>

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
