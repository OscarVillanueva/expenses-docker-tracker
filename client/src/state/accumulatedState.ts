import { create } from 'zustand'
import { type Accumulated } from '../types/AccumulatedResponse'

type AccumulatedState = {
  list: Accumulated[]
  accumulated: number;
  updateAccumulated: (acc: number) => void
  setList: (list: Accumulated[]) => void
}

export const accumulatedState = create<AccumulatedState>((set) => ({
  list: [],
  accumulated: 0,
  updateAccumulated: (acc: number) => set({ accumulated: acc}),
  setList: (list: Accumulated[]) => set({ list })
}))
