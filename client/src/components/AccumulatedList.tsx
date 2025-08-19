import { type FC, useState } from 'react';
import Accumulated from './Accumulated';

interface AccumulatedItem {
  id: string;
  value: string;
}

interface AccumulatedListProps {
  items?: AccumulatedItem[];
}

const AccumulatedList: FC<AccumulatedListProps> = ({ 
  items = [
    { id: "ee54cf33-bb86-4799-99e5-a5c60f60b6db", value: "$4000" }
  ]
}) => {
  const [accumulatedItems, setAccumulatedItems] = useState<AccumulatedItem[]>(items);

  const handleSave = (id: string, newValue: string) => {
    setAccumulatedItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, value: newValue }
          : item
      )
    );
  };

  return (
    <>
      {accumulatedItems.map(item => (
        <Accumulated
          key={item.id}
          id={item.id}
          initialValue={item.value}
          onSave={handleSave}
        />
      ))}
    </>
  );
};

export default AccumulatedList;
