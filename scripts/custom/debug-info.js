import chalk from 'chalk';

import * as config from '../../config.js';

const environment = config.CI ? `ci:${config.ENVIRONMENT}` : config.ENVIRONMENT;
const info = `Running process in ${chalk.bold.green(environment)} environment`;

console.log(info);  // eslint-disable-line no-console
