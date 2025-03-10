import style from './style.module.scss';
import { StartMessage } from './StartMessage';

export const Dialog = () => {
  return (
    <section className={style.dialog}>
      <StartMessage />
    </section>
  );
};
