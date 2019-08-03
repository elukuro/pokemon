var HtmlWebpackPlugin = require('html-webpack-plugin')
//var ExtractTextPlugin = require('extract-text-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var webpack = require('webpack')
var path = require('path')

var isProd = process.env.NODE_ENV === 'production' // true or false
var cssDev = ['style-loader', 'css-loader', 'sass-loader']

// var cssProd = ExtractTextPlugin.extract({
//   fallback: 'style-loader',
//   use: ['css-loader', 'sass-loader'],
//   publicPath: '/'
// })

var cssProd=[
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        // you can specify a publicPath here
        // by default it uses publicPath in webpackOptions.output
        publicPath: '../styles',
        hmr: process.env.NODE_ENV === 'development',
      },
    },
    'css-loader',
  ];

var cssConfig = isProd ? cssProd : cssDev

module.exports={
    entry:{
        app:'./src/index.js'
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'script/[name].bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
                
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                use: [
                  'file-loader?name=[name].[ext]&outputPath=images/',
                  'image-webpack-loader'
                ]
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        open: false,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: './src/template/index.html',
            minify: {
                  collapseWhitespace: false
              },
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
         
        new webpack.HotModuleReplacementPlugin(),
    ]
}