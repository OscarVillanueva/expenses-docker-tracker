import { type FC } from 'react';
import { type AccumulatedResponse } from '../types/AccumulatedResponse'
import Accumulated from './Accumulated';

interface AccumulatedListProps {
  items: AccumulatedResponse
}

const AccumulatedList: FC<AccumulatedListProps> = ({ items }) => {

  return (
    <>
      {items.data.map(item => (
        <Accumulated
          key={item.id}
          id={item.uuid}
          title={item.name}
          initialValue={item.total}
          onSave={() => {}}
        />
      ))}
    </>
  );
};

export default AccumulatedList;
