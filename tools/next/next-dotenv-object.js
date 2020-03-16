const path = require('path');
const dotenv = require('dotenv');

const dev = process.env.NODE_ENV !== 'production';
const rootPath = path.resolve(__dirname, '../../');

const dotEnvPath = dev ? `${rootPath}/.env` : `${rootPath}/.env.production`;

dotenv.config({ path: dotEnvPath });

module.exports = {
  PORT: process.env.PORT,
  BASE_ADDRESS: process.env.BASE_ADDRESS,
  TIME_OUT: process.env.TIME_OUT

}