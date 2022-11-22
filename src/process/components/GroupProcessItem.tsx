import { FC } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import { IGroup } from '../interfaces';
import { ProcessCard } from './ProcessCard';
import { Stack } from '@mui/system';

interface Props {
  group: IGroup;
  index: number;
}

export const GroupProcessItem: FC<Props> = ({ group, index }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<GridExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Box
          display='flex'
          width='100%'
        >
          <Typography sx={{ width: 'fit-content', fontWeight: 700, mr: 2 }}>{ index } - { group.name } </Typography>
          <Typography sx={{ width: 'fit-content' }}>TH: { group.TH } </Typography>
          <Typography sx={{ color: 'text.secondary', ml: 'auto', mr: 4 }}>{ group.description }</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          variant='h5'
          mb={ 2 }
        >
          Processes
        </Typography>
        <Stack
          spacing={ 2 }
        >
          { group.processes.map((process, index) => (
            <ProcessCard 
              key={ index }
              process={ process }
            />
          )) }
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
