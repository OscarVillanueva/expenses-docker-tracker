import { type FC, useEffect } from 'react';
import { actions } from 'astro:actions';
import Purpose from './Purpose';
import IconButton from './IconButton';
import { type PurposeData, type Purpose as PurposeItem} from '../types/PurposeResponse'
import { purposeState } from '../state/purposeState'

interface PurposeListProps {
  purposes: PurposeData;
  onAddPurpose?: () => void;
}

const PurposeList: FC<PurposeListProps> = ({ purposes }) => {
  const state = purposeState(state => state)

  useEffect(() => {
    state.setList(purposes.data)
  }, [])

  const handleAddPurpose = async () => {
    const result = prompt("Name of the purpose")

    if(!result || result.trim() === "") {
      alert("invalid name")
      return
    }
    
    const purpose = await actions.createPurpose({ name: result})

    if (!purpose) {
      alert("An error ocurred")
      return
    }

    const append: PurposeItem = {
      id: 0,
      uuid: purpose.data.data,
      name: result,
      total: "0",
      belong_to: "",
      created_at: `${Date.now()}`
    }

    state.setList([...state.list, append])
  };

  const handleRemovePurpose = (id: string) => {
  };

  const handleSavePurpose = (id: string, newTitle: string) => {

  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl my-4 border-l border-l-2 border-gray-300 pl-2">Purposes</h2>
        
        <IconButton 
          iconName="lucide--circle-plus text-2xl" 
          id="add-purpose"
          onClick={handleAddPurpose}
        />
      </div>

      <div className="ml-2 pb-4 flex items-center gap-4 overflow-x-auto">
        {state.list.map(purpose => (
          <Purpose
            key={purpose.id}
            title={purpose.name}
            id={purpose.uuid}
            total = {purpose.total}
            onRemove={handleRemovePurpose}
            onSave={handleSavePurpose}
          />
        ))}
      </div>
    </section>
  );
};

export default PurposeList;
