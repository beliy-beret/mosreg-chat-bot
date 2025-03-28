import style from './style.module.scss';
import avatar from 'assets/images/bot-avatar.svg';
import { MessageForm } from '../MessageForm';

const questions = [
  'Подобрать меры поддержки',
  'Льготы для бизнеса',
  'Какие документы нужны для экспорта',
  'Календарь инвестора',
];

type Props = {
  onSubmit: (message: string) => void;
};

export const StartMessage = ({ onSubmit }: Props) => {
  return (
    <div className={style.wrapper}>
      <div className={style.message}>
        <div className={style.ipalit}>
          <div className={style.imgContainer}>
            <img src={avatar} alt="" />
          </div>
          <div>
            <p>Привет, я Ипполит</p>
            <p className={style.question}>Чем вам помочь?</p>
          </div>
        </div>

        <MessageForm onSubmit={onSubmit} />

        <div className={style.questionList}>
          {questions.map((question, i) => {
            return (
              <div className={style.listItem} onClick={() => onSubmit(question)} key={i}>
                {question}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
