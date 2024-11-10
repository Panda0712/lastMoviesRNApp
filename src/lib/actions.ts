import Toast from 'react-native-toast-message';

const fetchWithNoCache = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
  return response;
};

export const getPaginationMovies = async (slug: string, page: number) => {
  try {
    const response = await fetchWithNoCache(
      `https://phim.nguonc.com/api/films/danh-sach/${slug}?page=${page}`,
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

export const getCategoryFilmMovies = async (
  category: string,
  slug: string,
  page: number,
) => {
  try {
    const response = await fetchWithNoCache(
      `https://phim.nguonc.com/api/films/${category}/${slug}?page=${page}`,
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

export const getStreamingMovies = async () => {
  try {
    const response = await fetchWithNoCache(
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

export const getCurrentMovies = async () => {
  try {
    const response = await fetchWithNoCache(
      'https://phim.nguonc.com/api/films/danh-sach/phim-dang-chieu?page=1',
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

export const getSpecificCategoryMovies = async (slug: string) => {
  try {
    const response = await fetchWithNoCache(
      `https://phim.nguonc.com/api/films/danh-sach/${slug}?page=1`,
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
    const response = await fetchWithNoCache(
      `https://phim.nguonc.com/api/film/${slug}`,
    );
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

export const getSearchMovies = async (keyword: string) => {
  try {
    const response = await fetchWithNoCache(
      `https://phim.nguonc.com/api/films/search?keyword=${keyword}`,
    );
    const data = await response.json();
    return data.items;
  } catch (error: any) {
    console.log('Lỗi tải dữ liệu tìm kiếm: ', error);
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.message,
    });
  }
};
