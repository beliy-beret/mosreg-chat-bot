import { createStore, createEffect, createEvent, sample } from 'effector';
import { DialogsStoreType } from './types.ts';
import { instance } from '../axiosInstance.ts';

export const $dialogs = createStore<DialogsStoreType>({
  list: [],
  loading: false,
  errorMessage: '',
});

export const fetchDialogList = createEvent();
const fetchDialogListFx = createEffect<void, unknown, Error>(async () => {
  const { data } = await instance.get('http://dev.invest.mosreg.ru:10012/');
  return data;
});

sample({
  clock: fetchDialogList,
  target: fetchDialogListFx,
});

fetchDialogListFx.doneData.watch((data) => {
  console.log(data);
});
