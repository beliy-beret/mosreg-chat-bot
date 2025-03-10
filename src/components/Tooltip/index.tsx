import { ReactNode } from 'react';
import style from './style.module.scss';

type Props = {
  children: ReactNode;
};

export const Tooltip = ({ children }: Props) => {
  return <div className={style.tooltip}>{children}</div>;
};
