import { Store } from '../types.ts';

export type DialogType = {
  id: number;
  title: string;
};

export type DialogsStoreType = Store & {
  list: DialogType[];
};
