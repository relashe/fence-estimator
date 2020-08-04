const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appPath = path.resolve(__dirname, "./app");
const publicFolder = path.resolve(__dirname, "./public");

module.exports = (env, isMvc = true) => {
  return {
    resolve: {
      alias: {
        app: path.resolve(__dirname, "app/"),
        components: path.resolve(__dirname, "app/components/"),
        miniJourneys: path.resolve(__dirname, "app/pages/MiniJourneys/")
      }
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        },
        {
          test: /\.(scss|css)$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                plugins: function() {
                  return [require("autoprefixer")];
                }
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ],
          include: [appPath]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Fence Estimator",
        template: path.join(publicFolder, "/index.html")
      })
    ]
  };
};
