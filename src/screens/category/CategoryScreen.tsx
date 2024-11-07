/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container} from '../../components';
import {colors} from '../../constants/colors';
import {Movie} from '../../constants/models';
import {getPaginationMovies} from '../../lib/actions';

const {width} = Dimensions.get('window');
const COLUMN_COUNT = 3;
const SPACING = 10;
const ITEM_WIDTH = (width - (COLUMN_COUNT + 1) * SPACING) / COLUMN_COUNT;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;

type RootStackParamList = {
  MovieDetails: {movie: Movie};
};

interface MovieListProps {
  route: {
    params: {
      text: string;
      slug: string;
    };
  };
}

const MovieListScreen: React.FC<MovieListProps> = ({route}) => {
  const [data, setData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {text, slug} = route.params;

  const fetchMovies = async (page: number, shouldAppend: boolean = true) => {
    try {
      setLoading(true);
      const response = await getPaginationMovies(slug, page);
      const movies = Array.isArray(response[0]) ? response[0] : response;

      if (movies?.length > 0) {
        setData(prev => (shouldAppend ? [...prev, ...movies] : movies));
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
    setData([]);
    setCurrentPage(1);
    fetchMovies(1, false);
  }, [slug]);

  return (
    <Container
      isScroll={false}
      fixed
      title={text}
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }
      style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderMovie}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        numColumns={COLUMN_COUNT}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
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
  },
  footer: {
    paddingVertical: 20,
  },
});

export default MovieListScreen;
