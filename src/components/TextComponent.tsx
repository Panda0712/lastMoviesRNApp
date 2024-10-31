import {Text} from '@bsdaoquang/rncomponent';
import {StyleProp, TextStyle} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';
import {sizes} from '../constants/sizes';

import React from 'react';

type Props = {
  text: string;
  color?: string;
  font?: string;
  size?: number;
  types?: 'bigTitle' | 'title' | 'text' | 'desc';
  styles?: StyleProp<TextStyle>;
  flex?: number;
  numberOfLines?: number;
};

const TextComponent = (props: Props) => {
  const {text, color, flex, font, size, types, numberOfLines, styles} = props;

  let fontSize = sizes.text;

  switch (types) {
    case 'bigTitle':
      fontSize = sizes.bigTitle;
      break;
    case 'title':
      fontSize = sizes.title;
      break;
    case 'desc':
      fontSize = sizes.desc;
      break;
    default:
      fontSize = sizes.text;
      break;
  }

  return (
    <Text
      text={text}
      color={color ? color : colors.black}
      flex={flex}
      font={font ? font : fontFamilies.firaRegular}
      size={size ? size : fontSize}
      numberOfLine={numberOfLines}
      styles={[{}, styles]}
    />
  );
};

export default TextComponent;
