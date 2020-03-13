const cssLoaderConfig = require('@zeit/next-css/css-loader-config')

const ANTD_STYLE_REGX = /antd\/.*?\/style.*?/;

module.exports = (config, options) => {
  if (!options.defaultLoaders) {
    throw new Error(
      'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade',
    );
  }

  const { dev, isServer } = options;
  
  config.node = { fs: 'empty' };

  // MODULE
  const baseLessConfig = {
    dev,
    isServer,
    loaders: [
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
         // modifyVars: antdModifyVars,
        },
      },
    ],
    extensions: ['less'],
    cssLoaderOptions: {
      sourceMap: false,
      importLoaders: 2,
    },
  };

  config.module.rules.push({
    test: /\.less$/,
    exclude: /\.module\.less$/,
    use: cssLoaderConfig(config, {
      ...baseLessConfig,
      cssModules: false,
      cssLoaderOptions: {
        sourceMap: false,
        importLoaders: 2,
      },
    }),
  });

  config.module.rules.push({
    test: /\.module\.less$/,
    use: cssLoaderConfig(config, {
      ...baseLessConfig,
      cssModules: true,
      cssLoaderOptions: {
        sourceMap: false,
        importLoaders: 2,
        localIdentName: dev ? '[local]--[hash:4]' : '[local]--[hash:4]',
      },
    }),
  });

  config.module.rules.push({
    test: /\.(jpg|jpeg|png|svg|ttf|woff|woff2|eot|otf)$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 1024, // base64
        publicPath: '/_next/static/',
        outputPath: 'static/',
        name: '[name].[ext]',
      },
    },
  });

  //
  // SERVER
  if (isServer) {
    const rawExternals = [...config.externals];

    config.externals = [
      // eslint-disable-next-line consistent-return
      (context, request, callback) => {
        if (request.match(ANTD_STYLE_REGX)) {
          return callback();
        }

        if (typeof rawExternals[0] === 'function') {
          rawExternals[0](context, request, callback);
        } else {
          callback();
        }
      },
      ...(typeof rawExternals[0] === 'function' ? [] : rawExternals),
    ];

    config.module.rules.unshift({
      test: ANTD_STYLE_REGX,
      use: 'null-loader',
    });
  }

  if (typeof config === 'function') {
    return config;
  }

  return config;
};
