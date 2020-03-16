/* eslint-disable */
const withWebpack = require("./tools/next/next-less.config")
//env
const env = require('./tools/next/next-dotenv-object');
//require(process.env.n 'dotenv').config();

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => { };
}


const nextConfig = {
  env,
  target: 'server',
  poweredByHeader: false,
};

module.exports = { ...nextConfig, webpack: withWebpack };