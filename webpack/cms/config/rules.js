const Autoprefixer = require('autoprefixer');
const PATHS = require('./path');
const extractStyle = require('./extractStyle');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var rules = [{
    test: /\.(js|jsx)$/,
    use: 'babel-loader',
    exclude: /node_modules/
},
{
    test: /\.(gif|png|jpe?g|svg)$/i,
    use: 'file-loader?name=images/[name].[ext]'
},
{
    test: /\.vue$/,
    loader: "vue-loader",
},
{
    test: /\.html$/,
    loader: 'vue-html'
},
{
    test: /\.(sa|sc|c)ss$/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader
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
        },
        {
            loader: 'sass-resources-loader',
            options: {
                resources: [
                    PATHS.skin + '/core/css/config/_variables.scss',
                    PATHS.skin + '/core/css/tools/_mixins.scss'
                ]
            },
        },
    ]
}
]

module.exports = rules;
