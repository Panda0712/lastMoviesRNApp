/* eslint-disable react-native/no-inline-styles */
import {Row} from '@bsdaoquang/rncomponent';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';
import {sizes} from '../constants/sizes';
import TextComponent from './TextComponent';

export type RootStackParamList = {
  CategoryScreen: {
    text: string;
    slug: string;
  };
};

const CategoryComponent = ({text, slug, showArrow}: any) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Row justifyContent="space-between">
      <TextComponent
        size={sizes.title}
        font={fontFamilies.firaMedium}
        styles={{textTransform: 'uppercase'}}
        color={colors.white}
        text={text}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CategoryScreen', {
            text: text,
            slug: slug,
          })
        }>
        {!showArrow && (
          <TextComponent
            size={30}
            styles={{textTransform: 'uppercase'}}
            color={colors.white}
            text=">"
          />
        )}
      </TouchableOpacity>
    </Row>
  );
};

export default CategoryComponent;
