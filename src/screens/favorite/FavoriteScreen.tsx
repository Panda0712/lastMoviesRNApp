import {Row, Section, Space} from '@bsdaoquang/rncomponent';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {Alert, FlatList, Image, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {sizes} from '../../constants/sizes';

interface FavoriteItem {
  name: string;
  slug: string;
  original_name: string;
  thumb_url: string;
  poster_url: string;
  created: string;
  modified: string;
  description: string;
  total_episodes: number;
  current_episode: string;
  time: string;
  quality: string;
  language: string;
  director: string;
  casts: string;
}

export const handleLike = async (
  movieId: string,
  userId: string | undefined,
) => {
  const movieRef = firestore().collection('movies').doc(movieId);
  try {
    await firestore().runTransaction(async transaction => {
      const movieDoc = await transaction.get(movieRef);

      if (movieDoc.exists) {
        const likes = movieDoc.data()?.likes || [];

        if (likes.includes(userId)) {
          transaction.update(movieRef, {
            movieId: movieId,
            likes: firestore.FieldValue.arrayRemove(userId),
          });
        } else {
          transaction.update(movieRef, {
            likes: firestore.FieldValue.arrayUnion(userId),
          });
        }
      }
    });
  } catch (error) {
    console.error('Error updating likes: ', error);
  }
};

const FavoriteScreen = ({navigation}: any) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const userId = auth().currentUser?.uid;

  const fetchFavorites = async () => {
    if (!userId) return;
    const userRef = firestore().collection('favorites').doc(userId);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      const existingFavorites = userDoc.data()?.favorites || [];
      setFavorites(existingFavorites);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const removeFavorite = async (name: string) => {
    if (!userId) return;
    const userRef = firestore().collection('favorites').doc(userId);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      const existingFavorites = userDoc.data()?.favorites || [];
      const updatedFavorites = existingFavorites.filter(
        (item: FavoriteItem) => item.name !== name,
      );
      await userRef.update({favorites: updatedFavorites});
      setFavorites(updatedFavorites);
    }
  };

  const handleRemoveFavorite = (name: string) => {
    Alert.alert(
      'Xóa khỏi yêu thích',
      'Bạn có chắc chắn muốn xóa phim này khỏi danh sách yêu thích?',
      [
        {text: 'Hủy', style: 'cancel'},
        {text: 'Xóa', onPress: () => removeFavorite(name)},
      ],
    );
  };

  const renderItem = ({item}: {item: FavoriteItem}) => (
    <TouchableOpacity
      style={{marginBottom: 10}}
      onPress={() => navigation.navigate('MovieDetails', {movie: item})}>
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <Image
          source={{uri: item.poster_url}}
          style={{width: '100%', height: 250, marginRight: 10}}
          resizeMode="cover"
        />
        <Space height={10} />

        <Row
          styles={{
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 10,
          }}>
          <TextComponent
            text={item.name}
            color={colors.white}
            font={fontFamilies.firaMedium}
          />
          <TouchableOpacity onPress={() => handleRemoveFavorite(item.name)}>
            <Ionicons name="heart" size={24} color="red" />
          </TouchableOpacity>
        </Row>
        <Space height={20} />
      </View>
    </TouchableOpacity>
  );

  return (
    <Container
      isScroll={false}
      style={{backgroundColor: colors.black}}
      title="Yêu thích"
      fixed
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={item => item.slug}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Section styles={{marginTop: 20}}>
          <Row styles={{flexDirection: 'column'}}>
            <Image
              source={require('../../assets/images/favorite.png')}
              width={50}
              height={50}
              style={{width: 250, height: 200}}
            />
            <TextComponent
              font={fontFamilies.firaMedium}
              size={sizes.bigTitle}
              styles={{textAlign: 'center'}}
              color={colors.white}
              text="Chưa có phim yêu thích nào! Hãy thêm phim vào nhé!"
            />
          </Row>
        </Section>
      )}
    </Container>
  );
};

export default FavoriteScreen;
