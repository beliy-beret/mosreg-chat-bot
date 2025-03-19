import { Store } from '../types';

export type MessageType = {
  created_at: string;
  format_message_text: string;
  user_type: 'assistant' | 'user';
};

export type MessageListStoreType = Store & {
  list: MessageType[];
  sendingMessage: boolean;
};
