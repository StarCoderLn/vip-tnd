import axios from 'axios';
// 解决跨域问题
axios.defaults.adapter = require('axios/lib/adapters/http');

describe('接口测试', () => {
  test('test info interface', async () => {
    return axios
      .get('http://localhost:3000/api/info')
      .then(res => {
        const data = res.data.data;
        expect(data[0].id).toBe('1'); 
        expect(data[0].name).toBe('深圳');
      })
  })
})