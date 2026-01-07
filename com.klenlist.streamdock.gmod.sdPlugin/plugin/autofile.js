const path = require('path');
const fs = require('fs-extra');

console.log('Start building the plugin...');

const currentDir = __dirname;

// Get the parent directory path
const parentDir = path.join(currentDir, '..');
// Get the parent directory name
const pluginName = path.basename(parentDir);

const pluginPath = path.join(process.env.APPDATA, 'HotSpot/StreamDock/plugins', pluginName);

try {
    // Remove the old plugin directory
    fs.removeSync(pluginPath);

    // Ensure the target directory exists
    fs.ensureDirSync(path.dirname(pluginPath));

    // Copy the current directory to the target path, excluding 'node_modules'
    fs.copySync(path.resolve(__dirname, '..'), pluginPath, {
        filter: (src) => {
            const relativePath = path.relative(path.resolve(__dirname, '..'), src);
            // Exclude 'node_modules' and '.git' directories and their subfiles
            return !relativePath.startsWith('plugin\\node_modules')
                 &&!relativePath.startsWith('plugin\\index.js')
                 &&!relativePath.startsWith('plugin\\package.json')
                 &&!relativePath.startsWith('plugin\\package-lock.json')
                 &&!relativePath.startsWith('plugin\\pnpm-lock.yaml')
                 &&!relativePath.startsWith('plugin\\yarn.lock')
                 &&!relativePath.startsWith('plugin\\build')
                 &&!relativePath.startsWith('plugin\\log')
                 &&!relativePath.startsWith('.git')
                 &&!relativePath.startsWith('.vscode');
        }
    });

    fs.copySync(path.join(__dirname, "build"), path.join(pluginPath, 'plugin'))

    console.log(`Plugin "${pluginName}" has been successfully copied to "${pluginPath}"`);
    console.log('Build successful----------------');
} catch (err) {
    console.error(`Error copying plugin "${pluginName}":`, err);
}