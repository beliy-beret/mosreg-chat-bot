import { Sidebar } from './components/Sidebar';
import { Dialog } from './components/Dialog';
import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { fetchDialogList } from './store/dialogs';

export const App = () => {
  const getDialogList = useUnit(fetchDialogList);

  useEffect(() => {
    getDialogList();
  }, []);

  return (
    <main>
      <Sidebar />
      <Dialog />
    </main>
  );
};
