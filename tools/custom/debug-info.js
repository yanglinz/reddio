import chalk from 'chalk';

import * as config from '../../config.js';


const environment = chalk.bold.green(config.ENVIRONMENT);
console.log(`Running process in ${environment} environment`);  // eslint-disable-line no-console
