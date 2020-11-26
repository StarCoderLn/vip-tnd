import Rize from 'rize';
const rize = new Rize({ headless: false });

describe('e2e 测试', () => {
  test('test e2e', () => {
    rize
      .goto('http://localhost:3000')
      .click('#btn')
      .saveScreenshot('docs/jest-coverage/index.png')
      .click('#link')
      .saveScreenshot('docs/jest-coverage/baidu.png')
      .end();
  })
})