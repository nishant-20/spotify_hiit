'use strict';

const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const path = require('path');
const config = require('./webpack.config.dev');
const paths = require('./paths');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = function(proxy, allowedHost) {
    return {
        // disabling the host check if we have not specified the proxy setting. Or we let user to pass a special variable if needed
        disableHostCheck: !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
        // enabling gzip compression of generate files
        compress: true,
        clientLogLevel: 'none',
        // Only files in the public folder get served at the serverUrl
        contentBase: paths.appPublic,
        // Triggering reload for any file change in public folder
        watchContentBase: true,
        // CSS changes will trigger hot reloading, JS changes will reload the browser.
        hot: true,
        publicPath: config.output.publicPath,
        quiet: true,
        watchOptions: {
            ignored: new RegExp(`^(?!${path
                .normalize(paths.appSrc + '/')
                .replace(/[\\]+/g, '\\\\')}).+[\\\\/]node_modules[\\\\/]`,
                'g'
            ),
        },
        https: protocol ==='https',
        host: host,
        // disabling full screen overlays for compiler warnings/errors
        overlay: false,
        // displaying index.html for 404's
        historyApiFallback: {
            disableDotRule: true
        },
        public: allowedHost,
        proxy,
        before(app) {
            // allowing us to open files from runtime error overlay
            app.use(errorOverlayMiddleware());
            // resetting previous service worker registered for the same host:port combination. To avoid hitting production cache during development
            app.use(noopServiceWorkerMiddleware());
        },
    };
};