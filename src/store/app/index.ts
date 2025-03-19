import { createEvent, createStore } from 'effector';

export const $initApp = createStore<boolean>(false);
export const toggleInitApp = createEvent();

$initApp.on(toggleInitApp, () => true);
