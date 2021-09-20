const path = require('path');

module.exports = {
  publicPath: './',
	//   lintOnSave: false, //關閉eslint檢查
	productionSourceMap: false,
	css: {
		sourceMap: true,
		// requireModuleExtension: false,
		loaderOptions: {
			sass: {
				prependData: '@import "@assets/sass/app.scss";'
			}
		}
	},
	/*
    url-loader will inline assets that are smaller than 4kb, using it can reduce the amount of HTTP requests.
    https://cli.vuejs.org/zh/guide/html-and-static-assets.html#从相对路径导入
  */
	chainWebpack: config => {
    config
      .plugin('html')
            .tap(args => {
                args[0].title = "The Glass Backstage";
                return args;
            }),
		config.module
			.rule('images')
			.use('url-loader')
			.loader('url-loader')
			.tap(options => Object.assign(options, { limit: 102400 })); // set the limit to 100kb instead;
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
				'@assets': path.resolve(__dirname, './src/assets'),
				'@components': path.resolve(__dirname, './src/components'),
				'@layout': path.resolve(__dirname, './src/layout'),
				'@router': path.resolve(__dirname, './src/router'),
				'@store': path.resolve(__dirname, './src/store'),
				'@views': path.resolve(__dirname, './src/views')
			}
		}
	}
};
