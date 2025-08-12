export interface TransactionResponse {
  id: number;
  date: Date;
  is_expense: boolean;
  name: string;
  amount: number;
  included_in: number;
  purpose: Purpose;
  is_cash: boolean;
}

export interface Purpose {
  belong_to: string;
}

export type Transaction = {
  date: string;
  is_expense: boolean;
  name: string;
  amount: number;
  included_in: string;
  is_cash: boolean;
};

// Get: Transaction
export type GetTransaction = {
  userID: string;
} 

export type CreateTransaction = {
  userID: string;
  transaction: Transaction;
} 

export type DeleteTransaction = {
  userID: string;
  transactionID: string;
}
