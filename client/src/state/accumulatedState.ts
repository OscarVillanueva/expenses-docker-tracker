import { create } from 'zustand'

type AccumulatedState = {
  accumulated: number;
  updateAccumulated: (acc: number) => void
}

export const accumulatedState = create<AccumulatedState>((set) => ({
  accumulated: 0,
  updateAccumulated: (acc: number) => set({ accumulated: acc})
}))
