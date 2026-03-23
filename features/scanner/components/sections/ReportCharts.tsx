import ChartCard from '../ChartCard';
import { useMemo } from 'react';
import { getBarChartOptions, getRadialChartOptions } from '../../config/chart-options';

export function ReportCharts({ data }: { data: any }) {
  const radialChartOptions = useMemo(() => getRadialChartOptions(), []);
  const barChartOptions = useMemo(() => getBarChartOptions(), []);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <ChartCard
        title="Performance Score"
        type="radialBar"
        series={[data.performance]}
        options={radialChartOptions}
      />
      <ChartCard
        title="Field Data Metrics"
        type="bar"
        series={[
          {
            name: 'Value',
            data: [
              { x: 'LCP', y: parseFloat(data.metrics.lcp) * 1000 },
              { x: 'FCP', y: parseFloat(data.metrics.fcp) * 1000 },
              { x: 'TBT', y: parseFloat(data.metrics.tbt) },
              { x: 'CLS', y: parseFloat(data.metrics.cls) * 1000 },
            ],
          },
        ]}
        options={barChartOptions}
      />
    </div>
  );
}
