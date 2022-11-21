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
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { AppLayout } from '../../layouts';
import { CreateProcessCatalogFormModal } from '../components/CreateProcessCatalogFormModal';
import { ProcessTable } from '../components/ProcessTable';
import { useGetGroupProcess, useGetProcess } from '../hooks';
import { GetProcessesResponse, IProcess } from '../interfaces';
import axiosClient from '../../apis/axiosClient';
import { cleanProcessData } from '../../helpers';

const selectOptions = ['Mayor CPU', 'Mayor Memoria'];

export const Grupo =  () => {


  const columns: GridColDef[] = [
    { field: 'Nombre', headerName: 'index', width: 70 },
    { field: 'Cantidad de procesos', headerName: 'PID', width: 70 },
    /*
      *{
      *  field: 'age',
      *  headerName: 'Age',
      *  type: 'number',
      *  width: 90,
      *},
      *{
      *  field: 'fullName',
      *  headerName: 'Full name',
      *  description: 'This column has a value getter and is not sortable.',
      *  sortable: false,
      *  width: 160,
      *  valueGetter: (params: GridValueGetterParams) =>
      *    `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      *},
      */
  ];

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [selectAgrupar, setSelectAgrupar] = useState(selectOptions[0]);

  const onChangeSelect = (event: SelectChangeEvent) => {
    setSelectAgrupar(event.target.value as string);
  };

  // const [processes, setProcesses] = useState<Array<IProcess>>();
  // const { data } = await axiosClient.get(
  //   'process/group'
  // );
  // setProcesses( cleanProcessData( data.process ) );

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
          {/*<ProcessTable */}
          {/*  processes={ processes! }*/}
          {/*  setSelectionModel={ setSelectionModel }*/}
          {/*  selectionModel={ selectionModel }*/}
          {/*/>*/}

          <Box sx={{ height: 400, width: '100%' }}>
            {
              processes && (
                <DataGrid
                  checkboxSelection
                  rows={ processes }
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                  }}
                  selectionModel={selectionModel}
                />
              )
            }
          </Box>


          <Box
            my={ 2 }
            display='flex'
            gap={ 2 }
          >
          </Box>


        </Container>
      </Box>
    </AppLayout>
  );
};
