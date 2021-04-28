"use strict";

const path = require("path");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("./webpack.config");

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  contentBase: path.join(__dirname, "public"),
  hot: true,
  historyApiFallback: true,
  inline: true,
  progress: true,
}).listen(3000, "0.0.0.0", function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log("Listening at 0.0.0.0:3000");
});
