import { type FC, useState, useEffect } from 'react';
import Transaction from './Transaction';
import IconButton from './IconButton';
import { CreateTransactionModal } from './CreateTransactionModal'
import { type Data } from '../types/TransactionResponse'
import { transactionState } from '../state/transactionState'

interface TransactionsProps {
  transactions: Data;
  onAddTransaction: () => void;
}

const Transactions: FC<TransactionsProps> = ({ transactions, onAddTransaction }) => {
  const state = transactionState(state => state)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    state.setList(transactions.data) 
  }, [])

  const handleAddTransaction = async () => {
  };

  const handleRemoveTransaction = (id: string) => {
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

        {state.list && state.list.map(transaction => (
          <Transaction
            key={transaction.id}
            transaction = { transaction }
            onRemove={handleRemoveTransaction}
          />
        ))}
      </article>
    </>
  );
};

export default Transactions;
