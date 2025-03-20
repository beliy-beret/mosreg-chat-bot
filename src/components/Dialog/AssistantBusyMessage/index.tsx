import style from './style.module.scss';
import ipolit from 'assets/images/bot-avatar.svg';

export const AssistantBusyMessage = () => {
  return (
    <div className={style.message}>
      <div className={style.imgContainer}>
        <img src={ipolit} alt="" />
      </div>
      <div className={style.preloaderDots}>
        <div className={style.dot}></div>
        <div className={style.dot}></div>
        <div className={style.dot}></div>
        <div className={style.dot}></div>
        <div className={style.dot}></div>
      </div>
    </div>
  );
};
