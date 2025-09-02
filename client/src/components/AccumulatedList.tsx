import { type FC, useEffect } from 'react';
import { type AccumulatedResponse } from '../types/AccumulatedResponse'
import { accumulatedState } from '../state/accumulatedState'
import Accumulated from './Accumulated';

interface AccumulatedListProps {
  items: AccumulatedResponse
}

const AccumulatedList: FC<AccumulatedListProps> = ({ items }) => {
  const list = accumulatedState(state => state.list)
  const updateAcc = accumulatedState(state => state.updateAccumulated)
  const updateList = accumulatedState(state => state.setList)

  useEffect(() => {
    updateList(items.data)
  }, [])
  

  const handleUpdateAcc = (id: string, value: string) => {
    const l = list.find(e => e.uuid === id)
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
