import { type FC } from 'react';
import PieChart from './PieChart';

interface ComparativeData {
  accumulated: number;
  purposes: number;
}

interface ComparativeProps {
  data?: ComparativeData;
}

const Comparative: FC<ComparativeProps> = ({ 
  data = { accumulated: 300, purposes: 50 },
}) => {
  const chartData = [data.accumulated, data.purposes];

  return (
    <div className="py-2 px-4">
      <h2 className="text-2xl my-4 border-l border-l-2 border-gray-300 pl-2">
        Accumulated vs Purposes
      </h2>

      <PieChart data={chartData} />

      <div className="flex items-center justify-evenly">
        <div>
          <div className = "flex items-center gap-2">
            <span className = "w-6 h-6 rounded-full bg-[#831df5] inline-block"/>
            <p className="text-2xl font-bold">
              Accumulated
            </p>
          </div>
          <p className="text-center text-xl font-light">{data.accumulated}</p>
        </div>

        <div>
          <div className = "flex items-center gap-2">
            <span className = "w-6 h-6 rounded-full bg-[#4ec4f9] inline-block"/>
            <p className="text-2xl font-bold">
              Purpose
            </p>
          </div>
          <p className="text-center text-xl font-light">{data.purposes}</p>
        </div>
      </div>
    </div>
  );
};

export default Comparative;
