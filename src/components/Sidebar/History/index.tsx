import { HistoryItem } from './HistoryItem';
import { useUnit } from 'effector-react';
import { $dialogList, $selectedDialog, setSelectedDialog } from 'store/dialogs';
import style from './style.module.scss';

export const History = () => {
  const [{ list }, selectedDialog, onItemClick] = useUnit([
    $dialogList,
    $selectedDialog,
    setSelectedDialog,
  ]);

  return (
    <div className={style.dialogList}>
      {!!list.length &&
        list.map((dialog) => (
          <HistoryItem
            key={dialog.dialog_id}
            id={dialog.dialog_id}
            title={dialog.dialog_title}
            selected={dialog.dialog_id === selectedDialog?.dialog_id}
            onSelected={() => onItemClick(dialog)}
          />
        ))}
    </div>
  );
};
