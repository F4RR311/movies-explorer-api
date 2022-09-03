const secretTokenKey = 'secret-key';
const mongodbServer = 'mongodb://127.0.0.1:27017/moviesdb';
const port = 3000;

const jwtSettings = {
  expiresIn: '7d',
};

const cookieSettings = {
  httpOnly: true,
  sameSite: true,
  maxAge: 3600000 * 24 * 7,
};

const corsSettings = {
  origin: [
    // 'https://api.f4rr311.nomoredomains.sbs',
    // 'https://api.f4rr311.nomoredomains.sbs',
    'https://f4rr311.nomoredomains.xyz',
    'http://f4rr311.nomoredomains.xyz',
    'localhost:3000',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,

  allowedHeaders: [
    'Content-Type',
    'Origin',
    'Referer',
    'Accept',
    'Authorization',
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204,

};

module.exports = {
  secretTokenKey,
  mongodbServer,
  port,
  jwtSettings,
  cookieSettings,
  corsSettings,
};
