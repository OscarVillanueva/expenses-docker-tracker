import { type FC } from 'react';
import IconButton from './IconButton';

interface TransactionProps {
  id: string;
  name: string;
  date?: string;
  amount?: string;
  purpose?: string;
  isCash?: boolean;
  onRemove: (id: string) => void;
}

const Transaction: FC<TransactionProps> = ({ 
  id, 
  name, 
  date = "20 Jun 2025", 
  amount = "1200", 
  purpose = "Tattoo",
  isCash = true,
  onRemove 
}) => {
  const handleRemove = () => {
    const result = confirm(`Delete this transaction: ${name}`);
    
    if (result) {
      onRemove(id);
    }
  };

  return (
    <div className="flex items-center justify-between bg-secondary mb-3 p-4 rounded-md relative">
      <div className="flex items-center gap-4">
        <IconButton
          id={`transaction-remove-${id}`}
          iconName="lucide--coins hover:lucide--trash-2 text-3xl bg-blue-300"
          onClick={handleRemove}
        />
        
        <div>
          <p className="text-xl">{name}</p>
          <small className="block text-gray-400">{date}</small>
          <small className="font-light text-gray-400">{purpose}</small>
        </div>
      </div>

      <h4 className="text-accent text-2xl font-bold">{amount}</h4>
    </div>
  );
};

export default Transaction;
