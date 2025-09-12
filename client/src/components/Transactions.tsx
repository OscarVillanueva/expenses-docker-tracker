import { type FC, useState, useEffect } from "react";
import { actions } from "astro:actions";
import Transaction from "./Transaction";
import IconButton from "./IconButton";
import { type Data, type Transaction as TransactionItem } from "../types/TransactionResponse";
import { transactionState } from "../state/transactionState";
import { purposeState } from "../state/purposeState";
import { dateWithOffset } from "../utils/dateWithOffset"
import {
  CreateTransactionModal,
  type TransactionFormValues,
} from "./CreateTransactionModal";

interface TransactionsProps {
  transactions: Data;
}

const Transactions: FC<TransactionsProps> = ({ transactions }) => {
  const state = transactionState((state) => state);
  const updatePurpose = purposeState(state => state.updatePurpose)

  const [open, setOpen] = useState(false);

  useEffect(() => {
    state.setList(transactions.data);
  }, []);

  const handleAddTransaction = async (values: TransactionFormValues) => {

    const [name, uuid] = values.category.split(":")

    const { data, error } = await actions.createTransaction({
      date: dateWithOffset(values.date),
      is_expense: values.type === "expense",
      name: values.transactionName,
      amount: values.amount,
      is_cash: values.method === "cash",
      included_in: uuid,
    });

    if (error || !data.success) {
      alert("An error occured")
      return
    }
    
    const newTrasaction: TransactionItem = {
      id: 9999, 
      uuid: data.data,
      date: dateWithOffset(values.date),
      is_expense: values.type === "expense",
      name: values.transactionName,
      amount: `${values.amount}`,
      is_cash: values.method === "cash",
      included_in: values.category,
      purposeName: name
    }

    state.setList([...state.list, newTrasaction])
    updatePurpose(uuid, values.amount || 0, values.type === "expense")
  };

  const handleRemoveTransaction = async (id: string) => {
    const exists = state.list.findIndex(e => e.uuid === id)
    
    if(exists < 0) {
      alert("An error occured")
      return
    }

    const { data, error } = await actions.deleteTransaction({ uuid: id })

    if (error || !data.success) {
      alert("An error occurred")
      return
    }

    updatePurpose(
      state.list[exists].included_in, 
      Number(state.list[exists].amount) || 0, 
      !state.list[exists].is_expense
    )

    state.setList([
      ...state.list.slice(0, exists), 
      ...state.list.slice(exists + 1 )
    ])

    alert("Delete successfully")
  };

  return (
    <>
      <CreateTransactionModal
        open={open}
        onClose={() => setOpen((prev) => !prev)}
        action={handleAddTransaction}
      />

      <article className="h-[70vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl my-4 border-l border-l-2 border-gray-300 pl-2">
            Transactions
          </h2>

          <IconButton
            iconName="lucide--circle-plus text-2xl"
            id="add-transaction"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>

        {state.list &&
          state.list.map((transaction) => (
            <Transaction
              key={transaction.id}
              transaction={transaction}
              onRemove={handleRemoveTransaction}
            />
          ))}
      </article>
    </>
  );
};

export default Transactions;
