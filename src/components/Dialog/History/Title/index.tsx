import { Pen } from 'assets/icons';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import style from './style.module.scss';

type Props = {
  themeName: string;
};

export const Title = ({ themeName }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(themeName);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const sendNewTitle = () => {
    setIsEdit(false);
    console.log(inputValue);
  };

  const onEnterPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      sendNewTitle();
    }
  };

  return (
    <div className={style.wrapper}>
      {!isEdit && (
        <div className={style.title}>
          <h1>{themeName}</h1>
          <button className="btn black" onClick={() => setIsEdit(true)}>
            <Pen />
          </button>
        </div>
      )}

      {isEdit && (
        <div className={style.titleForm}>
          <input
            type="text"
            value={inputValue}
            onChange={onChange}
            onBlur={sendNewTitle}
            onKeyDown={onEnterPress}
            autoFocus
          />

          <button className="btn black" onClick={() => setIsEdit(true)}>
            <Pen />
          </button>
        </div>
      )}
    </div>
  );
};
