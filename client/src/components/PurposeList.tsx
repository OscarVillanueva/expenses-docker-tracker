import { type FC, useState } from 'react';
import Purpose from './Purpose';
import IconButton from './IconButton';
import { type PurposeData } from '../types/PurposeResponse'

interface PurposeListProps {
  purposes: PurposeData;
  onAddPurpose?: () => void;
}

const PurposeList: FC<PurposeListProps> = ({ purposes }) => {
  const handleAddPurpose = () => {
    const result = prompt("Name of the purpose")
    console.log({result})
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
        {purposes.data.map(purpose => (
          <Purpose
            key={purpose.id}
            title={purpose.name}
            id={purpose.uuid}
            onRemove={handleRemovePurpose}
            onSave={handleSavePurpose}
          />
        ))}
      </div>
    </section>
  );
};

export default PurposeList;
