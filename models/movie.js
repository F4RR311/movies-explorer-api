const { Schema, model, Types } = require('mongoose');

const validator = require('validator');

const movie = new Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  },
  owner: {
    type: Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,

  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },

}, { versionKey: false });

module.exports = model('movie', movie);
