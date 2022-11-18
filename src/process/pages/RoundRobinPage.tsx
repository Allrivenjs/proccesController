import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from '@mui/material';

import { AppLayout } from '../../layouts';
import { useRoundRobin } from '../hooks';

export const RoundRobinPage = () => {
  const { processesCatalogIndex } = useParams();
  const { register, onStartRoundRobin, loading } = useRoundRobin(
    processesCatalogIndex!
  );

  return (
    <AppLayout>
      <Box width="100%" height="100vh">
        <Container>
          <Typography mb={2} mt={6} variant="h3">
            Round Robin
          </Typography>

          <Divider />

          <Box my={2} display="flex" gap={2}>
            <TextField label="Quatum" {...register('quantum')} />
            <Button variant="contained" onClick={ onStartRoundRobin }>
              Empezar algoritmo de Round Robin
            </Button>
          </Box>
        </Container>
      </Box>
    </AppLayout>
  );
};
