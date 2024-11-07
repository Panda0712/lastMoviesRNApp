import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { colors } from '../../constants/colors';
import { Row, Space } from '@bsdaoquang/rncomponent';
import { Container, TextComponent } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fontFamilies } from '../../constants/fontFamilies';
import { firebase } from '@react-native-firebase/storage';


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

const FavoriteScreen = ({ navigation }: any) => {
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
      const updatedFavorites = existingFavorites.filter((item: FavoriteItem) => item.name !== name);
      await userRef.update({ favorites: updatedFavorites });
      setFavorites(updatedFavorites);
    }
  };

  const handleRemoveFavorite = (name: string) => {
    Alert.alert(
      "Xóa khỏi yêu thích",
      "Bạn có chắc chắn muốn xóa phim này khỏi danh sách yêu thích?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Xóa", onPress: () => removeFavorite(name) }
      ]
    );
  };

  const renderItem = ({ item }: { item: FavoriteItem }) => (
    <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => navigation.navigate("MovieDetails")}>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Image
          source={{ uri: item.poster_url }}
          style={{ width: "100%", height: 250, marginRight: 10 }}
          resizeMode='cover'
        />
        <Space height={10} />

        <Row styles={{ justifyContent: 'space-between', width: '100%', paddingHorizontal: 10 }}>
          <TextComponent text={item.name} color={colors.white} font={fontFamilies.firaMedium} />
          <TouchableOpacity onPress={() => handleRemoveFavorite(item.name)}>
            <Ionicons name="heart" size={24} color="red" />
          </TouchableOpacity>
        </Row>
        <Space height={20} />
      </View>
    </TouchableOpacity>
  );

  return (
    <Container isScroll={false} style={{ backgroundColor: colors.black }}
      title='Yêu thích'
      fixed
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='chevron-back' size={24} color={colors.white} />
        </TouchableOpacity>
      }
    >
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.slug}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default FavoriteScreen;