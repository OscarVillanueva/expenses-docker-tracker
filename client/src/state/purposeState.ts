import { create } from 'zustand'
import { type Purpose } from '../types/PurposeResponse'

type PurposeState = {
  list: Purpose[]
  setList: (list: Purpose[]) => void
  updatePurpose: (purpose: string, amount: number, isExpense: boolean) => void
}

export const purposeState = create<PurposeState>((set) => ({
  list: [],
  setList: (list: Purpose[]) => set({ list }),
  updatePurpose: (purpose: string, amount: number, isExpense: boolean) => set(state => {
    const l = state.list.map(e => {
      if(e.uuid !== purpose) return e

      const value = isExpense ? -amount : amount

      return {
        ...e,
        total: `${Number(e.total) + value}`
      }
    }) 

    return {
      ...state,
      list: l
    }
  })
}))
