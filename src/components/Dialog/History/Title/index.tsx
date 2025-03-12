import { Pen } from 'assets/icons';
import { useState } from 'react';
import style from './style.module.scss';

type Props = {
  themeName: string;
};

export const Title = ({ themeName }: Props) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className={style.wrapper}>
      {!isEdit && (
        <div className={style.title}>
          <h1>{themeName}</h1>
          <button onClick={() => setIsEdit(true)}>
            <Pen />
          </button>
        </div>
      )}

      {isEdit && <input type="text" value={themeName} readOnly />}
    </div>
  );
};
