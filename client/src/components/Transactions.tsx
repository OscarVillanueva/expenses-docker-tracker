import { type FC, useState } from 'react';
import Transaction from './Transaction';
import IconButton from './IconButton';

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
  onAddTransaction 
}) => {
  const [transactionList, setTransactionList] = useState<TransactionItem[]>(transactions);

  const handleAddTransaction = () => {
    if (onAddTransaction) {
      onAddTransaction();
    } else {
      // Default behavior: add a new transaction
      const newTransaction: TransactionItem = {
        id: Date.now().toString(),
        name: "New Transaction",
        date: new Date().toLocaleDateString('en-GB', { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric' 
        }),
        amount: "+ $ 0",
        isCash: true
      };
      setTransactionList(prev => [...prev, newTransaction]);
    }
  };

  const handleRemoveTransaction = (id: string) => {
    setTransactionList(prev => prev.filter(transaction => transaction.id !== id));
  };

  return (
    <article className="h-[70vh] overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl my-4 border-l border-l-2 border-gray-300 pl-2">Transactions</h2>

        <IconButton 
          iconName="lucide--circle-plus text-2xl" 
          id="add-transaction"
          onClick={handleAddTransaction}
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
  );
};

export default Transactions;
