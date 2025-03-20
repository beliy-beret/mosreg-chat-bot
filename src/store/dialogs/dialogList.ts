import { createStore, createEffect, createEvent, sample, createApi } from 'effector';
import { DialogsStoreType, DialogType } from './types';
import { instance } from '../axiosInstance';
import { toggleInitApp } from '../app';
import { setSelectedDialog } from './selectedDialog';
import { debounce } from 'patronum/debounce';

export const $dialogList = createStore<DialogsStoreType>({
  list: [],
  loading: false,
  errorMessage: '',
});

const { setList, setLoading, setErrorMessage } = createApi($dialogList, {
  setList: (state, list: DialogType[]) => ({ ...state, list }),
  setLoading: (state, loading: boolean) => ({ ...state, loading }),
  setErrorMessage: (state, error: Error) => {
    const errorMessage = error.message;
    return { ...state, errorMessage };
  },
});

debounce(setLoading, 500);

export const fetchDialogList = createEvent();
const fetchDialogListFx = createEffect<void, { dialog: DialogType; dialogs: DialogType[] }, Error>(
  async () => {
    const { data } = await instance.get<{ dialog: DialogType; dialogs: DialogType[] }>('/');
    return data;
  },
);

sample({
  clock: fetchDialogList,
  target: fetchDialogListFx,
});

sample({
  clock: fetchDialogListFx.doneData,
  fn: ({ dialogs }) => dialogs,
  target: [setList, toggleInitApp],
});

sample({
  clock: fetchDialogListFx.doneData,
  fn: ({ dialog }) => dialog,
  target: setSelectedDialog,
});

sample({
  clock: fetchDialogListFx.pending,
  target: setLoading,
});

sample({
  clock: fetchDialogListFx.failData,
  target: setErrorMessage,
});

export const createDialog = createEvent();
const createDialogFx = createEffect<void, void, Error>(async () => {
  await instance.post<{ dialog: DialogType; dialogs: DialogType[] }>('/create_dialog');
});

sample({
  clock: createDialog,
  target: createDialogFx,
});

sample({
  clock: createDialogFx.done,
  target: fetchDialogList,
});

export const deleteDialog = createEvent<string>();
const deleteDialogFx = createEffect<string, void, Error>(async (dialog_id) => {
  await instance.post('/delete_dialog', { dialog_id });
});

sample({
  clock: deleteDialog,
  target: deleteDialogFx,
});

sample({
  clock: deleteDialogFx.done,
  target: fetchDialogList,
});
