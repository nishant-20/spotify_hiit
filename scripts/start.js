'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Crashing the process in case of unhandled rejections.
process.on('unhandledRejection', err => {
    throw err;
});

require('../config/env');

const fs = require('fs');
// For terminal output linting
const chalk = require('chalk');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const {
    choosePort,
    createCompiler,
    prepareProxy,
    prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');
const paths = require('../config/paths');
const config = require('../config/webpack.config.dev');
const createDevServerConfig = require('../config/webpack.DevServer.config');
const useYarn = fs.existsSync(paths.yarnLockFile);
const isInteractive = process.stdout.isTTY;

if(!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    process.exit(1);
}

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.host || '0.0.0.0';

choosePort(HOST, DEFAULT_PORT)
    .then(port => {
        if(port == null) {
            return;
        }
        const protocol = process.env.HTTPS === 'true' ? "https" : "http";
        const appName = require(paths.appPackageJson).name;
        const urls = prepareUrls(protocol, HOST, port);
        const compiler = createCompiler(webpack, config, appName, urls, useYarn);
        const proxySetting = require(paths.appPackageJson).proxy;
        const proxyConfig = prepareProxy(proxySetting, paths.appPublic);
        const serverConfig = createDevServerConfig(proxyConfig, urls.lanUrlForConfig);
        const devServer = new webpackDevServer(compiler, serverConfig);
        devServer.listen(port, HOST, err => {
            if(err) {
                return console.log(err);
            }
            if(isInteractive) {
                clearConsole();
            }
            console.log(chalk.cyan('Starting the development server. \n'));
            openBrowser(urls.localUrlForBrowser);
        });

        ['SIGNINT', 'SIGTERM'].forEach(function(sig) {
            process.on(sig, function() {
                devServer.close();
                process.exit();
            });
        });
    })
    .catch(err => {
        if(err && err.message) {
            console.log(err.message);
        }
        process.exit(1);
    });