import assert from 'assert';

import * as config from './config.js';
import { webpackWatchConfig } from './tools/webpack/webpack.js';

assert(!config.IS_PROD, 'Cannot run watch in production');

const cfg = webpackWatchConfig();
export default cfg;
