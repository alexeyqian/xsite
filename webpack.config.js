const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const APP_DIR = path.resolve(__dirname, 'src/client');
const BUILD_DIR = path.resolve(__dirname, 'public');

var config = {
    entry: {
        home: [APP_DIR + '/HomeContainer.js'],
        //search: [APP_DIR + '/SearchContainer.js'],
    },
    output: {
        path: BUILD_DIR,
        filename: 'js/[name].js'
    },
    module: {
        rules: [
          {
              test: /\.js$/,
              loader: "babel-loader",
              options: {
                presets: [["es2015", {modules: false}], "react"]
              }
          },
          {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: [
                { loader: "css-loader",  options: {sourceMap: true}},
                { loader: "sass-loader", options: {sourceMap: true}}
              ]
            })
          },
        ]
    },
    plugins: [
      new ExtractTextPlugin("css/site.css"),
    ]
};

module.exports = config;
