import { FC, useEffect, useState } from 'react';

import { Box, CircularProgress } from '@mui/material';

import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';

import { IProcess } from '../interfaces';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'index', width: 70 },
  { field: 'PID', headerName: 'PID', width: 70 },
  { field: 'COMMAND', headerName: 'Name', width: 130 },
  { field: 'CPUPercentage', headerName: '% CPU', width: 130 },
  { field: 'MEMPercentage', headerName: '% Memory', width: 130 },
  { field: 'USER', headerName: 'User', width: 130 },
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

interface ProcessTableProps {
  processes: Array<IProcess>;
  selectionModel: GridSelectionModel;
  setSelectionModel: (selectionModel: GridSelectionModel) => void;
  loading: boolean;
}

export const ProcessTable: FC<ProcessTableProps> = ({
  processes,
  selectionModel,
  setSelectionModel,
  loading,
}) => {
  return (
    <Box
      sx={{ height: 400, width: '100%' }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {!loading ? (
        <>
          {processes && (
            <DataGrid
              checkboxSelection
              rows={processes}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
              }}
              selectionModel={selectionModel}
            />
          )}
        </>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};
