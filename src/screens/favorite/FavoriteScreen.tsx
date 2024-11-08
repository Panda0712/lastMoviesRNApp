import {Row, Section, Space} from '@bsdaoquang/rncomponent';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {FlatList, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {Movie} from '../../constants/models';
import {sizes} from '../../constants/sizes';

const FavoriteScreen = ({navigation}: any) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
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

  useEffect(() => {
    getFavoritesMovies();
  }, []);

  return (
    <Container
      isScroll={false}
      style={{backgroundColor: colors.black}}
      title="Danh sách yêu thích"
      fixed
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }>
      <Space height={8} />
      {favorites.length > 0 ? (
        <FlatList
          style={{marginHorizontal: 'auto'}}
          numColumns={3}
          data={favorites}
          renderItem={({item, index}) => (
            <Row
              onPress={() => navigation.navigate('MovieDetails', {movie: item})}
              key={index}
              styles={{marginHorizontal: 6, marginVertical: 6}}>
              <Image
                source={{uri: item.thumb_url}}
                width={50}
                height={50}
                style={{width: 120, height: 180}}
              />
            </Row>
          )}
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
