import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { Stack } from '@mui/system';
import { FC } from 'react';
import { IProcessEvent } from '../interfaces/events';

interface Props {
  process: IProcessEvent;
}

export const ProcessCard: FC<Props> = ({ process }) => {
  const color = process.status === 'finished'
    ? '#66bb6a' : process.status === 'ready'
    ? '#29b6f6' : process.status === 'process'
    ? '#ffa726' : '';


  return (
    <Card variant="outlined" sx={{ 
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: color
    }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          { process.CMD }
        </Typography>
        <Typography color="text.secondary">
          PID: { process.PID }
        </Typography>
      </CardContent>

      <Stack
        spacing={ 1 }
      >
        <Typography sx={{ mr: 2 }} color="text.secondary">
          Porcentaje realizado: { process.percent.toFixed(2) }%
        </Typography>
        <Typography sx={{ mr: 2 }} color="text.secondary">
          status: { process.status }
        </Typography>
      </Stack>
    </Card>
  );
};
