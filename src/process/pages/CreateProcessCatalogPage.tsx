import {
  Divider,
  Typography,
  Container,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  capitalize,
  SelectChangeEvent,
} from '@mui/material';
import { GridSelectionModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { AppLayout } from '../../layouts';
import { CreateProcessCatalogFormModal } from '../components/CreateProcessCatalogFormModal';
import { ProcessTable } from '../components/ProcessTable';
import { ProcessOrder, useGetProcess } from '../hooks';

const selectOptions: ProcessOrder[] = ['maxMem', 'minMem', 'maxCpu', 'minCpu']

export const CreateProcessCatalogPage = () => {
  const {  
    register,
    onSubmit,
    setProcesses,
    processsesByOrder,
    loading,
    processes,
  } = useGetProcess();

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectAgrupar, setSelectAgrupar] = useState<ProcessOrder>('maxCpu');

  const handleOnCloseModal = () => setIsModalOpen(false);
  const handleOnOpenModal = () => setIsModalOpen(true);

  const onChangeSelect = (event: SelectChangeEvent) => {
    setSelectAgrupar(event.target.value as ProcessOrder);
  };

  useEffect(() => {
    if (processes) processsesByOrder(selectAgrupar);
  }, [selectAgrupar]);

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

          <Box
            my={ 2 }
            display='flex'
            gap={ 2 }
          >
            <Select
              value={ selectAgrupar }
              onChange={ onChangeSelect }
              label="Agrupar"
            >
              {
                selectOptions.map((option, index) => (
                  <MenuItem key={ index } value={ option }>{ capitalize(option) }</MenuItem>
                ))
              }
            </Select>
            <TextField
              label='Número de procesos'
              { ...register('number') }
            />
            <Button
              variant='contained'
              onClick={ () => processsesByOrder(selectAgrupar) }
            >
              Obtener procesos de la maquina
            </Button>
          </Box>

          <Divider />

          <ProcessTable 
            processes={ processes! }
            setSelectionModel={ setSelectionModel }
            selectionModel={ selectionModel }
            loading={ loading }
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
