import { createEvent, createStore } from 'effector';

export const $selectedDialogId = createStore<string | null>(null);
export const setSelectedDialogId = createEvent<string>();

$selectedDialogId.on(setSelectedDialogId, (_, id) => id);
