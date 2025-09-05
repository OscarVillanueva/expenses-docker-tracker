import { create } from 'zustand'
import { type Transaction } from '../types/TransactionResponse'

type TransactionState = {
  list: Transaction[]
  setList: (list: Transaction[]) => void
}

export const transactionState = create<TransactionState>((set) => ({
  list: [],
  setList: (list: Transaction[]) => set({ list })
}))
