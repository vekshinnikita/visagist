const path = require("path")

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, 'visagiste/frontend/src/index.tsx'),
    output: {
        path: path.resolve(__dirname, "visagiste/frontend/static/frontend/"),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(sass|scss|less|css)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'visagiste/frontend/src/')
        },
    },
}
