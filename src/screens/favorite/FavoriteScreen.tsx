import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { colors } from '../../constants/colors';
import { Row, Space } from '@bsdaoquang/rncomponent';
import { Container, TextComponent } from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fontFamilies } from '../../constants/fontFamilies';

interface FavoriteItem {
  title: string;
  poster: string;
  episode: string;
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

  const removeFavorite = async (title: string) => {
    if (!userId) return;
    const userRef = firestore().collection('favorites').doc(userId);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
      const existingFavorites = userDoc.data()?.favorites || [];
      const updatedFavorites = existingFavorites.filter((item: FavoriteItem) => item.title !== title);
      await userRef.update({ favorites: updatedFavorites });
      setFavorites(updatedFavorites);
    }
  };

  const handleRemoveFavorite = (title: string) => {
    Alert.alert(
      "Xóa khỏi yêu thích",
      "Bạn có chắc chắn muốn xóa phim này khỏi danh sách yêu thích?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Xóa", onPress: () => removeFavorite(title) }
      ]
    );
  };

  const renderItem = ({ item }: { item: FavoriteItem }) => (
    <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => navigation.navigate("MovieDetails")}>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Image
          source={{ uri: item.poster }}
          style={{ width: "100%", height: 250, marginRight: 10 }}
          resizeMode='cover'
        />
        <Space height={10} />

        <Row styles={{ justifyContent: 'space-between', width: '100%', paddingHorizontal: 10 }}>
          <TextComponent text={item.title} color={colors.white} font={fontFamilies.firaMedium} />
          <TouchableOpacity onPress={() => handleRemoveFavorite(item.title)}>
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
        keyExtractor={(item) => item.title}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default FavoriteScreen;
