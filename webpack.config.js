var path = require("path");
//引入插件
var HtmlWebpackPlugin = require('html-webpack-plugin');

//如果使用的是webpack.config.json的方式来配置webpack-dev-server的运行参数的
//则需要引入webpack 在插件中新增一个 HotModuleReplacementPlugin
var webpack = require("webpack")

module.exports = {
    entry: path.join(__dirname, "src/main.js"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "build.js"
    },
    module: {
        rules: [
            {
                //test指的就是在webpack处理文件的时候，用来匹配文件的后缀
                test: /\.css$/,
                //当文件后缀匹配之后，会调用这个数组中的加载器对文件进行打包操作
                //调用加载器的顺序是从后向前的！
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.less$/,
                use: [ 'style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.sass$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|png|gif|jpeg|svg|ttf|woff|woff2|eot)$/,
                use: ['url-loader?limit=102400']
            },
            {
                test: /\.js$/,
                //下面的exclude就是做排除处理，只要是node_modules中的js文件就用babel-loader进行转换
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    //下面这个属性是专门用来配置 webpack-dev-server的运行参数的
    devServer: {
        contentBase: path.join(__dirname, "src"),
        compress: true,
        port: 9000,
        hot: true
    },
    resolve: {
        alias: {
            "vue": "vue/dist/vue.js"
        }
    }
}