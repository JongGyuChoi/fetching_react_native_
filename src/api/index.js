import axios from 'axios';

export const getMovieList = async (number) => {
  try {
    const res = await axios.get(
      `https://yts.mx/api/v2/list_movies.json?page=${number}&limit=8`,
    );
    return res;
  } catch (error) {
    console.log(error, 'getMovieList error');
  }
};

export const getMovieDetail = async (id) => {
  try {
    const res = await axios.get(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`,
    );
    return res;
  } catch (error) {
    console.log(error, 'getMovieDetail error');
  }
};
