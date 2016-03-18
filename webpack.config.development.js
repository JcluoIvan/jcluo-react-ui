var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8000',
        'webpack/hot/only-dev-server',
        './test/App.jsx',
    ],
    output: {
        path: 'www/js',
        filename: 'build.js'
    },
    resolve: {
        extensions: ['', '.jsx', '.js', '.json', '.less']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
            }, {
                test: /\.less$/,
                loaders: ['style', 'css', 'postcss', 'less']
            }
        ]
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]

}