/* eslint-disable react-native/no-inline-styles */
import {Button, Input, Row, Section, Space} from '@bsdaoquang/rncomponent';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import Share from 'react-native-share';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WebView from 'react-native-webview';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {MoviesInfo, Reviews} from '../../constants/models';
import {sizes} from '../../constants/sizes';
import {getSpecificMovieDetails} from '../../lib/actions';
import {handleLike} from '../../screens/favorite/FavoriteScreen';
import {parseTime} from '../../utils/helpers';

const MovieDetails = ({navigation, route}: any) => {
  const [moviesInfo, setMoviesInfo] = useState<MoviesInfo[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [movieUrl, setMovieUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [activeEpisode, setActiveEpisode] = useState('');
  const [favorites, setFavorites] = useState<{[key: string]: boolean}>({});
  const [likesCount, setLikesCount] = useState(0);
  const userId = auth().currentUser?.uid;

  const { movie }: any = route.params;
  const user = auth().currentUser;
  const movieSlug = movie.slug;
  const listEpisodes = moviesInfo[0]?.items;

  const handleShare = async () => {
    let options;
    if (movieUrl) {
      options = {
        url: movieUrl,
      };
    } else {
      options = {
        url: listEpisodes[0]?.embed,
      };
    }

    try {
      await Share.open(options);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handlePlay = (url: string) => {
    setMovieUrl(url);
    setIsPlaying(true);
  };

  const handleWatchNow = (url: string) => {
    setMovieUrl(url);
    setIsPlaying(true);
  };

  useEffect(() => {
    const fetchLikesCount = async () => {
      try {
        const movieRef = firestore().collection('movies').doc(movie.name);
        const movieDoc = await movieRef.get();

        if (movieDoc.exists) {
          const likes = movieDoc.data()?.likes || [];
          setLikesCount(likes.length);
        }
      } catch (error) {
        console.error('Error fetching likes count: ', error);
      }
    };

    fetchLikesCount();
  }, [movie.name]);



  const handleGetMoviesInfo = async (slug: string) => {
    const data: any = await getSpecificMovieDetails(slug);
    setMoviesInfo(data);
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleGetComments = () => {
    firestore()
      .collection('reviews')
      .where('name', '==', movieSlug)
      .onSnapshot((snapshot: any) => {
        const items = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(items);
      });
  };

  const handlePostComments = async () => {
    if (!commentValue) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: 'Vui lòng nhập bình luận của bạn',
      });
      return;
    }

    const commentData = {
      user: user?.displayName,
      userComments: commentValue,
      photoUrl: user?.photoURL ?? '',
      timestamp: new Date(),
    };

    if (reviews.length > 0) {
      await firestore()
        .doc(`reviews/${reviews[0].id}`)
        .update({
          comments: firestore.FieldValue.arrayUnion(commentData),
        });
    } else {
      await firestore()
        .collection('reviews')
        .add({
          name: movieSlug,
          comments: [commentData],
        });
    }
    setCommentValue('');
  };

  useEffect(() => {
    handleGetComments();
  }, []);

  useEffect(() => {
    if (movieSlug) {
      handleGetMoviesInfo(movieSlug.toString());
    }
  }, [movieSlug]);

  const fetchFavorites = async (userId: string | undefined) => {
    if (!userId) return;
    const userRef = firestore().collection('favorites').doc(userId);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      const existingFavorites = userDoc.data()?.favorites || [];
      const favoriteMap: {[key: string]: boolean} = {};
      existingFavorites.forEach((movie: any) => {
        favoriteMap[movie.name] = true;
      });
      setFavorites(favoriteMap);
    }
  };

  useEffect(() => {
    fetchFavorites(userId);
  }, []);

  const toggleFavoriteMovie = async (
    userId: string | undefined,
    name: string,
    slug: string,
    original_name: string,
    thumb_url: string,
    poster_url: string,
    created: string,
    modified: string,
    description: string,
    total_episodes: number,
    current_episode: string,
    time: string,
    quality: string,
    language: string,
    director: string,
    casts: string,
  ) => {
    try {
      const userRef = firestore().collection('favorites').doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        await userRef.set({favorites: []});
      }

      const existingFavorites = userDoc.data()?.favorites || [];
      const isMovieExists = existingFavorites.some(
        (movie: any) => movie.name === name,
      );

      const newFavorite = {
        name: name,
        slug: slug,
        original_name: original_name,
        thumb_url: thumb_url,
        poster_url: poster_url,
        created: created,
        modified: modified,
        description: description,
        total_episodes: total_episodes,
        current_episode: current_episode,
        time: time,
        quality: quality,
        language: language,
        director: director,
        casts: casts,
      };

      if (isMovieExists) {
        await userRef.update({
          favorites: firestore.FieldValue.arrayRemove(newFavorite),
        });
        setFavorites(prev => ({...prev, [name]: false}));
      } else {
        await userRef.update({
          favorites: firestore.FieldValue.arrayUnion({...newFavorite}),
        });
        setFavorites(prev => ({...prev, [name]: true}));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container style={{backgroundColor: colors.black}}>
      <Section
        styles={{
          position: 'absolute',
          top: 30,
          paddingHorizontal: 8,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={36} color={colors.white} />
        </TouchableOpacity>
      </Section>
      {isPlaying ? (
        <WebView
          source={{
            uri: movieUrl,
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
          }}
          style={{width: '100%', height: 350}}
          allowsFullscreenVideo={true}
          mediaPlaybackRequiresUserAction={false}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          allowsInlineMediaPlayback={true}
          originWhitelist={['*']}
          mixedContentMode="always"
          scalesPageToFit={true}
          onShouldStartLoadWithRequest={request => {
            return true;
          }}
          onError={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
          onLoadEnd={() => {
            console.log('WebView loaded successfully');
          }}
        />
      ) : (
        <Row>
          <Image
            source={{uri: movie?.poster_url}}
            resizeMode="cover"
            width={100}
            height={100}
            style={{width: sizes.width, height: 350}}
          />
        </Row>
      )}
      <Space height={16} />

      {activeEpisode ? (
        <Section>
          <TextComponent
            font={fontFamilies.firaMedium}
            size={sizes.title}
            color={colors.white}
            text={`Đang xem: ${activeEpisode}`}
          />
        </Section>
      ) : (
        <></>
      )}

      <Section>
        <Row justifyContent="space-between" alignItems="center">
          <TextComponent
            font={fontFamilies.firaSemiBold}
            size={24}
            color={colors.white}
            text={movie.name}
          />
          <Space width={8} />
          <TouchableOpacity
            onPress={() => {
              toggleFavoriteMovie(
                userId,
                movie.name,
                movie.slug,
                movie.original_name,
                movie.thumb_url,
                movie.poster_url,
                movie.created,
                movie.modified,
                movie.description,
                movie.total_episodes,
                movie.current_episode,
                movie.time,
                movie.quality,
                movie.language,
                movie.director,
                movie.casts
              );
              handleLike(movie.name, userId);
            }}
          >
            <AntDesign name="heart" size={sizes.icon} color={favorites[movie.name] ? colors.red : colors.white} />
          </TouchableOpacity>
        </Row>
        <Space height={8} />
        <Row justifyContent="flex-start">
          <TextComponent
            color={colors.grey3}
            text={`${new Date(movie.created).getFullYear()} | Trạng thái: ${
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
          textStyleProps={{
            fontFamily: fontFamilies.firaSemiBold,
            marginBottom: 2,
          }}
          radius={4}
          icon={
            <Entypo color={colors.black} name="controller-play" size={24} />
          }
          title="Xem ngay"
          onPress={() => {
            handleWatchNow(listEpisodes[0]?.embed);
            setActiveEpisode('Tập 1');
          }}
        />

        <Row alignItems="flex-start" styles={{flexDirection: 'column'}}>
          <TextComponent
            color={colors.grey3}
            text={`Diễn viên: ${movie.casts ?? 'Chưa có dữ liệu'}`}
          />
          <Space height={4} />
          <TextComponent
            color={colors.grey3}
            text={`Đạo diễn: ${movie.director ?? 'Chưa có dữ liệu'}`}
          />
          <Space height={4} />
          <TextComponent
            color={colors.grey3}
            text={`Thời lượng: ${movie.time ?? 'Chưa có dữ liệu'}`}
          />
          <Space height={4} />
          <TextComponent
            color={colors.grey3}
            text={`Số tập: ${movie.total_episodes ?? 'Chưa có dữ liệu'}`}
          />
        </Row>
        <Space height={16} />
        <View
          style={{
            borderBottomColor: colors.black2,
            paddingBottom: 15,
            borderBottomWidth: 2,
          }}>
          <Space height={12} />
          <Row
            justifyContent="flex-start"
            alignItems="center"
            styles={{
              flexDirection: 'row',
              gap: 36,
              paddingBottom: 16,
              borderBottomColor: colors.black2,
              borderWidth: 2,
            }}>
            <Row alignItems="center" styles={{flexDirection: 'column', gap: 2}}>
              <TouchableOpacity>
                <AntDesign name="heart" size={30} color={colors.white} />
              </TouchableOpacity>
              <TextComponent size={sizes.text} color={colors.white} text={`${likesCount}`} />
            </Row>

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

            <Row alignItems="center" styles={{flexDirection: 'column', gap: 2}}>
              <TouchableOpacity onPress={handleShare}>
                <FontAwesome name="send" size={30} color={colors.white} />
              </TouchableOpacity>
              <TextComponent
                size={sizes.text}
                color={colors.white}
                text="Chia sẻ"
              />
            </Row>
          </Row>
          <Space height={8} />
          <Row
            styles={{
              flexDirection: 'column',
              borderBottomColor: colors.black2,
              borderBottomWidth: 2,
              paddingBottom: 15,
            }}
            alignItems="flex-start">
            <TextComponent
              font={fontFamilies.firaSemiBold}
              size={sizes.title}
              color={colors.white}
              text="Danh sách tập"
            />
            <Space height={2} />
            <TextComponent
              size={sizes.title}
              color={colors.white}
              text={movie.name}
            />
            <Space height={18} />
            <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
              {moviesInfo[0]?.items.map((item, index) => (
                <Row
                  onPress={() => {
                    handlePlay(item.embed);
                    setActiveEpisode(`Tập ${index + 1}`);
                  }}
                  key={index}
                  styles={{
                    position: 'relative',
                    flexDirection: 'column',
                    marginRight: 8,
                  }}
                  alignItems="flex-start">
                  <Row
                    styles={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      zIndex: 100,
                      backgroundColor: 'rgba(0,0,0,.4)',
                      transform: [{translateX: -15}, {translateY: -30}],
                      width: 30,
                      height: 30,
                      borderColor: colors.white,
                      borderWidth: 1.5,
                      borderRadius: 100,
                    }}>
                    <Entypo
                      color={colors.white}
                      name="controller-play"
                      size={20}
                    />
                  </Row>

                  <Image
                    resizeMode="cover"
                    source={{uri: movie.thumb_url}}
                    width={50}
                    height={50}
                    style={{width: 180, height: 100, objectFit: 'cover'}}
                  />
                  <Space height={4} />
                  <TextComponent
                    color={colors.white}
                    text={`Tập ${index + 1}`}
                  />
                </Row>
              ))}
            </ScrollView>
          </Row>
          <Space height={8} />

          <Row alignItems="flex-start" styles={{flexDirection: 'column'}}>
            <TextComponent
              text="Bình luận"
              font={fontFamilies.firaSemiBold}
              size={sizes.title}
              color={colors.white}
            />
            <Space height={12} />
            <Row justifyContent="flex-start" styles={{width: '100%'}}>
              <Input
                bordered={false}
                color="transparent"
                styles={{
                  width: sizes.width - 40,
                  paddingHorizontal: 0,
                }}
                value={commentValue}
                onChange={setCommentValue}
                placeholderColor={colors.white}
                inputStyles={{color: colors.white}}
                placeholder="Nhập bình luận"
                prefix={
                  user?.photoURL ? (
                    <Row
                      styles={{
                        position: 'relative',
                        borderRadius: 100,
                        width: 30,
                        height: 30,
                        overflow: 'hidden',
                      }}>
                      <Image
                        source={{uri: user.photoURL}}
                        width={20}
                        height={20}
                        style={{width: 30, height: 30}}
                      />
                    </Row>
                  ) : (
                    <FontAwesome6
                      name="circle-user"
                      color={colors.white}
                      size={30}
                    />
                  )
                }
                affix={
                  <TouchableOpacity onPress={handlePostComments}>
                    <Ionicons name="send" color={colors.white} size={24} />
                  </TouchableOpacity>
                }
              />
            </Row>
            <Space height={4} />
            {reviews?.length > 0 ? (
              <View>
                <Row alignItems="flex-start" styles={{flexDirection: 'column'}}>
                  {reviews[0]?.comments.map((item, index) => (
                    <Row
                      styles={{
                        position: 'relative',
                        marginBottom: 10,
                        width: sizes.width - 50,
                      }}
                      alignItems="flex-start"
                      justifyContent="space-between"
                      key={index}>
                      <Row alignItems="flex-start">
                        {item?.photoUrl ? (
                          <Row
                            styles={{
                              position: 'relative',
                              borderRadius: 100,
                              width: 30,
                              height: 30,
                              overflow: 'hidden',
                            }}>
                            <Image
                              source={{uri: item.photoUrl}}
                              width={20}
                              height={20}
                              style={{width: 30, height: 30}}
                            />
                          </Row>
                        ) : (
                          <FontAwesome6
                            name="circle-user"
                            color={colors.white}
                            size={30}
                          />
                        )}
                        <Space width={12} />
                        <Row
                          alignItems="flex-start"
                          styles={{flexDirection: 'column'}}>
                          <TextComponent
                            font={fontFamilies.firaMedium}
                            color={colors.white}
                            text={item.user}
                          />
                          <TextComponent
                            color={colors.white}
                            text={item.userComments}
                          />
                        </Row>
                      </Row>
                      <TextComponent
                        styles={{
                          textAlign: 'right',
                        }}
                        color={colors.grey}
                        text={parseTime(item.timestamp)}
                      />
                    </Row>
                  ))}
                </Row>
              </View>
            ) : (
              <Section>
                <Row>
                  <TextComponent
                    font={fontFamilies.firaMedium}
                    color={colors.white}
                    text="Chưa có bình luận nào"
                  />
                </Row>
              </Section>
            )}
          </Row>
        </View>
      </Section>
    </Container>
  );
};

export default MovieDetails;
