import { useRef, useEffect, useCallback } from 'react';
import style from './style.module.scss';
import { StartMessage } from './StartMessage';
import { useState } from 'react';
import { MessageForm } from './MessageForm';
import { History } from './History';
import { useUnit } from 'effector-react/compat';
import { sendMessage, fetchMessageList, clearMessageList, $messageList } from 'store/messages';
import { MessageType } from 'store/messages/types';
import { $selectedDialog } from 'store/dialogs';
import { Spinner } from '../Spinner';

export const Dialog = () => {
  const [dialog, { list, loading, sendingMessage }, sendMess, getMessageList, clearChat] = useUnit([
    $selectedDialog,
    $messageList,
    sendMessage,
    fetchMessageList,
    clearMessageList,
  ]);
  const historyRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  const onSendMessage = (text: string) => {
    const message: MessageType = {
      user_type: 'user',
      format_message_text: text,
      created_at: String(new Date()),
    };

    setMessages((prev) => [...prev, message]);

    sendMess({ setMessage: setMessages, text });
  };

  const onScrollToBottom = useCallback(() => {
    if (historyRef.current) {
      historyRef.current?.lastElementChild?.scrollIntoView();
    }
  }, [historyRef]);

  const onClearChat = () => {
    clearChat(dialog!.dialog_id);
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

  if (!dialog) {
    return (
      <section className={style.dialog}>
        <p>Нет ни одного диалога</p>
      </section>
    );
  }

  return (
    <section className={style.dialog}>
      {!messages.length && <StartMessage onSubmit={onSendMessage} />}
      {!!messages.length && (
        <>
          <History
            ref={historyRef}
            messages={messages}
            title={dialog.dialog_title || ''}
            dialogId={dialog.dialog_id}
          />
          <div className={style.messageForm}>
            {!!messages.length && (
              <button className={`btn gray ${style.clear}`} onClick={onClearChat}>
                Очистить
              </button>
            )}

            <button className={`btn black ${style.scroll}`} onClick={onScrollToBottom}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.3335 6.1133C11.2086 5.98913 11.0396 5.91943 10.8635 5.91943C10.6873 5.91943 10.5184 5.98913 10.3935 6.1133L8.00013 8.47329L5.64013 6.1133C5.51522 5.98913 5.34625 5.91943 5.17013 5.91943C4.994 5.91943 4.82504 5.98913 4.70013 6.1133C4.63764 6.17527 4.58805 6.249 4.5542 6.33024C4.52036 6.41148 4.50293 6.49862 4.50293 6.58663C4.50293 6.67464 4.52036 6.76177 4.5542 6.84301C4.58805 6.92425 4.63764 6.99799 4.70013 7.05996L7.52679 9.88663C7.58877 9.94911 7.6625 9.99871 7.74374 10.0326C7.82498 10.0664 7.91212 10.0838 8.00013 10.0838C8.08814 10.0838 8.17527 10.0664 8.25651 10.0326C8.33775 9.99871 8.41149 9.94911 8.47346 9.88663L11.3335 7.05996C11.3959 6.99799 11.4455 6.92425 11.4794 6.84301C11.5132 6.76177 11.5307 6.67464 11.5307 6.58663C11.5307 6.49862 11.5132 6.41148 11.4794 6.33024C11.4455 6.249 11.3959 6.17527 11.3335 6.1133Z"
                  fill="#FAFAFA"
                />
              </svg>
            </button>
            <div className={style.messageFormWrapper}>
              <MessageForm onSubmit={onSendMessage} rows={1} disabled={sendingMessage} />
            </div>
          </div>
        </>
      )}
    </section>
  );
};
