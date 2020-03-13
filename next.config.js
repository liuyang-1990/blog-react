/* eslint-disable */
const withWebpack = require("./tools/next/next-less.config.js")
require('dotenv').config();

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => { };
}


const nextConfig = {
  env: {
    TEST_VAR: process.env.TEST_VAR,
  },
  target: 'server',
  poweredByHeader: false,
};

module.exports = { ...nextConfig, webpack: withWebpack };