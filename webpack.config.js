const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        page1: path.resolve(__dirname, 'src/scripts/pages/index.js'),
        page2: path.resolve(__dirname, 'src/scripts/pages/photographer.js')
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
    watch: true
};