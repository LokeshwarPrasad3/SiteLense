import { ApexOptions } from 'apexcharts';

export const getBarChartOptions = (): ApexOptions => ({
  chart: {
    id: 'metrics-bar',
    toolbar: { show: false },
    fontFamily: 'inherit',
    background: 'transparent',
  },
  xaxis: {
    type: 'category',
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: '#94a3b8', fontWeight: 600 } },
  },
  yaxis: {
    labels: {
      style: { colors: '#94a3b8', fontWeight: 600 },
      formatter: (val: number) => (val >= 1000 ? `${(val / 1000).toFixed(1)}s` : `${val}ms`),
    },
  },
  grid: {
    borderColor: '#f1f5f9',
    strokeDashArray: 4,
    xaxis: { lines: { show: false } },
  },
  colors: ['#6366f1'],
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 8,
      distributed: true,
    },
  },
  dataLabels: { enabled: false },
  tooltip: {
    theme: 'light',
    y: {
      formatter: (val: number) => (val >= 1000 ? `${(val / 1000).toFixed(2)}s` : `${val}ms`),
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.5,
      gradientToColors: ['#a855f7'],
      inverseColors: true,
      opacityFrom: 0.85,
      opacityTo: 0.85,
      stops: [0, 100],
    },
  },
});

export const getRadialChartOptions = (): ApexOptions => ({
  chart: {
    toolbar: { show: false },
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      hollow: {
        margin: 0,
        size: '70%',
        background: 'transparent',
      },
      track: {
        background: '#f1f5f9',
        strokeWidth: '97%',
      },
      dataLabels: {
        name: {
          show: true,
          fontSize: '14px',
          fontWeight: 700,
          offsetY: -10,
          color: '#64748b',
        },
        value: {
          offsetY: 15,
          fontSize: '42px',
          fontWeight: 900,
          color: '#1e293b',
          formatter: (val: any) => val,
        },
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: ['#a855f7'],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: 'round',
  },
  labels: ['PERFORMANCE'],
});
