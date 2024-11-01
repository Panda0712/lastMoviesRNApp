/* eslint-disable react-native/no-inline-styles */
import {Button, Row, Section, Space} from '@bsdaoquang/rncomponent';
import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {sizes} from '../../constants/sizes';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MovieDetails = ({navigation, route}: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {movie}: any = route.params;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  console.log(movie);

  return (
    <Container style={{backgroundColor: colors.black}}>
      <Section
        styles={{
          position: 'absolute',
          top: 30,
          paddingHorizontal: 8,
          left: 0,
          right: 0,
          zIndex: 100,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      </Section>
      <Row>
        <Image
          source={{uri: movie?.poster_url}}
          resizeMode="cover"
          width={100}
          height={100}
          style={{width: sizes.width, height: 350}}
        />
      </Row>
      <Space height={16} />
      <Section>
        <Row justifyContent="space-between" alignItems="center">
          <TextComponent
            font={fontFamilies.firaSemiBold}
            size={24}
            color={colors.white}
            text={movie.name}
          />
          <TouchableOpacity>
            <AntDesign name="hearto" size={sizes.icon} color={colors.white} />
          </TouchableOpacity>
        </Row>
        <Space height={8} />
        <Row justifyContent="flex-start">
          <TextComponent
            color={colors.grey3}
            text={`${new Date(movie.created).getFullYear()} | ${
              movie.current_episode
            } | ${movie.language} | ${movie.quality}`}
          />
        </Row>
        <Space height={12} />
        <Row alignItems="flex-start" styles={{flexDirection: 'column'}}>
          <TextComponent
            color={colors.white}
            text={
              isExpanded
                ? movie.description
                : `${movie.description.slice(0, 100)}`
            }
          />
          {movie.description.length > 100 && (
            <TouchableOpacity onPress={toggleDescription}>
              <TextComponent
                color={colors.red}
                text={isExpanded ? 'Rút gọn' : 'Đọc thêm'}
              />
            </TouchableOpacity>
          )}
        </Row>
        <Space height={16} />
        <Button
          radius={4}
          icon={
            <Entypo color={colors.black} name="controller-play" size={24} />
          }
          title="Xem ngay"
          onPress={() => {}}
        />

        <Row alignItems="flex-start" styles={{flexDirection: 'column'}}>
          <TextComponent
            color={colors.grey3}
            text={`Diễn viên: ${movie.casts}`}
          />
          <Space height={4} />
          <TextComponent
            color={colors.grey3}
            text={`Đạo diễn: ${movie.director}`}
          />
          <Space height={4} />
          <TextComponent
            color={colors.grey3}
            text={`Thời lượng: ${movie.time}`}
          />
          <Space height={4} />
          <TextComponent
            color={colors.grey3}
            text={`Số tập: ${movie.total_episodes}`}
          />
        </Row>
        <Space height={16} />
        <Row justifyContent="flex-start">
          <Row alignItems="center" styles={{flexDirection: 'column', gap: 2}}>
            <TouchableOpacity>
              <AntDesign name="hearto" size={24} color={colors.white} />
            </TouchableOpacity>
            <TextComponent size={sizes.text} color={colors.white} text="0" />
          </Row>
          <Space width={36} />
          <Row alignItems="center" styles={{flexDirection: 'column', gap: 2}}>
            <TouchableOpacity>
              <Entypo name="plus" size={30} color={colors.white} />
            </TouchableOpacity>
            <TextComponent
              size={sizes.text}
              color={colors.white}
              text="Danh sách"
            />
          </Row>
          <Space width={36} />
          <Row alignItems="center" styles={{flexDirection: 'column', gap: 2}}>
            <TouchableOpacity>
              <FontAwesome name="send" size={30} color={colors.white} />
            </TouchableOpacity>
            <TextComponent
              size={sizes.text}
              color={colors.white}
              text="Chia sẻ"
            />
          </Row>
        </Row>
      </Section>
    </Container>
  );
};

export default MovieDetails;
