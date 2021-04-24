import Joi from "joi";

/**
 * Get a single trailer request schema
 */
export const getTrailer = Joi.object({
  url: Joi.string().required()
});
