import { Store } from '../types.ts';

export type DialogType = {
  dialog_id: string;
  dialog_title: string;
};

export type DialogsStoreType = Store & {
  list: DialogType[];
};

export type UpdateDialogTitlePayload = {
  dialog_id: string;
  title: string;
  closeEditMode?: () => void;
};
