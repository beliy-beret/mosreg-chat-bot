import style from './style.module.scss';

type Props = {
  themeName: string;
};

export const Title = ({ themeName }: Props) => {
  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        <h1>{themeName}</h1>
      </div>
    </div>
  );
};
