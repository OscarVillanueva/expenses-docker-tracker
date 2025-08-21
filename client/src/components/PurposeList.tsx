import { type FC, useState } from 'react';
import Purpose from './Purpose';
import IconButton from './IconButton';

interface PurposeItem {
  id: string;
  title: string;
}

interface PurposeListProps {
  purposes?: PurposeItem[];
  onAddPurpose?: () => void;
}

const PurposeList: FC<PurposeListProps> = ({ 
  purposes = [
    { id: "123", title: "Tattoo" },
    { id: "1234", title: "Tattoo 1" },
    { id: "12345", title: "Tattoo 2" }
  ],
  onAddPurpose 
}) => {
  const [purposeList, setPurposeList] = useState<PurposeItem[]>(purposes);

  const handleAddPurpose = () => {
    const result = prompt("Name of the purpose")
    console.log({result})
  };

  const handleRemovePurpose = (id: string) => {
    setPurposeList(prev => prev.filter(purpose => purpose.id !== id));
  };

  const handleSavePurpose = (id: string, newTitle: string) => {
    setPurposeList(prev => 
      prev.map(purpose => 
        purpose.id === id 
          ? { ...purpose, title: newTitle }
          : purpose
      )
    );
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
        {purposeList.map(purpose => (
          <Purpose
            key={purpose.id}
            title={purpose.title}
            id={purpose.id}
            onRemove={handleRemovePurpose}
            onSave={handleSavePurpose}
          />
        ))}
      </div>
    </section>
  );
};

export default PurposeList;
