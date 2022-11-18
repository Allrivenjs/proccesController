import { CarRepair, Memory } from '@mui/icons-material';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { GridSelectionModel } from '@mui/x-data-grid';
import { FC } from 'react';
import { IProcess } from '../interfaces';

import { useCreateCatalogProcess } from '../hooks';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  processes: Array<IProcess>;
  selectionModel: GridSelectionModel;
}

export const CreateProcessCatalogFormModal: FC<Props> = ({
  isOpen,
  handleClose,
  selectionModel,
  processes,
}) => {
  const { 
    register,
    onSubmit,
    loading,
  } = useCreateCatalogProcess( processes, selectionModel );

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h2" mb={4}>
          Crear un nuevo catalogo
        </Typography>
        <Stack spacing={2}>
          <TextField 
            multiline 
            label="Nombre del catalogo" 
            { ...register('name') }
          />
          <TextField 
            label="TH"
            { ...register('th') }
          />

          <Typography 
            id="modal-modal-title" 
            variant="h6"
          >
            Procesos a agregar
          </Typography>

          <List>
            {selectionModel.map((value) => (
              <ListItem key={value}>
                <ListItemIcon>
                  <Memory />
                </ListItemIcon>
                <ListItemText
                  primary={`${processes[value as number].COMMAND}`}
                  secondary={`PID: ${processes[value as number].PID}`}
                />
              </ListItem>
            ))}
          </List>

          <Button 
            onClick={ onSubmit }
            variant="contained" 
            disabled={selectionModel.length <= 0}
          >
            Crear nuevo catalogo
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
