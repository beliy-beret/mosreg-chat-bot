import { createEvent, createStore } from 'effector';
import { DialogType } from './types.ts';

export const $selectedDialog = createStore<DialogType | null>(null);
export const setSelectedDialog = createEvent<DialogType>();
export const updateSelectedDialogTitle = createEvent<string>();
$selectedDialog
  .on(setSelectedDialog, (_, dialog) => dialog)
  .on(updateSelectedDialogTitle, (dialog, title) =>
    dialog ? { ...dialog, dialog_title: title } : dialog,
  );
