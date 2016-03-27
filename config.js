import _ from 'lodash';
import dotenv from 'dotenv';


dotenv.config({ silent: true });

const environment = _.defaults({}, process.env, {
  NODE_ENV: 'development',
  PORT: '5000',
  WEBPACK_DEV_SERVER_PORT: '5432'
});

export const NODE_ENV = environment.NODE_ENV;
export const ENVIRONMENT = NODE_ENV;
export const PORT = environment.PORT;
export const WEBPACK_DEV_SERVER_PORT = environment.WEBPACK_DEV_SERVER_PORT;
