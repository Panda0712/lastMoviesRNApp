/* eslint-disable react-native/no-inline-styles */
import {Row} from '@bsdaoquang/rncomponent';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlatList, Image} from 'react-native';
import {Movie} from '../constants/models';

export type RootStackParamList = {
  MovieDetails: {
    movie: Movie;
  };
};

interface FlatListComponentProps {
  data: Movie[];
}

const FlatListComponent = ({data}: FlatListComponentProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={item => item.name}
      renderItem={({item, index}) => (
        <Row
          key={index}
          onPress={() => navigation.navigate('MovieDetails', {movie: item})}>
          <Image
            source={{uri: item.thumb_url}}
            width={100}
            height={100}
            style={{
              width: 120,
              height: 180,
              marginRight: index === data.length - 1 ? 0 : 8,
            }}
          />
        </Row>
      )}
    />
  );
};

export default FlatListComponent;
