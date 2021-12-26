'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// Fetch the current working directory
const appDirectory = fs.realpathSync(process.cwd());
// Function to lookup and return the file path
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
    const hasSlash = path.endsWith('/');
    if(hasSlash && !needsSlash) {
        return path.substr(path, path.length-1);
    } else if(!hasSlash && needsSlash) {
        return `${path}/`;
    } else {
        return path;
    }
}

// Using PUBLIC_URL or homepage variable in package.json(not yet defined) to infer the public paths where the app is served.
const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage;

function getServerPath(appPackageJson) {
    const publicUrl = getPublicUrl(appPackageJson);
    const serverUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
    return ensureSlash(serverUrl);
}

module.exports = {
    dotenv: resolveApp('.env'),
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('src/index.js'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    yarnLockFile: resolveApp('yarn.lock'),
    testsSetup: resolveApp('src/setupTests.js'),
    appNodeModules: resolveApp('node_modules'),
    publicUrl: getPublicUrl(resolveApp('package.json')),
    servedPath: getServerPath(resolveApp('package.json'))
};