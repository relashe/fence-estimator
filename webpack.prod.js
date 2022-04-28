const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common");

const appPath = path.resolve(__dirname, "./app");
const distFolder = path.resolve(__dirname, "./dist");

module.exports = env => {
  return merge(common(env, true), {
    mode: "development",
    entry: {
      main: [path.join(appPath, "/index.build.js")]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          }
        }
      }
    },
    output: {
      path: distFolder,
      filename: "[name].bundle.js",
      chunkFilename: "[name].bundle.js",
      publicPath: "/"
    },
    plugins: [
      ...common(env).plugins,
      new webpack.DefinePlugin({
        NODE_ENV: "PROD"
      })
    ]
  });
};
