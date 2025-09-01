import {type FC, useState, type ChangeEvent } from 'react';
import IconButton from './IconButton';

interface AccumulatedProps {
  id: string;
  title: string
  initialValue: string;
  onSave: (id: string, newValue: string) => void;
}

const Accumulated: FC<AccumulatedProps> = ({ id, initialValue, title,onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(initialValue);

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-full mt-4 p-4 bg-secondary rounded-lg flex items-center justify-between">
      <div>
        <h2 className="text-xl">
          {title}
        </h2>

        <div className="flex items-center gap-1">
          <p className = "text-2xl font-bold">$</p>
          <input
            id={`acc-input-${id}`}
            type="text"
            disabled={!isEditing}
            className={`text-2xl font-bold border outline-none rounded-md ${
              isEditing ? 'border-gray-500' : 'border-transparent'
            }`}
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <IconButton
        id={`acc-edit-${id}`}
        iconName={isEditing ? "lucide--save text-xl" : "lucide--edit-3 text-xl"}
        onClick={handleEdit}
      />
    </div>
  );
};

export default Accumulated;
