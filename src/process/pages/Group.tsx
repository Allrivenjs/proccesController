import {
  Typography,
  Container,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from '@mui/material';
import { DataGrid, GridColDef, GridExpandMoreIcon, GridSelectionModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { AppLayout } from '../../layouts';
import { CreateProcessCatalogFormModal } from '../components/CreateProcessCatalogFormModal';
import { ProcessTable } from '../components/ProcessTable';
import { useGetProcess } from '../hooks';
import { GetProcessesResponse, IProcess } from '../interfaces';
import axiosClient from '../../apis/axiosClient';
import { cleanProcessData } from '../../helpers';
import { useGroupProcess } from '../hooks/useGroupProcess';
import { GroupProcessItem } from '../components/GroupProcessItem';


export const Group =  () => {
  const {
    groups,
    loading,
  } = useGroupProcess();

  return (
    <AppLayout>
      <Box
        width='100%'
        height='100vh'
      >
        <Container>
          <Typography mb={2} mt={6} variant="h3">
            Catalogo de grupos
          </Typography>


          <div>
            { !loading && groups
              ? (
                <>
                  { groups.map( (group, index) => (
                    <GroupProcessItem 
                      key={index}
                      group={ group }
                      index={ index }
                    />
                  )) }
                </>
              ) : (
                <CircularProgress />
              )
            }
          </div>

        </Container>
      </Box>
    </AppLayout>
  );
};
