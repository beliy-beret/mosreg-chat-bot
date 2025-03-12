import ipolit from 'assets/images/bot-avatar.svg';
import style from './style.module.scss';

type Props = {
  text: string;
  isBot: boolean;
};

export const Message = ({ text, isBot }: Props) => {
  return (
    <div aria-selected={isBot} className={style.message}>
      {isBot && (
        <div className={style.imgContainer}>
          <img src={ipolit} alt="" />
        </div>
      )}
      <div className={style.text} dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};
