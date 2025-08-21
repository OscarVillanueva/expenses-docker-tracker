import { type FC, useState } from 'react';
import Transaction from './Transaction';
import IconButton from './IconButton';
import { CreateTransactionModal } from './CreateTransactionModal'

interface TransactionItem {
  id: string;
  name: string;
  date?: string;
  amount?: string;
  purpose?: string;
  isCash?: boolean;
}

interface TransactionsProps {
  transactions?: TransactionItem[];
  onAddTransaction?: () => void;
}

const Transactions: FC<TransactionsProps> = ({ 
  transactions = [
    {
      id: "123",
      name: "Pago de quina",
      date: "20 Jun 2025",
      amount: "+ $ 1200",
      isCash: true
    },
    {
      id: "1234", 
      name: "Pago de quina",
      date: "20 Jun 2025",
      amount: "+ $ 1200",
      isCash: true
    }
  ],
}) => {
  const [transactionList, setTransactionList] = useState<TransactionItem[]>(transactions);
  const [open, setOpen] = useState(false)

  const handleAddTransaction = async () => {
  };

  const handleRemoveTransaction = (id: string) => {
    setTransactionList(prev => prev.filter(transaction => transaction.id !== id));
  };

  return (
    <>
      <CreateTransactionModal 
        open = { open }
        onClose = {() => setOpen(prev => !prev)}
        action = {handleAddTransaction}
      />

      <article className="h-[70vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl my-4 border-l border-l-2 border-gray-300 pl-2">Transactions</h2>

          <IconButton 
            iconName="lucide--circle-plus text-2xl" 
            id="add-transaction"
            onClick={() => setOpen(prev => !prev)}
          />
        </div>

        {transactionList.map(transaction => (
          <Transaction
            key={transaction.id}
            id={transaction.id}
            name={transaction.name}
            date={transaction.date}
            amount={transaction.amount}
            purpose={transaction.purpose}
            isCash={transaction.isCash}
            onRemove={handleRemoveTransaction}
          />
        ))}
      </article>
    </>
  );
};

export default Transactions;
