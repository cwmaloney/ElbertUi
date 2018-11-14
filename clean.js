
const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');

const buildParameters = {
  // output folder
  outputFolderName: "dist",
  outputFolderPath: path.join(__dirname, "dist"),
};

console.log(chalk.cyan(`Removing build (${buildParameters.outputFolderPath})...\n`));
shell.rm('-rf', buildParameters.outputFolderPath);

console.log(chalk.cyan(`Removing Parcel build cache (.cache)...\n`));
shell.rm('-rf', ".cache");

console.log('Done\n');
