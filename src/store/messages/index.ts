import { Dispatch, SetStateAction } from 'react';
import { createEvent, sample, createEffect, createStore, createApi } from 'effector';
import { instance } from '../axiosInstance.ts';
import { $selectedDialog } from '../dialogs';
import { MessageListStoreType, MessageType } from './types';

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
  setErrorMessage: (state, error: Error) => {
    const errorMessage = error.message;
    return { ...state, errorMessage };
  },
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
  clock: fetchMessageListFx.pending,
  target: setLoading,
});
sample({
  clock: fetchMessageListFx.failData,
  target: setErrorMessage,
});
sample({
  clock: fetchMessageListFx.doneData,
  target: setList,
});

export const sendMessage = createEvent<{
  setMessage: Dispatch<SetStateAction<MessageType[]>>;
  text: string;
}>();
const sendMessageFx = createEffect<
  { dialog_id: string; message: string; setMessage: Dispatch<SetStateAction<MessageType[]>> },
  void,
  Error
>(async ({ setMessage, ...payload }) => {
  const { data } = await instance.post<{ response: MessageType }>('/send_message', payload);
  setMessage((prev: MessageType[]) => [...prev, data.response]);
});

sample({
  clock: sendMessage,
  source: $selectedDialog,
  fn: (dialog, { text, setMessage }) => ({
    dialog_id: dialog!.dialog_id,
    message: text,
    setMessage,
  }),
  target: sendMessageFx,
});

sample({
  clock: sendMessageFx.pending,
  target: setSendingMessage,
});
