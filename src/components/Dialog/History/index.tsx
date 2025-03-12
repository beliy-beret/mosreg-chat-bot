import { forwardRef } from 'react';
import { Title } from './Title';
import style from './style.module.scss';
import { MessageType } from '../types.ts';
import { Message } from '../Message';

type Props = {
  messages: MessageType[];
};

export const History = forwardRef<HTMLDivElement, Props>(({ messages }, ref) => {
  return (
    <div className={style.wrapper}>
      <Title themeName="Truncate String with Ellipsis" />
      <div ref={ref} className={style.messageList}>
        {messages.map((message) => (
          <Message key={message.id} text={message.text} isBot={message.isBot} />
        ))}
      </div>
    </div>
  );
});
