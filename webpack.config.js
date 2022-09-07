const webpack = require("webpack"),
    DefinePlugin = webpack.DefinePlugin,
    path = require("path"),
    CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin,
    CopyWebpackPlugin = require("copy-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    WriteFilePlugin = require("write-file-webpack-plugin"),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    zipWebpackPlugin = require('zip-webpack-plugin'),
    pgk = require('./src/manifest.json');


var fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

var options = {
    mode: "production",
    entry: {
        'popup-style': './src/popup/popup.less',
        // background: "./src/background/background.js",
        content: "./src/content/content.js",
        popup: "./src/popup/popup.js",
        kekw: './src/content/kekw.less',
    },
    output: {
        path: path.join(__dirname, "./build"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader",
                ],
            },
            {
                test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
                use: ["file-loader"],
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        // clean the build folder
        new CleanWebpackPlugin(),
        new DefinePlugin({
            __PLUGIN_VERSION__: `"${pgk.version}"`,

        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/manifest.json" },
                { from: "src/icons", to: "icons" },
                { from: "src/override/student_app.js" },
                { from: "src/background", to: "background.bundle.js" }
            ]
        }),
        new HtmlWebpackPlugin({
            template: "./src/popup/popup.html",
            filename: "popup.html",
            chunks: ["popup"]
        }),
        new WriteFilePlugin(),
        new MiniCssExtractPlugin(),
        new zipWebpackPlugin({
            path: '.',
            filename: 'ea-sux-dist.zip'
        })
    ]
};

module.exports = options;