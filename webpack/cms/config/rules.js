const Autoprefixer = require('autoprefixer');
const PATHS = require('./path');
const extractStyle = require('./extractStyle');

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
        options: {
            loaders: {
                scss: "vue-style-loader!css-loader!sass-loader",
                sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
            }
        }
    },
    {
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
                        plugins: function() {
                            return [Autoprefixer('last 2 versions', 'ie 10')];
                        }
                    }
                }
            ]
        })
    },
    {
        test: /\.scss$/,
        use: extractStyle.extract({
            fallback: 'style-loader',
            use: [{
                    loader: 'css-loader?url=false'
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function() {
                            return [Autoprefixer('last 2 versions', 'ie 10')];
                        }
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        includePaths: ['node_modules']
                    }
                }, {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: [
                            PATHS.skin + '/core/css/config/_variables.scss',
                            PATHS.skin + '/core/css/tools/_mixins.scss'
                        ]
                    },
                },
            ]
        })
    }
]

module.exports = rules;