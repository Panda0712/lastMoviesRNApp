import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { colors } from '../../constants/colors';
import { Space } from '@bsdaoquang/rncomponent';
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

  const renderItem = ({ item }: { item: FavoriteItem }) => (
    <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => navigation.navigator("MovieDetails")}>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Image
          source={{ uri: item.poster }}
          style={{ width: "100%", height: 225, marginRight: 10 }}
          resizeMode='cover'
        />
        <Space height={10} />
        <TextComponent text={item.title} color={colors.white} font={fontFamilies.firaMedium} />
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
