import { createEvent, createStore } from 'effector';
import { DialogType } from './types.ts';

export const $selectedDialog = createStore<DialogType | null>(null);
export const setSelectedDialog = createEvent<DialogType>();

$selectedDialog.on(setSelectedDialog, (_, dialog) => dialog);
