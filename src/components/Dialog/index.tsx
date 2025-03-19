import { useRef, useEffect } from 'react';
import style from './style.module.scss';
import { StartMessage } from './StartMessage';
import { useState } from 'react';
import { MessageForm } from './MessageForm';
import { History } from './History';
import { MessageType } from './types.ts';

export const Dialog = () => {
  const historyRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const sendMessage = (message: string) => {
    const newMessage: MessageType = {
      id: Date.now(),
      text: message,
      isBot: false,
    };
    setMessages((state) => [...state, newMessage]);
  };

  useEffect(() => {
    historyRef.current?.lastElementChild?.scrollIntoView();
  }, [messages]);

  return (
    <section className={style.dialog}>
      {!messages.length && <StartMessage onSubmit={sendMessage} />}
      {!!messages.length && (
        <>
          <History ref={historyRef} messages={messages} />
          <div className={style.messageForm}>
            <MessageForm onSubmit={sendMessage} />
          </div>
        </>
      )}
    </section>
  );
};
