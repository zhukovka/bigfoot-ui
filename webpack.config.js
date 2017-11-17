const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bigfoot-ui.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    }
};