/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Button, Row, Section, Space} from '@bsdaoquang/rncomponent';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import CategoryComponent from '../../components/CategoryComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {Movie} from '../../constants/models';
import {sizes} from '../../constants/sizes';
import {getCategoryFilmMovies} from '../../lib/actions';
import {handleLike} from '../../screens/favorite/FavoriteScreen';

const {width} = Dimensions.get('window');
const COLUMN_COUNT = 3;
const SPACING = 10;
const ITEM_WIDTH = (width - (COLUMN_COUNT + 1) * SPACING) / COLUMN_COUNT;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;

const CategoryDetails = ({navigation, route}: any) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const {category, slug, text} = route.params;
  const [favorites, setFavorites] = useState<{[key: string]: boolean}>({});
  const userId = auth().currentUser?.uid;

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

  const handleGetMovies = async () => {
    const items = await getCategoryFilmMovies(category, slug, 1);
    setMovies(items);
  };

  const fetchMovies = async (page: number, shouldAppend: boolean = true) => {
    try {
      setLoading(true);
      const response = await getCategoryFilmMovies(category, slug, page);
      const moviesApi = Array.isArray(response[0]) ? response[0] : response;
      if (moviesApi?.length > 0) {
        setAllMovies(prev =>
          shouldAppend ? [...prev, ...moviesApi] : moviesApi,
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return false;
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLoadMore = async () => {
    if (!loading) {
      const success = await fetchMovies(currentPage + 1);
      if (success) {
        setCurrentPage(prev => prev + 1);
      }
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setCurrentPage(1);
    await fetchMovies(1, false);
  };

  const renderMovie = ({item}: {item: Movie}) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('MovieDetails', {movie: item})}>
      <Image
        source={{uri: item.thumb_url}}
        style={styles.movieImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  const renderListHeader = () => (
    <>
      <Section
        styles={{
          position: 'absolute',
          top: 30,
          paddingHorizontal: 8,
          left: 0,
          right: 0,
          zIndex: 100,
        }}>
        <Row justifyContent="space-between" alignItems="center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
            <Ionicons name="search" size={36} color={colors.white} />
          </TouchableOpacity>
        </Row>
      </Section>
      <View>
        <Swiper showsPagination={false} style={{height: 380}}>
          {movies.map((item, index) => (
            <View key={index} style={{width: sizes.width}}>
              <ImageBackground
                source={{uri: item.poster_url}}
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
                    styles={{width: '100%', height: 80, marginBottom: 4}}
                    alignItems="center">
                    <TouchableOpacity
                      onPress={() => {
                        toggleFavoriteMovie(
                          userId,
                          item.name,
                          item.slug,
                          item.original_name,
                          item.thumb_url,
                          item.poster_url,
                          item.created,
                          item.modified,
                          item.description,
                          item.total_episodes,
                          item.current_episode,
                          item.time,
                          item.quality,
                          item.language,
                          item.director,
                          item.casts,
                        );
                        handleLike(item.name, userId);
                      }}>
                      <Row styles={{flexDirection: 'column', marginBottom: 12}}>
                        <AntDesign
                          name="heart"
                          size={sizes.icon}
                          color={
                            favorites[item.name] ? colors.red : colors.white
                          }
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
      <Space height={16} />
      <Section>
        <CategoryComponent text={text} slug={slug} showArrow />
      </Section>
      <Space height={8} />
    </>
  );

  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={colors.white} />
      </View>
    );
  };

  useEffect(() => {
    fetchFavorites(userId);
  }, []);

  useEffect(() => {
    handleGetMovies();
  }, []);

  useEffect(() => {
    setAllMovies([]);
    setCurrentPage(1);
    fetchMovies(1, false);
  }, [slug]);

  return (
    <Container isScroll={false} style={{backgroundColor: colors.black}}>
      <FlatList
        data={allMovies}
        renderItem={renderMovie}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        numColumns={COLUMN_COUNT}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.6}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.white}
          />
        }
      />
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
  },
  listContent: {
    paddingHorizontal: SPACING / 2,
    paddingTop: SPACING,
  },
  movieItem: {
    flex: 1,
    margin: SPACING / 2,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.black,
  },
  movieImage: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: 4,
  },
  footer: {
    paddingVertical: 20,
  },
});
export default CategoryDetails;
