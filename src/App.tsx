import { Sidebar } from './components/Sidebar';
import { Dialog } from './components/Dialog';
import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { fetchDialogList, $dialogList } from './store/dialogs';
import { $initApp } from './store/app';

export const App = () => {
  const [{ errorMessage }, initApp, getDialogList] = useUnit([
    $dialogList,
    $initApp,
    fetchDialogList,
  ]);

  useEffect(() => {
    getDialogList();
  }, []);

  if (!initApp) {
    return (
      <div>
        <h1>Loading ...</h1>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div>
        <p>{errorMessage}</p>
      </div>
    );
  }

  return (
    <main>
      <Sidebar />
      <Dialog />
    </main>
  );
};
