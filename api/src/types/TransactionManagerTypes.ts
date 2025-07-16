import SupabaseClient from "https://jsr.io/@supabase/supabase-js/2.47.3/src/SupabaseClient.ts";

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

type TransactionBase = {
  client: SupabaseClient;
};

export type Transaction = {
  date: string;
  is_expense: boolean;
  name: string;
  amount: number;
  included_in: number;
  is_cash: boolean;
};

// Get: Purpose
export type GetTransaction = {
  userID: string;
} & TransactionBase;

export type CreateTransaction = {
  userID: string;
  transaction: Transaction;
} & TransactionBase;

export type DeleteTransaction = {
  userID: string;
  transactionID: number;
} & TransactionBase;
