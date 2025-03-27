import { Dispatch, SetStateAction } from 'react';
import { createEvent, sample, createEffect, createStore, createApi } from 'effector';
import { instance } from '../axiosInstance.ts';
import { $selectedDialog, updateSelectedDialogTitle } from '../dialogs';
import { MessageListStoreType, MessageType } from './types';
import { updateTitle } from '../dialogs/dialogList';
import { UpdateDialogTitlePayload } from '../dialogs/types.ts';

export const $messageList = createStore<MessageListStoreType>({
  list: [],
  errorMessage: '',
  loading: false,
  sendingMessage: false,
});

const { setList, setLoading, setErrorMessage, setSendingMessage } = createApi($messageList, {
  setList: (state, list: MessageType[]) => ({ ...state, list }),
  setLoading: (state, loading: boolean) => ({ ...state, loading }),
  setSendingMessage: (state, sendingMessage: boolean) => ({ ...state, sendingMessage }),
  setErrorMessage: (state, errorMessage: string) => ({ ...state, errorMessage }),
});

export const fetchMessageList = createEvent();
const fetchMessageListFx = createEffect<string, MessageType[], Error>(async (dialog_id) => {
  const { data } = await instance.get<{ messages: MessageType[] }>('/get_dialog_messages', {
    params: { dialog_id },
  });
  return data.messages;
});

sample({
  clock: fetchMessageList,
  source: $selectedDialog,
  filter: (dialog) => dialog !== null,
  fn: (dialog) => dialog!.dialog_id!,
  target: fetchMessageListFx,
});
sample({
  clock: fetchMessageListFx.failData,
  fn: (error) => error.message,
  target: setErrorMessage,
});
sample({
  clock: fetchMessageListFx.pending,
  target: setLoading,
});
sample({
  clock: fetchMessageListFx.doneData,
  target: setList,
});
sample({
  clock: fetchMessageListFx.done,
  fn: () => '',
  target: setErrorMessage,
});

export const sendMessage = createEvent<{
  setMessage: Dispatch<SetStateAction<MessageType[]>>;
  text: string;
  isFirstMessage: boolean;
}>();
const sendMessageFx = createEffect<
  {
    dialog_id: string;
    message: string;
    isFirstMessage: boolean;
    setMessage: Dispatch<SetStateAction<MessageType[]>>;
  },
  { dialog_id: string; message: string; isFirstMessage: boolean },
  Error
>(async ({ setMessage, ...payload }) => {
  const { data } = await instance.post<{ response: MessageType }>('/send_message', payload);
  setMessage((prev: MessageType[]) => [...prev, data.response]);
  return payload;
});

sample({
  clock: sendMessage,
  source: $selectedDialog,
  fn: (dialog, { text, setMessage, isFirstMessage }) => ({
    dialog_id: dialog!.dialog_id,
    message: text,
    isFirstMessage: isFirstMessage,
    setMessage,
  }),
  target: sendMessageFx,
});
sample({
  clock: sendMessageFx.pending,
  target: setSendingMessage,
});
sample({
  clock: sendMessageFx.failData,
  fn: (error) => error.message,
  target: setErrorMessage,
});
sample({
  clock: sendMessageFx.done,
  fn: () => '',
  target: setErrorMessage,
});
sample({
  clock: sendMessageFx.doneData,
  source: sendMessageFx.doneData,
  filter: (payload) => payload.isFirstMessage,
  fn: (payload): UpdateDialogTitlePayload => ({
    dialog_id: payload.dialog_id,
    title: payload.message,
  }),
  target: updateTitle,
});
sample({
  clock: sendMessageFx.doneData,
  source: sendMessageFx.doneData,
  filter: (payload) => payload.isFirstMessage,
  fn: (payload) => payload.message,
  target: updateSelectedDialogTitle,
});

export const clearMessageList = createEvent<string>();
const clearMessageListFx = createEffect<string, void, Error>(async (dialog_id) => {
  await instance.post('/clear_history', { dialog_id });
});

sample({
  clock: clearMessageList,
  target: clearMessageListFx,
});
sample({
  clock: clearMessageListFx.done,
  fn: () => [],
  target: setList,
});
