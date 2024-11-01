/* eslint-disable react-native/no-inline-styles */
import {Row} from '@bsdaoquang/rncomponent';
import React, {ReactNode} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyles} from '../styles/globalStyles';

import TextComponent from './TextComponent';

type Props = {
  children: ReactNode;
  title?: string;
  back?: ReactNode;
  right?: ReactNode;
  left?: ReactNode;
  isScroll?: boolean;
  style?: StyleProp<ViewStyle>;
  nestedFlatList?: boolean;
  fixed?: boolean;
};

const Container = (props: Props) => {
  const {
    children,
    title,
    back,
    right,
    left,
    isScroll,
    style,
    nestedFlatList,
    fixed,
  } = props;

  return (
    <SafeAreaView style={[globalStyles.container]}>
      <StatusBar translucent backgroundColor="transparent" />
      {(back || title || left || right) && (
        <Row
          styles={{
            paddingHorizontal: 16,
            backgroundColor: fixed ? 'transparent' : colors.red,
            paddingVertical: 16,
            paddingTop:
              Platform.OS === 'android' ? StatusBar.currentHeight : 42,
          }}>
          {back && back}
          {left && !back && <></>}
          <View
            style={{
              paddingHorizontal: 16,
              flex: 1,
            }}>
            {title && (
              <TextComponent
                size={18}
                font={fontFamilies.firaBold}
                color={colors.white}
                text={title}
              />
            )}
          </View>
          {right && right}
        </Row>
      )}

      {!isScroll && isScroll !== false ? (
        <ScrollView
          style={[globalStyles.container, style]}
          removeClippedSubviews={nestedFlatList}>
          {children}
        </ScrollView>
      ) : (
        <View style={[globalStyles.container, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

export default Container;
