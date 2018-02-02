const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: path.join(__dirname, "src/app.js")
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: "vue-loader"
            }, {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.html/,
                loader: "html-loader"
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "vue-style-loader"]
                })
            },
            {
                test: /\.(jpg|png|gif)/,
                loader: "file-loader"
            },
            {
                test: /\.(ttf|woff|woff2|eot)/,
                loader: "url-loader"
            }
        ]
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
    },
    devServer: {
        host: "localhost",
        port: 8080,
        setup(app) {

        }
    },
    plugins: [
        new ExtractTextPlugin("main.css"),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./index.html"
        })
    ]
}