import { FC } from 'react';
import { Divider, Typography } from '@mui/material';
import { IProcessEvent } from '../interfaces/events';
import { ReportTable } from './ReportTable';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Box } from '@mui/system';

interface Props {
  processes: IProcessEvent[];
  quantum: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Process vs Burstime',
    },
  },
};

export const Reports: FC<Props> = ({ processes, quantum }) => {
  const data = {
    labels: processes.map((process) => process.CMD),
    datasets: [
      {
        label: 'Turn around',
        data: processes.map((process) => process.burstTime),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <>
      <Typography mb={2} mt={2} variant="h5">
        Reportes del catalogo
      </Typography>

      <Divider />

      <ReportTable quantum={quantum} processes={processes} />

      <Box sx={{ mb: 2 }} />

      <Line options={options} data={data} />
    </>
  );
};
