const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


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
        new HtmlWebpackPlugin({
            template: './src/pages/index.html', // Chemin vers votre fichier HTML de page d'accueil
            filename: 'index.html', // Nom du fichier de sortie
            chunks: ['page1'], // Inclure seulement les chunks associés à cette page
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/photographer.html', // Chemin vers votre fichier HTML de la page photographer
            filename: 'photographer.html', // Nom du fichier de sortie
            chunks: ['page2'], // Inclure seulement les chunks associés à cette page
        })
    ],
    rules: [
        {
            test: /\.(png|jpg|jpeg|gif|svg)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/', // Répertoire de sortie pour les images
                    },
                },
            ],
        },
        // ... d'autres règles pour d'autres types de fichiers statiques
    ]
};