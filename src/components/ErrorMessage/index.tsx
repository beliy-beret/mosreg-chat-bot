import imgSrc from 'assets/images/errorImg.svg';
import { Message, Reload } from 'assets/icons';
import style from './style.module.scss';

export const ErrorMessage = () => {
  const onReload = () => {
    window.location.reload();
  };

  return (
    <div className={style.wrapper}>
      <div className={style.card}>
        <img src={imgSrc} alt="" />
        <span className={style.title}>Ошибка</span>
        <span className={style.message}>упс сервис не доступен :(</span>

        <div className={style.btns}>
          <button className="btn black" onClick={onReload}>
            <Reload />
            Обновить
          </button>

          <a href="https://support.invest.mosreg.ru/" target="_blank">
            <Message />
            Сообщить о проблеме
          </a>
        </div>
      </div>
    </div>
  );
};
