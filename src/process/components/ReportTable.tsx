import { FC } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { IProcessEvent } from '../interfaces/events';

interface Props {
  processes: IProcessEvent[];
  quantum: number;
};

export const ReportTable: FC<Props> = ({ processes, quantum }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Report table">
        <TableHead>
          <TableRow>
            <TableCell>Process</TableCell>
            <TableCell align="right">T.L</TableCell>
            <TableCell align="right">R</TableCell>
            <TableCell align="right">P.R</TableCell>
            <TableCell align="right">T.R</TableCell>
            <TableCell align="right">T.F</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {processes.map((process: IProcessEvent) => (
            <TableRow
              key={process.PID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {process.CMD}
              </TableCell>
              <TableCell align="right">{process.start}</TableCell>
              <TableCell align="right">{quantum}</TableCell>
              <TableCell align="right">{process.USER[0] === 'root' ? 1 : 0}</TableCell>
              <TableCell align="right">{process.burstTime}</TableCell>
              <TableCell align="right">{process.finished}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
