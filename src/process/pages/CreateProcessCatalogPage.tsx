import { Divider, Typography, Container, Box, Button, TextField } from '@mui/material';
import { AppLayout } from '../../layouts';
import { ProcessTable } from '../components/ProcessTable';
import { useGetProcess } from '../hooks';

export const CreateProcessCatalogPage = () => {
  const {  
    register,
    onSubmit,
    loading,
    processes,
  } = useGetProcess();

  return (
    <AppLayout>
      <Box
        width='100%'
        height='100vh'
      >
        <Container>
          <Typography my={2} variant="h3">
            Crear catalogo
          </Typography>

          <Divider />

          <Box
            my={ 2 }
            display='flex'
            gap={ 2 }
          >
            <TextField 
              label='Número de procesos'
              { ...register('number') }
            />
            <Button
              variant='contained'
              onClick={ onSubmit }
            >
              Obtener procesos de la maquina
            </Button>

          </Box>

          <ProcessTable 
            processes={ processes! }
          />

        </Container>
      </Box>
    </AppLayout>
  );
};
