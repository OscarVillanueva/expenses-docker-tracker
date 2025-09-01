import { type FC, useLayoutEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface PieChartProps {
  data?: number[];
}

const PieChart: FC<PieChartProps> = ({ 
  data = [300, 50],
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const createChart = (ctx: HTMLCanvasElement) => {
    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: data,
          backgroundColor: ['#831df5', '#4ec4f9'],
          hoverOffset: 4
        }]
      },
      options: {
        rotation: -90,
        circumference: 180,
        borderRadius: 40
      }
    });
  };

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current;

    // Destroy existing chart if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create new chart using the external function
    chartInstanceRef.current = createChart(ctx);

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [data]);

  return (
    <div className="flex items-center justify-center w-full h-1/2" style={{ marginTop: '-3rem' }}>
      <div className="w-1/2">
        <canvas ref={chartRef} id="relation-chart"></canvas>
      </div>
    </div>
  );
};

export default PieChart;
