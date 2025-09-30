import { type FC, useEffect, useMemo } from 'react';
import PieChart from './PieChart';
import { accumulatedState } from '../state/accumulatedState' 
import { purposeState } from '../state/purposeState'
import { commifyNumber } from '../utils/commifyNumbers'

interface ComparativeProps {
  accumulated: number
}

const Comparative: FC<ComparativeProps> = ({ accumulated }) => {
  const acc = accumulatedState(state => state)
  const purposes = purposeState(state => state.list)

  const purposeTotal = useMemo(() => {
    return purposes.reduce((acc, current) => acc + Number(current.total),0)
  }, [purposes])

  useEffect(() => {
    acc.updateAccumulated(accumulated)
  }, [])

  return (
    <div className="py-2 px-4">
      <h2 className="text-2xl my-4 border-l border-l-2 border-gray-300 pl-2">
        Accumulated vs Purposes
      </h2>

      <PieChart data={[acc.accumulated, purposeTotal]} />

      <div className="flex items-center justify-evenly">
        <div>
          <div className = "flex items-center gap-2">
            <span className = "w-6 h-6 rounded-full bg-[#831df5] inline-block"/>
            <p className="text-2xl font-bold">
              Accumulated
            </p>
          </div>
          <p className="text-center text-xl font-light">
            {commifyNumber(`$${acc.accumulated}`)}
          </p>
        </div>

        <div>
          <div className = "flex items-center gap-2">
            <span className = "w-6 h-6 rounded-full bg-[#4ec4f9] inline-block"/>
            <p className="text-2xl font-bold">
              Purpose
            </p>
          </div>
          <p className="text-center text-xl font-light">{commifyNumber(`$${purposeTotal}`)}</p>
        </div>
      </div>


      <div className = "flex flex-col items-center justify-center">
        <div className = "flex items-center gap-2">
          <span className = "w-6 h-6 rounded-full bg-purple-900 inline-block"/>
          <p className="text-2xl font-bold">
            Diff
          </p>
        </div>

        <p className="text-center text-xl font-light">{commifyNumber(`$${acc.accumulated - purposeTotal}`)}</p>
      </div>
    </div>
  );
};

export default Comparative;
