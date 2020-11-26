import { IData } from './IData';

export interface IInfo {
  getInfo(): Promise<IData>;
}
