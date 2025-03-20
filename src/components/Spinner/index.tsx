import loader from 'assets/images/preloader.svg';
import style from './style.module.scss';

type Props = {
  size?: 'sm' | 'md' | 'lg';
};

export const Spinner = ({ size = 'lg' }: Props) => {
  return (
    <div className={`${style.imgContainer} ${size}`}>
      <img src={loader} alt="" />
    </div>
  );
};
