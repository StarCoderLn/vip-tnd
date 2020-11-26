import { add } from '@utils/index';

describe('函数单元测试', () => {
  test('test add function', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(2, 3)).toBe(5);
  })
})