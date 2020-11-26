module.exports = {
  // 设置识别哪些文件是测试文件（glob形式），与testRegex互斥，不能同时写
  testMatch: ["**/?(*.)(spec|test).ts?(x)"],
  // 设置识别哪些文件是测试文件（正则形式），与testMatch互斥，不能同时写
  // testRegex: '(/__tests__).*|(\\.|/)(test|spec))\\.jsx?$',
  // 测试环境，默认值是：jsdom，可修改为node
  testEnvironment: "jsdom",
  rootDir: "", // 默认值：当前目录，一般是 package.json 所在的目录
  moduleNameMapper: { // 需要在这里指定，才能在测试文件中使用 @utils、@components 的形式导入文件
    "^@components(.*)$": "<rootDir>/src/web/components$1",
    "^@utils(.*)$": "<rootDir>/src/web/utils$1",
    "^@models(.*)$": "<rootDir>/src/web/models$1",
    "^@assets(.*)$": "<rootDir>/src/web/assets$1"
  },
  coverageThreshold: { // 设置最小阈值，如果没有达到阈值，Jest 执行测试时将会失败。
    global: {
      branches: 50,
      functions: 95,
      lines: 95,
      statements: 95
    }
  },
  collectCoverage: true,
  coverageDirectory: "./docs/jest-coverage",
  coverageReporters: ["json", "html"],
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/"],
  moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx", "node"], //测试文件的类型
}