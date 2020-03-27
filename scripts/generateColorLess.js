#!/usr/bin/env node
const path = require('path');
const { generateTheme } = require('antd-theme-generator');
const genCss = require('antd-pro-merge-less');
const dark = require('./dark-vars');

genCss(
  path.join(__dirname, '..'),
  [
    {
      theme: 'dark',
      fileName: './static/dark.css',
      modifyVars: {
        ...dark,
        '@site-text-color': '@heading-color',
        '@site-markdown-code-bg': '@input-bg',
      },
    },
  ],
  {
    ignoreAntd: true,
    isModule: false,
    cache: false,
    loadAny: true,
    ignoreProLayout: true,
  },
);

const options = {
  antdStylesDir: path.join(__dirname, '../node_modules/antd'),
  stylesDir: path.join(__dirname, '../src/styles'),
  varFile: path.join(__dirname, '../node_modules/antd/lib/style/themes/default.less'),
  mainLessFile: path.join(__dirname, '../src/styles/global.less'),
  themeVariables: ['@primary-color'],
  outputFilePath: path.join(__dirname, '../public/static/color.less'),
};

generateTheme(options);
