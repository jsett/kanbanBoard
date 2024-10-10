import {
    atom,
    selector,
  } from 'recoil';

export const textState = atom({
    key: 'textState', 
    default: 'hello state',
  });

  export const boardState = atom({
    key: 'boardState',
    default: {},
  });

  export const currentUserState = atom({
    key: 'currentUser',
    default: 0,
  });