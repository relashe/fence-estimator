const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common");

const appPath = path.resolve(__dirname, "./app");
const distFolder = path.resolve(__dirname, "./dist");

module.exports = env => {
  return merge(common(env, false), {
    mode: "development",
    entry: {
      main: [path.join(appPath, "/index.js")]
    },
    output: {
      path: distFolder,
      filename: "[name].bundle.js",
      chunkFilename: "[name].bundle.js",
      publicPath: "/"
    },
    devtool: "source-map",
    devServer: {
      contentBase: distFolder,
      compress: true,
      hot: true,
      overlay: true,
      port: 2030,
      publicPath: "/",
      historyApiFallback: true
    },
    plugins: [
      ...common(env).plugins,
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(env.NODE_ENV)
      })
    ]
  });
};
