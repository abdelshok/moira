// Defines the general themes for terminal styling through the Chalk library
/* eslint-disable indent */

const chalk = require('chalk');

const error = chalk.yellow;
const neutral = chalk.blue;
const success = chalk.green;
const important = chalk.magenta;
const major = chalk.red;
const light = chalk.red.cyan;
const purpleBold = chalk.blue.bold;
const lightNeonGreen = chalk.hex('#18FF7D');
const lightNeonPurple = chalk.hex('#BC13FE');
const casualRed = chalk.hex('#FF3939');
const realRed = chalk.hex('#FF0000');

module.exports = {
    error,
    neutral,
    success,
    important,
    major,
    light,
    purpleBold,
    lightNeonGreen,
    lightNeonPurple,
    casualRed,
    realRed,
};
