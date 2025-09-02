import { type FC, useEffect } from 'react';
import { actions } from 'astro:actions';
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
  

  const handleUpdateAcc = async (id: string, value: string) => {
    const exists = list.findIndex(e => e.uuid === id)

    if (exists === -1) {
      alert("The acc no exits")
      return 
    }

    const response = await actions.updateAccumulated({ uuid: id, name: list[exists].name, total: Number(value) })

    if (response) {
      updateList(list.with(exists, { ...list[exists], total: value }))
      updateAcc(Number(value))
      
      alert("Acc updated")
    }
    else alert("An error ocurrent")
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
