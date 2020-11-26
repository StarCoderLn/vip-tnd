import { selector } from 'recoil';
import { idState } from '../atoms/idAtoms';

export const getId = selector({
  key: 'getId',
  get: ({get}) => {
    const id = get(idState);
    return id;
  }
})
