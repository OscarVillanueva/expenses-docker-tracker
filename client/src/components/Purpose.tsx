import { type FC, useState, type ChangeEvent } from 'react';
import IconButton from './IconButton';
import { commifyNumber } from '../utils/commifyNumbers'

interface PurposeProps {
  title: string;
  id: string;
  total: string;
  onRemove: (id: string) => void;
  onSave: (id: string, newTitle: string) => void;
}

const Purpose: FC<PurposeProps> = ({ title, id, total, onRemove, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);

  const handleEdit = () => {
    if (!isEditing) {
      // Edit action
      setIsEditing(true);
    } else {
      // Save action
      setIsEditing(false);
      onSave(id, inputValue);
    }
  };

  const handleRemove = async () => {
    const result = confirm(`Delete ${id} purpose`);

    if (result) {
      onRemove(id);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <article id={`purpose-${id}`} className="bg-secondary rounded-md p-4 basis-full">
      <div className="flex items-center justify-between">
        <input
          id={`purpose-input-${id}`}
          value={inputValue}
          disabled={!isEditing}
          onChange={handleInputChange}
          className={`text-xl text-gray-400 outline-none border rounded-md ${
            isEditing ? 'border-gray-500' : 'border-transparent'
          }`}
        />

        <div className="flex items-center gap-2">
          <IconButton 
            iconName={isEditing ? "lucide--save" : "lucide--edit-3"} 
            id={`purpose-edit-${id}`}
            onClick={handleEdit}
          />
          <IconButton 
            iconName="lucide--trash-2" 
            id={`purpose-remove-${id}`}
            onClick={handleRemove}
          />
        </div>
      </div>

      <p className="text-2xl font-bold">{commifyNumber(`$${total}`)}</p>
    </article>
  );
};

export default Purpose;
