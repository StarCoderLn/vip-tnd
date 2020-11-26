# vip-tnd
React17 +TypeScript4 + Webpack5 + Koa + Awilix + Unit/E2E/Service test + Recoil 实现的 BFF(IOC) 项目

## 项目整体流程

- 使用 webpack 将 web 文件夹里的 html 文件送到 dist 文件夹里的 views 文件夹中，其他的静态资源送到 dist 文件夹里的 assets 文件夹中。

```
index.html -> dist/views
静态资源 -> dist/assets
```

```sh
npm run client:dev
```

- 使用 gulp 将 server 文件夹里的内容送到 dist 文件夹里。

```sh
npm run server:dev
```

- 最终上线的内容就都在 dist 文件夹里，只要把整个 dist 文件夹拷贝上线就行了。

- 以上步骤弄好之后，在本地只要先执行以下命令启动服务就可以了。

```sh
npm run server:start
```

然后在浏览器中访问 http://localhost:3000/ 就可以正常看到页面了。

## 实现注意点

1. 安装 webpack5，有坑

2. npm install scripty

3. 先搞定热更新，webpack5 改动保存后页面不刷新

4. babel-loader 处理 ts
   先安装 @babel/preset-react @babel/preset-typescript

5. 入口 index.js index.ts -> index.tsx

6. html-webpack-plugin

7. yarn add react react-dom react-router-dom 

  (dist目录)有 cjs umd 文件包

8. 像 react、react-dom 和 react-router-dom 这些比较大的第三方包，就不要安装依赖了，不然打包出来的文件会很大。可以采用 cdn 引入的方式，然后在 webpack.config.js 中配置就可以正常使用了，打包的时候也不会占用大小。

```html
<script src="https://cdn.staticfile.org/react/17.0.1/umd/react.development.min.js"></script>
<script src="https://cdn.staticfile.org/react-dom/16.8.0/umd/react-dom.development.js"></script>
<script src="https://cdn.staticfile.org/react-router-dom/5.2.0/react-router-dom.min.js"></script>
```

```js
externals: {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'react-router-dom': 'ReactRouterDOM'
}
```

9. hot reload 生产的webpack文件里

10. web 目录 react结构 node 目录

11. 建立 index.d.ts
    declare module '*.css';

12. 建立 tsconfig.json，千万不要从网上复制，需要什么加什么。

- server 里的 tsconfig.json 和最外面的 tsconfig.json 作用是不一样，里面的是给上线的时候用的，外面的是在开发阶段用的。

13. 在安装一些包的时候，除了安装原本的包，还需要再装一个 @types/ 的包，比如 react-router-dom 和 @types/react-router-dom，否则 ts 会报错。

14. 记住！webpack serve 命令并不会生成 dist 文件夹，所以要先运行 webpack 命令生成 dist 文件夹，然后用 webpack serve 命令执行。

15. 记住！当在浏览器中访问根目录时，要确保 dist 目录下的 html 文件是 index.html，才能找得到。

16. 安装 babel-plugin-transform-class-properties 插件，并在 .babelrc 文件中添加配置 "plugins": ["transform-class-properties"]，来解决 react 类组件中使用 static 报错的问题。

17. 使用 koa new 一个实例的时候会发现报了一个错：“TypeError: koa_1.default is not a constructor”，此时导入方式得改成下面这样才没问题。

```js
import * as Koa from 'koa';
```

18. 不需要手动的去导入 services 和 controller，通过 awilix 和 awilix-koa 注入就可以了。

19. 拦截错误信息的步骤必须放在路由注入之前，才能拦截得到错误信息。

20. 已经编写了 koa-swig 的声明文件了，但是使用以下命令运行的时候还是报错说找不到声明文件。

```sh
ts-node src/server/app.ts
```

解决办法就是改成以下命令运行：

```sh
ts-node-dev --respawn --transpile-only ./dist/app.ts
```

21. 使用 postcss 来处理 css 嵌套写法。


22. 如果启动服务后在浏览器中访问发现资源找不到，一般就是 assets 目录下没内容或者是没有配 publicPath: '/'。

23. 在做接口测试时，会碰到跨域问题，此时加上以下配置就可以了。

```js
axios.defaults.adapter = require('axios/lib/adapters/http');
```

还会碰到这个问题：“ReferenceError: regeneratorRuntime is not defined”，解决方法是安装 @babel/plugin-transform-runtime，并在 .babelrc 中配置：

```
"plugins": ["@babel/transform-runtime"]
```

24. linux 查看端口占用情况，比如查看 3000 端口的占用情况。

```sh
lsof -i:3000
```

杀掉占用端口的进程：

```sh
kill -9 9207(PID)
```

## 编写 server 用到的包

1. 使用 koa 来编写 nodejs 服务端程序。

2. 使用 koa-router 处理路由。

3. 使用 koa-swig 来完成模板渲染。

4. 使用 koa-static 来处理静态资源。

5. 使用 awilix、awilix-koa 来完成依赖注入。awilix 是一个使用TypeScript编写的功能强大的JavaScript / Node依赖注入（DI）容器。

6. 使用 module-alias 来创建目录别名。

7. 使用 co 以更优雅的方式编写非阻塞代码。主要就是让 * 函数能够自己执行，不用再通过调用 next 方法去执行。

8. 使用 koa2-connect-history-api-fallback 用于处理vue-router使用history模式返回index.html，让koa2支持SPA应用程序。

9. 使用 log4js 来生成日志信息。