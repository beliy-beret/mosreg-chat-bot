import { ChangeEvent, useState, useEffect, KeyboardEvent, useRef } from 'react';
import style from './style.module.scss';
import { Spinner } from '../../Spinner';

type Props = {
  onSubmit: (value: string) => void;
  defaultValue?: string;
  rows?: number;
  disabled?: boolean;
};

export const MessageForm = ({ onSubmit, defaultValue = '', rows = 1, disabled = false }: Props) => {
  const [message, setMessage] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(resizeTextArea, [message]);

  const onChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.currentTarget.value);
  };

  const onSendMessage = () => {
    if (message.trim().length) {
      onSubmit(message.trim());
      setMessage('');
    }
  };

  const onEnterPress = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'Enter' && !!message.trim().length) {
      setMessage((state) => state + '\r\n');
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      onSendMessage();
    }
  };

  useEffect(() => {
    setMessage(defaultValue);
  }, [defaultValue]);

  return (
    <div className={style.form}>
      <textarea
        ref={textAreaRef}
        className={style.field}
        value={message}
        placeholder="Сообщение"
        onChange={onChangeMessage}
        onKeyDown={onEnterPress}
        rows={rows}
        autoFocus
      ></textarea>

      <button className={`${style.submit} btn blue`} onClick={onSendMessage} disabled={disabled}>
        {disabled && <Spinner size="sm" />}
        {!disabled && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.3602 7.52667L6.58682 3.76C6.52484 3.69752 6.45111 3.64792 6.36987 3.61408C6.28863 3.58023 6.20149 3.56281 6.11348 3.56281C6.02548 3.56281 5.93834 3.58023 5.8571 3.61408C5.77586 3.64792 5.70213 3.69752 5.64015 3.76C5.51598 3.88491 5.44629 4.05388 5.44629 4.23C5.44629 4.40613 5.51598 4.5751 5.64015 4.7L8.94015 8.03334L5.64015 11.3333C5.51598 11.4582 5.44629 11.6272 5.44629 11.8033C5.44629 11.9795 5.51598 12.1484 5.64015 12.2733C5.70189 12.3363 5.77552 12.3864 5.85677 12.4208C5.93802 12.4551 6.02528 12.473 6.11348 12.4733C6.20169 12.473 6.28894 12.4551 6.37019 12.4208C6.45144 12.3864 6.52507 12.3363 6.58682 12.2733L10.3602 8.50667C10.4278 8.44424 10.4818 8.36847 10.5188 8.28414C10.5557 8.19981 10.5748 8.10874 10.5748 8.01667C10.5748 7.9246 10.5557 7.83353 10.5188 7.7492C10.4818 7.66487 10.4278 7.5891 10.3602 7.52667Z"
              fill="#FAFAFA"
            />
          </svg>
        )}
      </button>
    </div>
  );
};
