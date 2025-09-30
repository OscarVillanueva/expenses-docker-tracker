import { type FC, useMemo } from 'react';
import IconButton from './IconButton';
import { type Transaction as TransactionItem } from '../types/TransactionResponse'
import { formatDate } from '../utils/formatDate'

interface TransactionProps {
  transaction: TransactionItem
  onRemove: (id: string) => void;
}

const Transaction: FC<TransactionProps> = ({ transaction, onRemove }) => {
  const date = useMemo(() => {
    return formatDate(transaction.date)
  }, [transaction])

  const handleRemove = () => {
    const result = confirm(`Delete this transaction: ${transaction.name}`);
    
    if (result) {
      onRemove(transaction.uuid);
    }
  };

  return (
    <div className="flex items-center justify-between bg-secondary mb-3 p-3 rounded-md relative">
      <div className="flex items-center gap-4">
        <IconButton
          id={`transaction-remove-${transaction.id}`}
          iconName={`${transaction.is_cash ? "lucide--coins" : "lucide--credit-card"} hover:lucide--trash-2 text-3xl bg-blue-300`}
          onClick={handleRemove}
        />
        
        <div>
          <p className="text-xl">{transaction.name}</p>
          <small className="block text-gray-400">{date}</small>
          <small className="font-light text-gray-400">{transaction.purposeName}</small>
        </div>
      </div>

      <h4 className={`${transaction.is_expense ? "text-red-600" : "text-accent"} text-2xl font-bold`}>
        ${transaction.amount}
      </h4>
    </div>
  );
};

export default Transaction;
