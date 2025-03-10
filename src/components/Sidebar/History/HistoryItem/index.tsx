import { useState } from 'react';
import style from './style.module.scss';
import { Tooltip } from 'components/Tooltip';
import { Pen, Trash } from 'assets/icons';

type Props = {
  title: string;
  selected: boolean;
  onSelected: () => void;
};

export const HistoryItem = ({ title, selected, onSelected }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isShowActions, setIsShowActions] = useState(false);

  const onEdit = () => {
    setIsEdit(true);
    setIsShowActions(false);
  };

  const onDelete = () => {
    setIsShowActions(false);
  };

  return (
    <div className={style.historyItem} aria-selected={selected}>
      {isShowActions && (
        <Tooltip>
          <button className={style.actionsItem} onClick={onEdit}>
            <Pen />
            Редактировать тему
          </button>
          <button className={style.actionsItem} onClick={onDelete}>
            <Trash />
            Удалить
          </button>
        </Tooltip>
      )}

      {isEdit ? (
        <input type="text" value={title} readOnly />
      ) : (
        <span className={style.title}>{title}</span>
      )}
      <button onClick={() => setIsShowActions(!isShowActions)} className={style.actionsBtn}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 3.5C6.19778 3.5 6.39112 3.44135 6.55557 3.33147C6.72002 3.22159 6.84819 3.06541 6.92388 2.88268C6.99957 2.69996 7.01937 2.49889 6.98079 2.30491C6.9422 2.11093 6.84696 1.93275 6.70711 1.79289C6.56725 1.65304 6.38907 1.5578 6.19509 1.51922C6.00111 1.48063 5.80004 1.50043 5.61732 1.57612C5.43459 1.65181 5.27841 1.77998 5.16853 1.94443C5.05865 2.10888 5 2.30222 5 2.5C5 2.76522 5.10536 3.01957 5.29289 3.20711C5.48043 3.39464 5.73478 3.5 6 3.5ZM6 8.5C5.80222 8.5 5.60888 8.55865 5.44443 8.66853C5.27998 8.77841 5.15181 8.93459 5.07612 9.11732C5.00043 9.30004 4.98063 9.50111 5.01922 9.69509C5.0578 9.88907 5.15304 10.0673 5.29289 10.2071C5.43275 10.347 5.61093 10.4422 5.80491 10.4808C5.99889 10.5194 6.19996 10.4996 6.38268 10.4239C6.56541 10.3482 6.72159 10.22 6.83147 10.0556C6.94135 9.89112 7 9.69778 7 9.5C7 9.23478 6.89464 8.98043 6.70711 8.79289C6.51957 8.60536 6.26522 8.5 6 8.5ZM6 5C5.80222 5 5.60888 5.05865 5.44443 5.16853C5.27998 5.27841 5.15181 5.43459 5.07612 5.61732C5.00043 5.80004 4.98063 6.00111 5.01922 6.19509C5.0578 6.38907 5.15304 6.56725 5.29289 6.70711C5.43275 6.84696 5.61093 6.9422 5.80491 6.98079C5.99889 7.01937 6.19996 6.99957 6.38268 6.92388C6.56541 6.84819 6.72159 6.72002 6.83147 6.55557C6.94135 6.39112 7 6.19778 7 6C7 5.73478 6.89464 5.48043 6.70711 5.29289C6.51957 5.10536 6.26522 5 6 5Z"
            fill="#585A64"
          />
        </svg>
      </button>
      <button className={style.selectBtn} onClick={onSelected}></button>
    </div>
  );
};
