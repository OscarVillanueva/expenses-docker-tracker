import * as yup from 'yup';

export const transactionSchema = yup.object().shape({
  transactionName: yup
    .string()
    .required('Transaction name is required.'),

  date: yup
    .date()
    .required('Date is required.')
    .typeError('Please enter a valid date.'),

  amount: yup
    .number()
    .positive('Amount must be a positive number.')
    .required('Amount is required.')
    .typeError('Amount must be a number.'),

  type: yup
    .string()
    .required('You must select a transaction type (Expense/Income).'),

  method: yup
    .string()
    .required('You must select a payment method (Card/Cash).'),

  category: yup
    .string()
    .required('Please select a category.'),
});
