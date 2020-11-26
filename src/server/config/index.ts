import { join } from 'path';
import { extend } from 'lodash';

let config = {
  viewDir: join(__dirname, '..', 'views'),
  staticDir: join(__dirname, '..', 'assets'),
  port: 0,
  memoryFlag: false
}
if (process.env.NODE_ENV === 'development') {
  let devConfig = {
    port: 3000
  };
  config = extend(config, devConfig);
}
if (process.env.NODE_ENV === 'production') {
  let prodConfig = {
    port: 80,
    memoryFlag: 'memory'
  };
  config = extend(config, prodConfig);
}

export default config;