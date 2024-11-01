import Toast from 'react-native-toast-message';

export const getStreamingMovies = async () => {
  try {
    const response = await fetch(
      'https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=1',
    );
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.log(error);
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.message,
    });
  }
};
