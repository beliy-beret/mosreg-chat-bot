import { Sidebar } from './components/Sidebar';
import { Dialog } from './components/Dialog';
import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { fetchDialogList, $dialogList } from './store/dialogs';
import { $messageList } from './store/messages';
import { $initApp } from './store/app';
import { Spinner } from './components/Spinner';
import { ErrorMessage } from './components/ErrorMessage';

export const App = () => {
  const [{ errorMessage: dialogError }, { errorMessage: messageError }, initApp, getDialogList] =
    useUnit([$dialogList, $messageList, $initApp, fetchDialogList]);

  useEffect(() => {
    getDialogList();
  }, []);

  if (!initApp) {
    return (
      <main>
        <div className="spinner-wrapper">
          <Spinner />
        </div>
      </main>
    );
  }

  return (
    <>
      {(dialogError || messageError) && <ErrorMessage />}
      <main>
        <Sidebar />
        <Dialog />
      </main>
    </>
  );
};
