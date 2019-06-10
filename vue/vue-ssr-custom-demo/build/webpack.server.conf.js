const webpack = require("webpack");
const merge = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const baseConfig = require("./webpack.base.conf.js");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");

module.exports = merge(baseConfig, {
    target: "node",
    devtool: "#source-map",
    entry: "./src/entry-server.js",
    output: {
        filename: "server.js",
        libraryTarget: "commonjs2"
    },
    externals: nodeExternals({
        whitelist: /\.css$/
    }),
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
            "process.env.VUE_ENV": JSON.stringify("server")
        }),
        new VueSSRServerPlugin()
    ]
});
