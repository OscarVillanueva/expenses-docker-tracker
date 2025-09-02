import { create } from 'zustand'
import { type Purpose } from '../types/PurposeResponse'

type AccumulatedState = {
  list: Purpose[]
  setList: (list: Purpose[]) => void
}

export const accumulatedState = create<AccumulatedState>((set) => ({
  list: [],
  setList: (list: Purpose[]) => set({ list })
}))
