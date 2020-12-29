const Autoprefixer = require('autoprefixer');
const PATHS = require('./path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var rules = [{
    test: /\.html$/,
    loader: 'vue-html'
},
{
    test: /\.vue$/,
    loader: "vue-loader"
},
{
    test: /\.(js|jsx)$/,
    use: 'babel-loader',
    exclude: /node_modules/
},
{
    test: /\.(gif|png|jpe?g|svg)$/i,
    use: 'file-loader?name=images/[name].[ext]'
},
{
    test: /\.(sa|sc|c)ss$/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
        },
        {
            loader: 'vue-style-loader'
        },
        {
            loader: 'css-loader?url=false',
        },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: function () {
                        return [
                            require('precss'),
                            require('autoprefixer')
                        ];
                    }
                }
            }
        },
        {
            loader: 'sass-loader',
        }
    ]
}]

module.exports = rules;
