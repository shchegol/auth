const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const commonPlugins = [
    // new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     jQuery: 'jquery'
    // }),
];
const devPlugins = commonPlugins.concat([
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new CleanWebpackPlugin(['public']),
    // new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin(),

]);
const prodPlugins = commonPlugins.concat([
    new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
    new ExtractTextPlugin('styles.css'),
    new UglifyJsPlugin(),
    // new BrotliPlugin({
    //     asset: '[path].br[query]',
    //     test: /\.(js|css|html|svg)$/,
    //     threshold: 10240,
    //     minRatio: 0.8
    // }),
    // new CompressionPlugin({
    //     asset: '[path].gz[query]',
    //     algorithm: 'gzip', // zopfli
    //     test: /\.(js|css|html|svg)$/,
    //     threshold: 10240,
    //     minRatio: 0.8
    // })
]);

const devEntry = [
    // `webpack-hot-middleware/client?path=http://localhost:3030/__webpack_hmr&reload=true`,
    // 'babel-polyfill',
    // './styles/main.scss',
    './client.jsx'
];

const prodEntry = [
    './client.jsx'
];

module.exports = env => {
    console.log('NODE_ENV: ', env.NODE_ENV);
    console.log('Production: ', env.production);

    return {
        context: path.resolve(__dirname, 'src'),
        resolve: {
            modules: ['node_modules', 'src'],
            extensions: ['.js', '.jsx']
        },
        entry: env.production ? prodEntry : devEntry,
        output: {
            path: __dirname + '/public/assets/',
            filename: 'bundle.js',
        },

        plugins: env.production ? prodPlugins : devPlugins,

        module: {
            rules: [
                {
                    test: /\.(html)$/,
                    use: {
                        loader: 'html-loader',
                        options: {
                            attrs: [':data-src']
                        }
                    }
                },
                // {
                //     test: /\.css$/,
                //     use: ExtractTextPlugin.extract({
                //         fallback: 'style-loader',
                //         use: 'css-loader'
                //     })
                // },
                // {
                //     test: /\.scss$/,
                //     use: ["style-loader", "css-loader", "sass-loader"]
                // },
                {
                    test: /(\.css|\.scss)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: ['css-loader', 'postcss-loader', 'sass-loader']
                    })
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: ['env'],
                            plugins: ['transform-runtime']
                        }
                    }
                },
                { test: /\.jsx?$/, exclude: [/node_modules/, /public/], use: 'babel-loader' },
                { test: /\.json$/, use: 'json-loader' },
                { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1' },
                // { test: /\.gif$/, use: 'url-loader?limit=10000&mimetype=image/gif' },
                // { test: /\.jpg$/, use: 'url-loader?limit=10000&mimetype=image/jpg' },
                // { test: /\.png$/, use: 'url-loader?limit=10000&mimetype=image/png' },
                // { test: /\.svg/, use: 'url-loader?limit=26000&mimetype=image/svg+xml' },

                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ]
        },

        devtool: !env.production ? 'inline-source-map' : false
    }
};