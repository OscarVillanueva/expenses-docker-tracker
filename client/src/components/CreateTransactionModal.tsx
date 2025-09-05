import type { FC, MouseEvent } from "react";
import { useFormik } from "formik";
import { createPortal } from "react-dom";
import { transactionSchema } from "../validators/transactionValidator";
import { purposeState } from '../state/purposeState'

type TransactionFormValues = {
  transactionName: string;
  date: string;
  amount: number | '';
  type: 'expense' | 'income' | '';
  method: 'card' | 'cash' | '';
  category: string;
};

type DrawerProps = {
  open: boolean;
  action: (values: TransactionFormValues) => Promise<void>
  onClose: () => void;
};

export const CreateTransactionModal: FC<DrawerProps> = ({ open, onClose, action }) => {
  const purposes = purposeState(state => state.list)

  const formik = useFormik<TransactionFormValues>({
    initialValues: {
      transactionName: "",
      date: "",
      amount: "",
      type: "",
      method: "",
      category: "",
    },
    validationSchema: transactionSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Form data submitted:", values);
      await action(values)
      resetForm();
      onClose()
    },
  });

  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    onClose();
  };

  return open ? (
    createPortal(
      <div
        className="fixed top-0 z-[99] w-full h-full bg-black/30 flex justify-center items-center"
        onClick={handleOutsideClick}
      >
        <div
          className="p-4 bg-main min-w-1/2 rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pb-2 mb-2 flex items-center justify-between gap-4 border-b border-b-gray-400">
            <p className="text-2xl">Create Transaction</p>
            <button onClick={onClose}>
              <span className="iconify text-xl lucide--circle-x hover:cursor-pointer" />
            </button>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="transaction_name"
                className="block  text-sm font-bold mb-2"
              >
                Transaction Name:
              </label>
              <input
                type="text"
                id="transactionName"
                name="transactionName"
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="e.g., Coffee"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.transactionName}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block  text-sm font-bold mb-2">
                Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="amount" className="block  text-sm font-bold mb-2">
                Amount:
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                placeholder="0.00"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amount}
              />
            </div>

            <div className="mb-4">
              <span className="block  text-sm font-bold mb-2">Type:</span>
              <div className="flex items-center mt-2">
                <input
                  type="radio"
                  id="expense"
                  name="type"
                  value="expense"
                  className="mr-2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="expense" className="mr-4">
                  Expense
                </label>
                <input
                  type="radio"
                  id="income"
                  name="type"
                  value="income"
                  className="mr-2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="income">Income</label>
              </div>
            </div>

            <div className="mb-4">
              <span className="block  text-sm font-bold mb-2">
                Payment Method:
              </span>
              <div className="flex items-center mt-2">
                <input
                  type="radio"
                  id="card"
                  name="method"
                  value="card"
                  className="mr-2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="card" className="mr-4">
                  Card
                </label>
                <input
                  type="radio"
                  id="cash"
                  name="method"
                  value="cash"
                  className="mr-2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="cash">Cash</label>
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="category"
                className="block  text-sm font-bold mb-2"
              >
                Purposes
              </label>
              <select
                id="category"
                name="category"
                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
              >
                <option>Select a purpose</option>

                {purposes.map(element => (
                  <option value={element.uuid}>{element.name}</option> 
                ))}
              </select>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-secondary hover:cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Transaction
              </button>
            </div>

            {formik.dirty && !formik.isValid ? (
              <div className="mt-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                <h3 className="font-bold text-md mb-2">Please fix the following errors:</h3>
                <ul className="list-disc list-inside text-sm">
                  {Object.values(formik.errors).map(error => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </form>
        </div>
      </div>,
      document.body
    )
  ) : (
    <></>
  );
};
