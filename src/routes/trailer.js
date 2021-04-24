import { Router } from "express";
import apicache from "apicache";
import { tmdd, viaplay } from "services";
import { trailer } from "middlewares";

const router = Router();
const cache = apicache.middleware;

/**
 * Returns link to movie trailer or false based on Viaplay content API URL
 * @param {string} url URL to Viaplay content API
 * @returns {string|boolean} Trailer URL string or false
 */
const getTrailerFromViaplayUrl = async (url) => {
  try {
    const id = await viaplay.getImdbIdFromUrl(url);
    if(!id) return false;
    const trailerUrl = await tmdd.getTrailer(id);
    // Return trailerUrl string or false
    return trailerUrl ? trailerUrl : false;
  } catch (error) {
    // On error return false
    return false;
  };
};

/**
 * GET / route that respond with {"trailerUrl": ".."} when a
 * request with query param "url" (?url=http://..) is made.
 * @param {object} req HTTP request argument
 * @param {object} res HTTP response argument
 */
router.get("/", cache("5 minutes"), trailer.getTrailerSchema, async (req, res) => {
  const { url } = req.query;
  const trailerUrl = await getTrailerFromViaplayUrl(url);
  if(trailerUrl) {
    return res.send({trailerUrl});
  }
  return res.status(404).send({"error": "Not found"});
});

export default router;
