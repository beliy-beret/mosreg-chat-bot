import { Burger, AddDialog, Logo } from 'assets/icons';
import style from './style.module.scss';
import { useState } from 'react';
import { History } from './History';
import { useUnit } from 'effector-react';
import { createDialog, $createDialogPending } from 'store/dialogs';
import { Spinner } from '../Spinner';

export const Sidebar = () => {
  const [createDialogPending, onCreateDialog] = useUnit([$createDialogPending, createDialog]);
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
            <button
              className={`${style.addDialogBtn} btn black`}
              onClick={onCreateDialog}
              disabled={createDialogPending}
            >
              {!createDialogPending && (
                <>
                  <AddDialog />
                  Новый чат
                </>
              )}
              {createDialogPending && (
                <>
                  <Spinner size="sm" />
                  Подождите...
                </>
              )}
            </button>

            <History />
          </div>
        </div>
      </div>

      <div className={style.header}>
        <button className="btn black" onClick={toggleOpen}>
          <Burger />
        </button>
        <button className="btn black" onClick={onCreateDialog} disabled={createDialogPending}>
          {createDialogPending && <Spinner size="sm" />}
          {!createDialogPending && <AddDialog />}
        </button>
      </div>
    </div>
  );
};
