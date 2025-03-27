import { createStore, createEffect, createEvent, sample, createApi } from 'effector';
import { DialogsStoreType, DialogType, UpdateDialogTitlePayload } from './types';
import { instance } from '../axiosInstance';
import { toggleInitApp } from '../app';
import { setSelectedDialog, updateSelectedDialogTitle } from './selectedDialog';

export const $dialogList = createStore<DialogsStoreType>({
  list: [],
  loading: false,
  errorMessage: '',
});

export const { setList, setLoading, setErrorMessage, addDialog, updateTitle } = createApi(
  $dialogList,
  {
    setList: (state, list: DialogType[]) => ({ ...state, list }),
    setLoading: (state, loading: boolean) => {
      return { ...state, loading };
    },
    setErrorMessage: (state, errorMessage: string) => ({ ...state, errorMessage }),
    addDialog: (state, dialog: DialogType) => ({ ...state, list: [dialog, ...state.list] }),
    updateTitle: (state, payload: UpdateDialogTitlePayload) => {
      const list = state.list.reduce((list: DialogType[], dialog) => {
        if (dialog.dialog_id === payload.dialog_id) {
          return [...list, { ...dialog, dialog_title: payload.title }];
        }
        return [...list, dialog];
      }, []);

      return { ...state, list };
    },
  },
);

export const fetchDialogList = createEvent();
const fetchDialogListFx = createEffect<void, { dialog: DialogType; dialogs: DialogType[] }, Error>(
  async () => {
    const { data } = await instance.get<{ dialog: DialogType; dialogs: DialogType[] }>('/l');
    return data;
  },
);

sample({
  clock: fetchDialogList,
  target: fetchDialogListFx,
});
sample({
  clock: fetchDialogListFx.doneData,
  fn: ({ dialogs }) => (dialogs?.length ? dialogs : []),
  target: [setList, toggleInitApp],
});
sample({
  clock: fetchDialogListFx.done,
  fn: () => '',
  target: setErrorMessage,
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
  fn: (error) => error.message,
  target: [setErrorMessage, toggleInitApp],
});

export const createDialog = createEvent();
const createDialogFx = createEffect<void, DialogType, Error>(async () => {
  const { data } = await instance.post<{ dialog: DialogType; dialogs: DialogType[] }>(
    '/create_dialog',
  );

  return data.dialog;
});

sample({
  clock: createDialog,
  target: createDialogFx,
});
sample({
  clock: createDialogFx.doneData,
  target: [addDialog, setSelectedDialog],
});
sample({
  clock: createDialogFx.doneData,
  fn: () => '',
  target: setErrorMessage,
});
sample({
  clock: createDialogFx.failData,
  fn: (error) => error.message,
  target: setErrorMessage,
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
  fn: () => '',
  target: [fetchDialogList, setErrorMessage],
});
sample({
  clock: deleteDialogFx.failData,
  fn: (error) => error.message,
  target: setErrorMessage,
});

export const updateDialogTitle = createEvent<UpdateDialogTitlePayload>();
const updateDialogTitleFx = createEffect<UpdateDialogTitlePayload, UpdateDialogTitlePayload, Error>(
  async (payload) => {
    await instance.post('/update_dialog', payload);
    if (payload.closeEditMode) {
      payload.closeEditMode();
    }

    return payload;
  },
);

sample({
  clock: updateDialogTitle,
  target: updateDialogTitleFx,
});

sample({
  clock: updateDialogTitleFx.doneData,
  target: updateTitle,
});
sample({
  clock: updateDialogTitleFx.doneData,
  fn: (payload) => payload.title,
  target: updateSelectedDialogTitle,
});

export const $createDialogPending = createStore<boolean>(false);
$createDialogPending.on(createDialogFx.pending, (_, pending) => pending);
