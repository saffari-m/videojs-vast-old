const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const videoPlayerConfig = {
  entry: { player: "./src/vast-player.js" },

  output: {
    path: `${__dirname}/dist`,
    filename: "[name].js",
    chunkFilename: "[name].bundle.js",
  },

  target: "web",

  module: {
    rules: [
      { test: /\.js?$/, exclude: /node_modules/, loader: "babel-loader" },
    ],
  },

  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".js"],
  },
};

const standalonePluginConfig = Object.assign({}, videoPlayerConfig, {
  entry: {
    "videojs-vast": ["./src/vast-plugin.js", "./src/vast-player.css"],
  },
  externals: {
    "video.js": "videojs",
  },
  module: {
    rules: [
      { test: /\.js?$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
});

module.exports = [videoPlayerConfig, standalonePluginConfig];
