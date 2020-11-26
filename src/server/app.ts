import { addAliases } from 'module-alias';
/* eslint-disable import/first */
addAliases({
  '@interfaces': `${__dirname}/shared`,
  '@middlewares': `${__dirname}/middlewares`,
  '@config': `${__dirname}/config`
});
import Koa from 'koa';
import { createContainer, Lifetime } from 'awilix';
import { scopePerRequest, loadControllers } from 'awilix-koa';
import * as log4js from 'log4js';
import ErrorHandler from '@middlewares/ErrorHandler';
import render from 'koa-swig';
import co from 'co';
import serve from 'koa-static';
import { historyApiFallback } from 'koa2-connect-history-api-fallback';
import config from '@config/index';

// 生成错误日志
log4js.configure({
  appenders: { cheese: { type: `file`, filename: `${__dirname}/logs/error.log` } },
  categories: { default: { appenders: [`cheese`], level: `error` } }
});
const logger = log4js.getLogger("cheese");

const app = new Koa();

const {
  viewDir,
  staticDir,
  port,
  memoryFlag
} = config;
app.context.render = co.wrap(
  render<render.DefaultSettings>({
    root: viewDir,
    autospace: true,
    cache: memoryFlag,
    writeBody: false,
    ext: 'html'
  }),
);
app.use(serve(staticDir));

const container = createContainer();
// 将 services 注入到容器中
container.loadModules([`${__dirname}/services/*.ts`], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED
  }
});
// 将容器和 koa 融合起来
app.use(scopePerRequest(container));
// 拦截错误信息，这一步一定要放在路由注入之前，才能拦截的到
ErrorHandler.error(app, logger);
// 解决真假路由混用的问题
app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }));
// 将路由注入到 koa 中
app.use(loadControllers(`${__dirname}/routers/*.ts`));

app.listen(port, () => {
  console.log('服务启动成功！', port);
});
