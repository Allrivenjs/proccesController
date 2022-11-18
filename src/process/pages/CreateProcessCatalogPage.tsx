import { Divider, Typography, Container, Box, Button, TextField } from '@mui/material';
import { GridSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { AppLayout } from '../../layouts';
import { CreateProcessCatalogFormModal } from '../components/CreateProcessCatalogFormModal';
import { ProcessTable } from '../components/ProcessTable';
import { useGetProcess } from '../hooks';

export const CreateProcessCatalogPage = () => {
  const {  
    register,
    onSubmit,
    loading,
    processes,
  } = useGetProcess();

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOnCloseModal = () => setIsModalOpen(false);
  const handleOnOpenModal = () => setIsModalOpen(true);

  return (
    <AppLayout>
      <Box
        width='100%'
        height='100vh'
      >
        <Container>
          <Typography mb={2} mt={6} variant="h3">
            Catalogo de procesos
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
            setSelectionModel={ setSelectionModel }
            selectionModel={ selectionModel }
          />

          <Box
            my={ 2 }
            display='flex'
            gap={ 2 }
          >
            <Button
              variant='contained'
              onClick={ handleOnOpenModal }
              disabled={ selectionModel.length <= 0 }
            >
              Crear nuevo catalogo
            </Button>
          </Box>

          <CreateProcessCatalogFormModal
            isOpen={ isModalOpen }
            handleClose={ handleOnCloseModal }
            processes={ processes! }
            selectionModel={ selectionModel }
          />

        </Container>
      </Box>
    </AppLayout>
  );
};
