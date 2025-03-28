import { forwardRef } from 'react';
import { Title } from './Title';
import style from './style.module.scss';
import { Message } from '../Message';
import { MessageType } from 'store/messages/types.ts';
import { useUnit } from 'effector-react';
import { $messageList } from 'store/messages';
import { AssistantBusyMessage } from '../AssistantBusyMessage';

type Props = {
  messages: MessageType[];
  title: string;
  dialogId: string;
};

export const History = forwardRef<HTMLDivElement, Props>(({ messages, title, dialogId }, ref) => {
  const { sendingMessage } = useUnit($messageList);

  return (
    <div className={style.wrapper}>
      <Title themeName={title} dialogId={dialogId} />
      <div ref={ref} className={style.messageList}>
        {messages.map((message, i) => (
          <Message
            key={i}
            text={message.format_message_text}
            isBot={message.user_type === 'assistant'}
          />
        ))}
        {sendingMessage && <AssistantBusyMessage />}
      </div>
    </div>
  );
});
