import { ReactNode, forwardRef } from 'react';
import style from './style.module.scss';

type Props = {
  children: ReactNode;
};

export const Tooltip = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return (
    <div ref={ref} className={style.tooltip}>
      {children}
    </div>
  );
});
