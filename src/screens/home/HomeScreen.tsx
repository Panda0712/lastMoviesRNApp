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
import Toast from 'react-native-toast-message';
import Carousel from 'react-native-snap-carousel';

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
  const [mentalMovies, setMentalMovies] = useState<Movie[]>([]);
  const [funnyMovies, setFunnyMovies] = useState<Movie[]>([]);
  const [animeMovies, setAnimeMovies] = useState<Movie[]>([]);
  const [magicMovies, setMagicMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [currentItem, setCurrentItem] = useState<Movie>(initialValue);

  const userId = auth().currentUser?.uid;

  const getFavoritesMovies = () => {
    firestore()
      .collection('favorites')
      .doc(userId)
      .onSnapshot(item => {
        const existingFavorites = item.data()?.favorites || [];
        setFavorites(existingFavorites);
      });
  };

  const addFavoriteMovie = async (movieItem: Movie) => {
    if (!userId) return;
    const userRef = firestore().collection('favorites').doc(userId);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      const existingFavorites = userDoc.data()?.favorites || [];
      const specificItem = existingFavorites.filter(
        (item: Movie) => item.name === movieItem.name,
      );
      const updatedFavorites =
        specificItem.length > 0
          ? existingFavorites.filter(
              (item: Movie) => item.name !== movieItem.name,
            )
          : [...existingFavorites, movieItem];
      await userRef.update({favorites: updatedFavorites});
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2:
          specificItem.length > 0
            ? 'Xóa khỏi danh sách thành công'
            : 'Thêm vào danh sách yêu thích thành công',
      });
    } else {
      await userRef.set({
        id: userId,
        favorites: [movieItem],
      });
    }
  };

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

  const getCurrentMentalMovies = async () => {
    const item: any = await getSpecificCategoryMovies('tam-ly');
    setMentalMovies(item);
  };

  const getCurrentFunnyMovies = async () => {
    const item: any = await getSpecificCategoryMovies('phim-hai');
    setFunnyMovies(item);
  };

  const getCurrentAnimeMovies = async () => {
    const item: any = await getSpecificCategoryMovies('hoat-hinh');
    setAnimeMovies(item);
  };

  const getCurrentMagicMovies = async () => {
    const item: any = await getSpecificCategoryMovies('gia-tuong');
    setMagicMovies(item);
  };

  useEffect(() => {
    getMovies();
    getCurrentMoviesHome();
    getCurrentSeriesMovies();
    getCurrentCinemaMovies();
    getCurrentActionMovies();
    getCurrentLoveMovies();
    getCurrentTVShows();
    getCurrentMentalMovies();
    getFavoritesMovies();
    getCurrentFunnyMovies();
    getCurrentAnimeMovies();
    getCurrentMagicMovies();
  }, []);

  return (
    <Container style={{backgroundColor: colors.black}}>
      <Section
        styles={{
          marginTop: 25,
          paddingHorizontal: 8,
          zIndex: 100,
        }}>
        <Row justifyContent="space-between" alignItems="center">
          <Image
            style={{width: 85, height: 100}}
            source={require('../../assets/images/logo.png')}
            width={100}
            height={100}
          />
          <TouchableOpacity
            style={{marginBottom: 20}}
            onPress={() => navigation.navigate('SearchScreen')}>
            <Ionicons name="search-outline" size={30} color={colors.white} />
          </TouchableOpacity>
        </Row>
      </Section>
      <View>
        {streamingMovies.length > 0 && (
          <Carousel
            containerCustomStyle={{position: 'relative'}}
            layout={'default'}
            layoutCardOffset={18}
            loop
            autoplay
            data={streamingMovies}
            renderItem={({item, index}) => (
              <Row
                key={index}
                styles={{
                  width: sizes.width * 0.7,
                  borderRadius: 6,
                  overflow: 'hidden',
                }}>
                <ImageBackground
                  source={{uri: item.poster_url}}
                  width={50}
                  height={50}
                  style={{
                    width: sizes.width * 0.7,
                    height: 380,
                    borderRadius: 6,
                    overflow: 'hidden',
                    shadowColor: colors.black,
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    elevation: 5,
                  }}></ImageBackground>
              </Row>
            )}
            sliderWidth={sizes.width}
            itemWidth={sizes.width * 0.7}
            onSnapToItem={index => setCurrentItem(streamingMovies[index])}
          />
        )}

        <Space height={20} />

        <Row alignItems="flex-end">
          <Row
            styles={{
              height: 80,
              marginBottom: 4,
            }}
            alignItems="center">
            <TouchableOpacity onPress={() => addFavoriteMovie(currentItem)}>
              <Row styles={{flexDirection: 'column', marginBottom: 12}}>
                {favorites.filter(
                  (item: Movie) => item.name === currentItem.name,
                ).length > 0 ? (
                  <Entypo name="check" size={sizes.icon} color={colors.white} />
                ) : (
                  <Entypo name="plus" size={sizes.icon} color={colors.white} />
                )}
                <TextComponent color={colors.white} text="Danh sách" />
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

      <Space height={8} />

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
        <CategoryComponent text="Tâm lý" slug="tam-ly" />
        <Space height={8} />
        <FlatListComponent data={mentalMovies} />
      </Section>

      <Section>
        <CategoryComponent text="Phim hài" slug="phim-hai" />
        <Space height={8} />
        <FlatListComponent data={funnyMovies} />
      </Section>

      <Section>
        <CategoryComponent text="Hoạt hình" slug="hoat-hinh" />
        <Space height={8} />
        <FlatListComponent data={animeMovies} />
      </Section>

      <Section>
        <CategoryComponent text="Giả tưởng" slug="gia-tuong" />
        <Space height={8} />
        <FlatListComponent data={magicMovies} />
      </Section>
    </Container>
  );
};

export default HomeScreen;
