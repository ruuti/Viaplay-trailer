import axios from "axios";

const instance = axios.create({
  timeout: 1000
});

/**
 * Get the movie data from Viaplay
 * @param {string} url URL to Viaplay Content API
 * @returns {object} Axios response object
 */
const getMovieData = async (url) =>
  await instance.get(`${url}`);

/**
 * Get the IMDB ID from Viaplay Content API url
 * @param {string} url URL to Viaplay Content API
 * @returns {string|boolean} IMDB movie ID
 */
export const getImdbIdFromUrl = async (url) => {
  try {
    const response = await getMovieData(url);
    return response.data._embedded["viaplay:blocks"][0]._embedded["viaplay:product"].content.imdb.id;
  } catch (error) {
    return false;
  }
};
