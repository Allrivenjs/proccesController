import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  TextField,
  Typography,
} from '@mui/material';

import { AppLayout } from '../../layouts';
import { useRoundRobin } from '../hooks';
import { Stack } from '@mui/system';
import { ProcessCard } from '../components/ProcessCard';

import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { IProcessEvent, ProcessCatalog, ProcessEventResponse, ProcessFinishedEventResponse } from '../interfaces/events';

import { Reports } from '../components/Reports';

const socket = io('http://localhost:4000');


export const RoundRobinPage = () => {
  const { processesCatalogIndex } = useParams();
  const { register, onStartRoundRobin, loading, quantum } = useRoundRobin(
    processesCatalogIndex!
  );
  
  const [processesCatalog, setProcessesCatalog] = useState<ProcessCatalog>();
  const [processes, setProcesses] = useState<IProcessEvent[]>([]);
  const [processesFinished, setProcessesFinished] = useState<IProcessEvent[]>([]);

  const [isReportsVisible, setIsReportsVisible] = useState(false);

  useEffect(() => {
    socket.on('ready', ( data: ProcessEventResponse ) => {
      setProcessesCatalog( data.processCatalog );
      setProcesses(prevState => [
        ...prevState,
        data.process,
      ]);
    });

    socket.on('process', ( data: ProcessEventResponse ) => {
      setProcesses(prevState => {
        return prevState.map((process) => {
          if (process.PID === data.process.PID) {
            return data.process;
          };
          return process;
        })
      });
    });

    socket.on('finished', ( data: ProcessEventResponse ) => {
      setProcesses(prevState => {
        return prevState.map((process) => {
          if (process.PID === data.process.PID) {
            return {
              ...data.process,
              percent: 100,
            };
          };
          return process;
        })
      });
    });

    socket.on('finished-algorithm', ( data: ProcessFinishedEventResponse ) => {
      setProcessesFinished( data.processFinished );
    });

    socket.on('pause-algorithm', ( data ) => {
      console.log('pausado')
    });
  }, []);

  return (
    <AppLayout>
      <Box width="100%" height="100%" pb={ 20 }>
        <Container>

          <Typography mb={2} mt={6} variant="h3">
            Round Robin
          </Typography>


          <Divider />

          <Box my={2} display="flex" gap={2}>
            <TextField label="Quatum" {...register('quantum')} />
            <Button variant="contained" disabled={ loading } onClick={ onStartRoundRobin }>
              Empezar algoritmo de Round Robin
            </Button>
            <Button variant="contained" disabled={ processes.length <= 0 } onClick={ () => socket.emit('pause') }>
              Pausar
            </Button>
          </Box>

          <Typography mb={2} mt={6} variant="h5">
            Cola de iteración de los procesos
          </Typography>

          <Divider />

          <Box
            my={ 2 }
            display='flex'
            gap={ 2 }
            alignItems='center'
            justifyContent='space-between'
            width='100%'
          >
            <Typography mb={2} mt={4} variant="h6">
              Nombre del catalogo: { processesCatalog?.name }
            </Typography>
            { loading && ( <CircularProgress /> ) }
          </Box>


          <Stack
            mt={2}
            spacing={ 2 }
          >
            {
              processes.map((process) => (
                <ProcessCard key={ process.PID } process={ process } />
              ))
            }
          </Stack>

          <Divider />

          <Button
            sx={{ my: 2 }}
            variant="contained" onClick={ () => setIsReportsVisible(true) }
            disabled={ processesFinished.length <= 0}
          >
            Ver reportes
          </Button>


          {
            isReportsVisible && (
              <Reports
                processes={ processes }
                quantum={ quantum }
              />
            )
          }

        </Container>
      </Box>
    </AppLayout>
  );
};
