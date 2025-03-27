import style from './style.module.scss';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Pen } from 'assets/icons';
import { useUnit } from 'effector-react';
import { updateDialogTitle } from 'store/dialogs';

type Props = {
  themeName: string;
  dialogId: string;
};

export const Title = ({ themeName, dialogId }: Props) => {
  const updateTitle = useUnit(updateDialogTitle);
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(themeName);

  const closeEditMode = () => {
    setIsEdit(false);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const sendNewTitle = () => {
    if (themeName !== inputValue) {
      return updateTitle({ title: inputValue, dialog_id: dialogId, closeEditMode });
    }
    closeEditMode();
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
