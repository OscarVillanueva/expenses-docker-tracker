import { type FC } from 'react';
import { type AccumulatedResponse } from '../types/AccumulatedResponse'
import { accumulatedState } from '../state/accumulatedState'
import Accumulated from './Accumulated';

interface AccumulatedListProps {
  items: AccumulatedResponse
}

const AccumulatedList: FC<AccumulatedListProps> = ({ items }) => {
  const updateAcc = accumulatedState(state => state.updateAccumulated)

  const handleUpdateAcc = (id: string, value: string) => {
    updateAcc(Number(value))
  }

  return (
    <>
      {items.data.map(item => (
        <Accumulated
          key={item.id}
          id={item.uuid}
          title={item.name}
          initialValue={item.total}
          onSave={handleUpdateAcc}
        />
      ))}
    </>
  );
};

export default AccumulatedList;
