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
import { Spinner } from '../Spinner';

export const Dialog = () => {
  const [dialog, { list, loading, sendingMessage }, sendMess, getMessageList] = useUnit([
    $selectedDialog,
    $messageList,
    sendMessage,
    fetchMessageList,
  ]);
  const historyRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [pageLoading, setPageLoading] = useState(false);

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

  useEffect(() => {
    if (loading) return setPageLoading(true);
    const timeoutId = setTimeout(() => setPageLoading(false), 300);

    return () => clearTimeout(timeoutId);
  }, [loading]);

  if (pageLoading) {
    return (
      <section className={style.dialog}>
        <div className={style.spinnerWrapper}>
          <Spinner />
        </div>
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
            <MessageForm onSubmit={onSendMessage} rows={1} disabled={sendingMessage} />
          </div>
        </>
      )}
    </section>
  );
};
