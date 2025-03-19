import { useRef, useEffect } from 'react';
import style from './style.module.scss';
import { StartMessage } from './StartMessage';
import { useState } from 'react';
import { MessageForm } from './MessageForm';
import { History } from './History';
import { useUnit } from 'effector-react/compat';
import { sendMessage, fetchMessageList, $messageList } from 'store/messages';
import { MessageType } from 'store/messages/types';
import { $selectedDialog } from 'store/dialogs';

export const Dialog = () => {
  const [dialog, { list, loading }, sendMess, getMessageList] = useUnit([
    $selectedDialog,
    $messageList,
    sendMessage,
    fetchMessageList,
  ]);
  const historyRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const onSendMessage = (text: string) => {
    const message: MessageType = {
      user_type: 'user',
      format_message_text: text,
      created_at: String(new Date()),
    };

    setMessages((prev) => [...prev, message]);

    sendMess({ setMessage: setMessages, text });
  };

  useEffect(() => {
    historyRef.current?.lastElementChild?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    if (dialog) {
      getMessageList();
    }
  }, [dialog]);

  useEffect(() => {
    setMessages(list);
  }, [list]);

  if (loading) {
    return (
      <section className={style.dialog}>
        <h2>Loading...</h2>
      </section>
    );
  }

  return (
    <section className={style.dialog}>
      {!messages.length && <StartMessage onSubmit={onSendMessage} />}
      {!!messages.length && (
        <>
          <History ref={historyRef} messages={messages} title={dialog?.dialog_title || ''} />
          <div className={style.messageForm}>
            <MessageForm onSubmit={onSendMessage} />
          </div>
        </>
      )}
    </section>
  );
};
