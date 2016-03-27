import _ from 'lodash';
import dotenv from 'dotenv';


dotenv.config({ silent: true });

const environment = _.defaults({}, process.env, {
  NODE_ENV: 'development',
  HOSTNAME: 'localhost',
  PORT: '5000'
});

export const NODE_ENV = environment.NODE_ENV;
export const ENVIRONMENT = NODE_ENV;
export const HOSTNAME = environment.HOSTNAME;
export const PORT = environment.PORT;
