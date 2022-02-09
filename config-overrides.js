const webpack = require('webpack');

module.exports = function (configs, env) {
    configs.plugins.push(
        // Work around for Buffer is undefined:
        // https://github.com/webpack/changelog-v5/issues/10
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    );

    configs.resolve["fallback"] = {
        // assert: require.resolve('assert'),
        // crypto: require.resolve("crypto-browserify"),
        // http: require.resolve('stream-http'),
        // https: require.resolve('https-browserify'),
        // os: require.resolve('os-browserify/browser'),
        // stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
    }

    return configs;
}