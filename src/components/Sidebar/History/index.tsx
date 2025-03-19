import { HistoryItem } from './HistoryItem';
import { useUnit } from 'effector-react/compat';
import { $dialogList, $selectedDialogId, setSelectedDialogId } from 'store/dialogs';

export const History = () => {
  const [{ list, loading }, selectedDialogId, onItemClick] = useUnit([
    $dialogList,
    $selectedDialogId,
    setSelectedDialogId,
  ]);

  if (loading) {
    return (
      <div>
        <h4>Loading ...</h4>
      </div>
    );
  }

  return (
    <div>
      {!!list.length &&
        list.map((dialog) => (
          <HistoryItem
            key={dialog.dialog_id}
            id={dialog.dialog_id}
            title={dialog.dialog_title}
            selected={dialog.dialog_id === selectedDialogId}
            onSelected={() => onItemClick(dialog.dialog_id)}
          />
        ))}
    </div>
  );
};
