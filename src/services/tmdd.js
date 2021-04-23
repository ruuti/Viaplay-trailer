import "dotenv/config";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 1000
});

/**
 * Get the videos from TMDb that have been added to a movie.
 * @param {string} id ID of the movie
 * @returns {object} Axios response object
 */
const getVideos = async (id) =>
  await instance.get(`/movie/${id}/videos`, {
    params: {
      "api_key": process.env.KEY,
      "language": "en-US"
    }
  });

/**
 * Returns a movie trailer url
 * @param {string} id ID of the movie.
 * @returns {string|boolean} URL to trailer or false
 */
export const getTrailer = async (id) => {
  try {
    const videos = await getVideos(id);
    const item = videos.data.results.find(video =>
      video.type === "Trailer"
    );
    return item.key ? `https://www.youtube.com/watch?v=${item.key}` : false;
  } catch (error) {
    return false;
  }
};
