import { IInfo } from '@interfaces/IInfo';
import { IData } from '@interfaces/IData';

class InfoService implements IInfo {
  getInfo() {
    return new Promise<IData>((resolve) => {
      resolve({
        code: 200,
        data: [
          {
            id: '1',
            name: '深圳'
          },
          {
            id: '2',
            name: '广州'
          }
        ]
      });
    });
  }
}

export default InfoService;
