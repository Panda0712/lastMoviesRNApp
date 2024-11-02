import Toast from 'react-native-toast-message';

export const getStreamingMovies = async () => {
  try {
    const response = await fetch(
      'https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=1',
    );
    const data = await response.json();
    return data.items;
  } catch (error: any) {
    console.log(error);
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.message,
    });
  }
};

export const getSpecificMovieDetails = async (slug: string) => {
  try {
    const response = await fetch(`https://phim.nguonc.com/api/film/${slug}`);
    const data = await response.json();
    return data.movie.episodes;
  } catch (error: any) {
    console.log('Lỗi tải dữ liệu tập phim: ', error);
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.message,
    });
  }
};
