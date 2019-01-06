const extractStyle = require('./extractStyle');
const Autoprefixer = require('autoprefixer');

const LOADERS = function (env) {
    let loaders = [{
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
    }, {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: 'file-loader?name=images/[name].[ext]'
    },
    {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
            loaders: {
                scss: "vue-style-loader!css-loader!sass-loader",
                sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
            }
        }
    }, {
        test: /\.html$/,
        loader: 'vue-html'
    },
    {
        test: /\.css$/,
        use: extractStyle.extract({
            fallback: 'style-loader',
            use: [{
                loader: 'css-loader?url=false'
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: function () {
                        return [Autoprefixer('last 2 versions', 'ie 10')];
                    }
                }
            }
            ]
        })
    }, {
        test: /\.scss$/,
        use: extractStyle.extract({
            fallback: 'style-loader',
            use: [{
                loader: 'css-loader?url=false'
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: function () {
                        return [Autoprefixer('last 2 versions', 'ie 10')];
                    }
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    includePaths: ['node_modules']
                }
            },
            ]
        })
    }];
    return loaders;
};

module.exports = LOADERS;