import { create } from 'zustand'
import { type Purpose } from '../types/PurposeResponse'

type PurposeState = {
  list: Purpose[]
  setList: (list: Purpose[]) => void
}

export const purposeState = create<PurposeState>((set) => ({
  list: [],
  setList: (list: Purpose[]) => set({ list })
}))
