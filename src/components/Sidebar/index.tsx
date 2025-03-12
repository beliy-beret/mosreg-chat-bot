import { Burger, AddDialog, Logo } from 'assets/icons';
import style from './style.module.scss';
import { useState } from 'react';
import { History } from './History';

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  return (
    <div className={style.sideBar}>
      <div className={style.wrapper} aria-expanded={open}>
        <div className={style.nav}>
          <div className={style.logo}>
            <Logo />
            <span className={style.name}>
              Инвестиционный портал
              <br /> Московской области
            </span>

            <button onClick={toggleOpen}>
              <Burger />
            </button>
          </div>

          <div className={style.chatList}>
            <button className={`${style.addDialogBtn} btn black`}>
              <AddDialog />
              Новый чат
            </button>

            <History />
          </div>
        </div>
      </div>

      <div className={style.header}>
        <button onClick={toggleOpen}>
          <Burger />
        </button>
        <button>
          <AddDialog />
        </button>
      </div>
    </div>
  );
};
