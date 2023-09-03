const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        page1: './src/scripts/pages/index.js', // Le point d'entrée de votre application
        page2: './src/scripts/pages/photographer.js'
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src'), // Chemin absolu vers le répertoire 'src'
        },
    },
    output: {
        filename: '[name].bundle.js', // Le nom du fichier de sortie
        path: path.resolve(__dirname, 'dist'), // Le répertoire de sortie
        publicPath: ''
    },
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            BASE_URL: JSON.stringify(process.env.BASE_URL),
        }),
    ]
};