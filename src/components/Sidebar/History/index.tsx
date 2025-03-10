import { HistoryItem } from './HistoryItem';
import { useState } from 'react';

const list = ['Название темы', 'Название темы', 'Название темы', 'Название темы', 'Название темы'];

export const History = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div>
      {list.map((item, i) => (
        <HistoryItem
          key={i}
          title={item}
          selected={i === selectedIndex}
          onSelected={() => setSelectedIndex(i)}
        />
      ))}
    </div>
  );
};
