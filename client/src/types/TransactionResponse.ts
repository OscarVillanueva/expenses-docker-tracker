export interface TransactionResponse {
  success: boolean;
  data: Data;
}

export interface Data {
  message: string;
  data: Transaction[];
  status: number;
}

export interface Transaction {
  id: number;
  uuid: string;
  date: string;
  is_expense: boolean;
  name: string;
  amount: string;
  included_in: string;
  is_cash: boolean;
  purposeName: string;
}
