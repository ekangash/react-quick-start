const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => ({
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        publicPath: '/',
    },
    watch: argv.mode !== 'production', // если mode = production => не отслеживать файлы
    mode: argv.mode === 'production' ? 'production' : 'development',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@common': path.resolve(__dirname, './src/common'),
            '@config': path.resolve(__dirname, './src/config'),
            '@entities': path.resolve(__dirname, './src/entities'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@services': path.resolve(__dirname, './src/services'),
            '@packages': path.resolve(__dirname, './src/packages'),
            '@store': path.resolve(__dirname, './src/store'),
            '@endpoints': path.resolve(__dirname, './src/endpoints'),

            '@app': path.resolve(__dirname, './src/app'),
            '@shared': path.resolve(__dirname, './src/components/shared'),
            '@layout': path.resolve(__dirname, './src/components/layout'),
            '@template': path.resolve(__dirname, './src/components/template'),
            '@features': path.resolve(__dirname, './src/components/features'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@enums': path.resolve(__dirname, './src/enums'),
        },
        extensions: ['.js', '.jsx']
    },
    devServer: {
        devMiddleware: {
            writeToDisk: true,
        },
        hot: true,
        historyApiFallback: true,
        liveReload: true,
        open: true,
        compress: true,// сжатие файлов
        port: 3010,
        watchFiles: ['./src/**/*.*'],
        static: false,
    },
    module: {
        rules: [
            {
                test: /.(jsx|js)$/,
                exclude: /(node_modules)|(__tests__)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        filename: '[name].[contenthash].[ext]',
                    },
                },
            },
            {
                test: /.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './images',
                            name: '[name].[contenthash].[ext]',
                        }
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: argv.mode === 'production',
        }),
        new CleanWebpackPlugin({
            protectWebpackAssets: false,
            cleanOnceBeforeBuildPatterns: ['**/*', '!.gitignore'],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                sourceMap: false,
                format: {
                    comments: false,
                },
            },
            extractComments: false,
        })],
        splitChunks: {
            cacheGroups: {
                /**
                 * Вынесение модулей react-а (react, react-dom, react-router-dom) в отдельный бандл
                 * Браузер положит в кеш этот файл и больше не будет подгружать эти библиотеки
                 * Файл vendor-react.js подключается в ассетах (ReactAsset)
                 */
                reactVendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                    filename: 'vendor-react.js',
                    chunks: 'all',
                },
            },
        },
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
});