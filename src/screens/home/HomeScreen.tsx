/* eslint-disable react-native/no-inline-styles */
import {Button, Row, Section, Space} from '@bsdaoquang/rncomponent';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
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
import Feather from 'react-native-vector-icons/Feather';
import {category} from '../../constants/category';

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

const homeContent = [
  {title: 'Phim bộ', slug: 'phim-bo'},
  {title: 'Phiêu lưu', slug: 'phieu-luu', poster: true},
  {title: 'Phim lẻ', slug: 'phim-le'},
  {title: 'Hành động', slug: 'hanh-dong'},
  {title: 'Lãng mạn', slug: 'lang-man', poster: true},
  {title: 'Tình cảm', slug: 'tinh-cam'},
  {title: 'Chương trình truyền hình', slug: 'tv-shows'},
  {title: 'Khoa học viễn tưởng', slug: 'khoa-hoc-vien-tuong', poster: true},
  {title: 'Tâm lý', slug: 'tam-ly'},
  {title: 'Phim hài', slug: 'phim-hai'},
  {title: 'Gia đình', slug: 'gia-dinh', poster: true},
  {title: 'Hoạt hình', slug: 'hoat-hinh'},
  {title: 'Giả tưởng', slug: 'gia-tuong'},
];

const HomeScreen = ({navigation}: any) => {
  const [streamingMovies, setStreamingMovies] = useState<Movie[]>([]);
  const [currentMovies, setCurrentMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [currentItem, setCurrentItem] = useState<Movie>(initialValue);
  const [homeMovies, setHomeMovies] = useState<Movie[][]>([]);

  const user = auth().currentUser;
  const userId = auth().currentUser?.uid;

  const getFavoritesMovies = useCallback(() => {
    firestore()
      .collection('favorites')
      .doc(userId)
      .onSnapshot(item => {
        const existingFavorites = item.data()?.favorites || [];
        setFavorites(existingFavorites);
      });
  }, [userId]);

  const addFavoriteMovie = useCallback(
    async (movieItem: Movie) => {
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
    },
    [userId],
  );

  const getMovies = useCallback(async () => {
    const item: any = await getStreamingMovies();
    setStreamingMovies(item);
    setCurrentItem(item[0]);
  }, []);

  const getCurrentMoviesHome = useCallback(async () => {
    try {
      const item: any = await getCurrentMovies();
      setCurrentMovies(item);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getHomeMovies = useCallback(async () => {
    try {
      const moviePromises = homeContent.map(item =>
        getSpecificCategoryMovies(item.slug),
      );
      const movies = await Promise.all(moviePromises);
      setHomeMovies(movies);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const renderSection = useCallback(
    (title: string, slug: string, index: number, poster: boolean = false) =>
      poster && homeMovies[index] ? (
        <Carousel
          key={index}
          containerCustomStyle={{
            position: 'relative',
            paddingTop: 13,
            paddingBottom: 18,
          }}
          layout={'default'}
          layoutCardOffset={18}
          loop
          autoplay
          data={homeMovies[index]}
          renderItem={({item, index}) => (
            <Row
              key={index}
              onPress={() => navigation.navigate('MovieDetails', {movie: item})}
              styles={{
                width: sizes.width,
                overflow: 'hidden',
              }}>
              <Image
                source={{uri: item.poster_url}}
                width={50}
                resizeMode="cover"
                height={50}
                style={{
                  width: sizes.width,
                  height: 120,
                  overflow: 'hidden',
                  shadowColor: colors.black,
                  shadowOpacity: 0.3,
                  shadowRadius: 10,
                }}></Image>
            </Row>
          )}
          sliderWidth={sizes.width}
          itemWidth={sizes.width}
        />
      ) : (
        <Section key={index}>
          <CategoryComponent text={title} slug={slug} />
          <Space height={8} />
          <FlatListComponent data={homeMovies[index] ?? []} />
        </Section>
      ),
    [homeMovies],
  );

  useEffect(() => {
    getMovies();
    getCurrentMoviesHome();
    getHomeMovies();
    getFavoritesMovies();
  }, []);

  return (
    <Container style={{backgroundColor: colors.black5}}>
      <View
        style={{
          marginTop: 25,
          zIndex: 100,
        }}>
        {currentItem && (
          <ImageBackground
            source={{uri: currentItem?.poster_url}}
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
            }}
            blurRadius={4}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
            />
          </ImageBackground>
        )}
        <Row
          styles={{paddingHorizontal: 8}}
          justifyContent="space-between"
          alignItems="center">
          <Image
            style={{width: 85, height: 100}}
            source={require('../../assets/images/logo.png')}
            width={100}
            height={100}
          />
          <Row>
            <TouchableOpacity
              onPress={() => navigation.navigate('NotificationScreen')}>
              <Feather
                style={{marginBottom: 20}}
                name="bell"
                size={30}
                color={colors.white}
              />
            </TouchableOpacity>
            <Space width={16} />
            <TouchableOpacity
              style={{marginBottom: 20}}
              onPress={() => navigation.navigate('SearchScreen')}>
              <Ionicons name="search-outline" size={30} color={colors.white} />
            </TouchableOpacity>
            <Space width={16} />
            {user?.photoURL ? (
              <Row
                onPress={() => navigation.navigate('ProfileTab')}
                styles={{
                  borderColor: colors.white,
                  borderWidth: 1.5,
                  position: 'relative',
                  borderRadius: 100,
                  marginBottom: 20,
                  width: 30,
                  height: 30,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{uri: user.photoURL}}
                  width={20}
                  height={20}
                  style={{width: 30, height: 30}}
                />
              </Row>
            ) : (
              <FontAwesome6
                onPress={() => navigation.navigate('ProfileTab')}
                name="circle-user"
                style={{marginBottom: 20}}
                color={colors.white}
                size={30}
              />
            )}
          </Row>
        </Row>
        <Row justifyContent="flex-start" styles={{paddingBottom: 28}}>
          <FlatList
            data={category}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.slug}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CategoryDetails', {
                    category: 'danh-sach',
                    slug: item.slug,
                    text: item.text,
                  })
                }
                key={index}>
                <TextComponent
                  font={fontFamilies.firaMedium}
                  styles={{marginHorizontal: 6}}
                  text={item.text}
                  size={sizes.bigTitle}
                  color={colors.white}
                />
              </TouchableOpacity>
            )}
          />
        </Row>
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
                    width: sizes.width * 0.65,
                    borderRadius: 6,
                    overflow: 'hidden',
                  }}>
                  <Image
                    source={{uri: item.thumb_url}}
                    width={50}
                    resizeMode="cover"
                    height={50}
                    style={{
                      width: sizes.width * 0.65,
                      height: 380,
                      borderRadius: 6,
                      overflow: 'hidden',
                      shadowColor: colors.black,
                      shadowOpacity: 0.3,
                      shadowRadius: 10,
                    }}></Image>
                </Row>
              )}
              sliderWidth={sizes.width}
              itemWidth={sizes.width * 0.65}
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
                    <Entypo
                      name="check"
                      size={sizes.icon}
                      color={colors.white}
                    />
                  ) : (
                    <Entypo
                      name="plus"
                      size={sizes.icon}
                      color={colors.white}
                    />
                  )}
                  <TextComponent color={colors.white} text="Danh sách" />
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
      </View>

      <Space height={24} />

      <Section>
        <CategoryComponent text="Phim đang chiếu" slug="phim-dang-chieu" />
        <Space height={8} />
        <FlatListComponent data={currentMovies} />
      </Section>

      {homeContent.map((item, index) =>
        renderSection(item.title, item.slug, index, item?.poster),
      )}
    </Container>
  );
};

export default HomeScreen;
