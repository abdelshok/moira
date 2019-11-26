// Defines the general themes for terminal styling through the Chalk library
/* eslint-disable indent */

const chalk = require('chalk');

const error = chalk.yellow.bold;
const neutral = chalk.blue.bold;
const success = chalk.green.bold;
const important = chalk.magenta.bold;
const major = chalk.red.bold;
const light = chalk.red.cyan;

module.exports = {
    error,
    neutral,
    success,
    important,
    major,
    light,
};
