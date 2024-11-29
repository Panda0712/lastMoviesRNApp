import {Row, Section} from '@bsdaoquang/rncomponent';
import {useEffect, useState} from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {Movie} from '../../constants/models';
import {sizes} from '../../constants/sizes';
import {getStreamingMovies} from '../../lib/actions';
import {fontFamilies} from '../../constants/fontFamilies';

const PosterScreen = ({navigation}: any) => {
  const [posterMovie, setPosterMovie] = useState<Movie>();
  const [timeout, setTimeOut] = useState(10);

  const getPosterMovie = async () => {
    const item: any = await getStreamingMovies();
    setPosterMovie(item[0]);
  };

  useEffect(() => {
    getPosterMovie();
  }, []);

  useEffect(() => {
    if (timeout === 0) {
      navigation.navigate('Main');
      return;
    }

    const timeoutFunc = setInterval(() => {
      setTimeOut(timeout => timeout - 1);
    }, 1000);

    return () => clearInterval(timeoutFunc);
  }, [timeout]);

  return (
    <Container>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MovieDetails', {movie: posterMovie})
        }>
        <Section
          styles={{position: 'absolute', right: 4, top: 40, zIndex: 100}}>
          <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Row
              styles={{
                width: 35,
                height: 35,
                borderRadius: 200,
                backgroundColor: colors.grey,
              }}>
              <FontAwesome6
                name="xmark"
                color={colors.black}
                size={sizes.icon}
              />
            </Row>
          </TouchableOpacity>
        </Section>
        {posterMovie && (
          <ImageBackground
            source={{uri: posterMovie?.thumb_url}}
            width={200}
            height={200}
            resizeMode="cover"
            style={{
              width: sizes.width,
              height: sizes.height,
            }}></ImageBackground>
        )}
        <Section
          styles={{position: 'absolute', bottom: 30, right: 4, zIndex: 100}}>
          <Row
            styles={{
              width: 35,
              height: 35,
              borderRadius: 200,
              backgroundColor: colors.grey,
            }}>
            <TextComponent
              font={fontFamilies.firaMedium}
              text={timeout.toString()}
            />
          </Row>
        </Section>
      </TouchableOpacity>
    </Container>
  );
};

export default PosterScreen;
