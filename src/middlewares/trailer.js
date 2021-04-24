import Joi from "joi";
import { getTrailer } from "schemas";

/**
 * Validate schema and return errors from middleware
 * @param {object} req HTTP request argument to the middleware function
 * @param {object} res HTTP response argument to the middleware function
 * @param {function} next Callback argument to the middleware function
 * @param {object} schema Joi schema object
 */
const validateGetRequest = (req, res, next, schema) => {
  const options = {
    // include all errors
    abortEarly: false,
    // ignore unknown props
    allowUnknown: true,
    // remove unknown props
    stripUnknown: true
  };
  const { error, value } = schema.validate(req.query, options);
  if(error){
    res.status(400).send({
      "error": `${error.details.map(x => x.message).join(", ")}`
    });
  } else {
    req.body = value;
    next();
  }
};

/**
 * Validate GET /trailer query params
 * @param {object} req HTTP request argument to the middleware function
 * @param {object} res HTTP response argument to the middleware function
 * @param {function} next Callback argument to the middleware function
 */
export const getTrailerSchema = (req, res, next) => {
  const schema = getTrailer;
  validateGetRequest(req, res, next, schema);
};
