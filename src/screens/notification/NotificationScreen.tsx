import {Row, Space} from '@bsdaoquang/rncomponent';
import {Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {sizes} from '../../constants/sizes';
import {useCallback, useEffect, useState} from 'react';
import {Movie} from '../../constants/models';
import {getStreamingMovies} from '../../lib/actions';
import Carousel from 'react-native-snap-carousel';

const NotificationScreen = ({navigation}: any) => {
  const [streamingMovies, setStreamingMovies] = useState<Movie[]>([]);

  const getMovies = useCallback(async () => {
    const item: any = await getStreamingMovies();
    setStreamingMovies(item);
  }, []);

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Container
      fixed
      title="Thông báo"
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }
      style={{backgroundColor: colors.black5}}>
      <Carousel
        containerCustomStyle={{
          position: 'relative',
          paddingTop: 13,
          paddingBottom: 18,
        }}
        layout={'default'}
        layoutCardOffset={18}
        loop
        autoplay
        data={streamingMovies}
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

      <Row styles={{flexDirection: 'column'}}>
        <Image
          source={require('../../assets/images/bell-image.png')}
          width={100}
          height={100}
          style={{width: 200, height: 200}}
        />
        <TextComponent
          text="Bạn chưa có thông báo nào"
          color={colors.white}
          font={fontFamilies.firaSemiBold}
          size={sizes.bigTitle}
        />
        <Space height={8} />
        <TextComponent
          text="Các thông báo hot về phim sẽ được cập nhật tại đây"
          color={colors.white}
          font={fontFamilies.firaMedium}
          size={sizes.title}
        />
      </Row>
    </Container>
  );
};

export default NotificationScreen;
