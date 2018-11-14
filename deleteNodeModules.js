
const shell = require('shelljs');
const chalk = require('chalk');

console.log(chalk.cyan(`Removing node_modules...\n`));
shell.rm("-rf", "node_modules");

console.log('Done\n');
