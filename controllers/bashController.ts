import { Response } from "express";

import { Process } from "../models/procces";
import { Processes } from '../algorithmMethod/Processes';
import { match } from 'assert';

export const getBashProcess = async (req: any, res: Response) => {
  const { number } = req.query;

  const processes: Process[] = await Process.fromBash(parseInt(number));

  return res.json({
    ok: true,
    length: processes.length,
    process: processes,
  });
};

export const getBashProcessByOrder = async (req: any, res: Response) => {
  const { n, order } = req.query;
  let processes: Process[] = await Process.fromBash(10000);
  switch (order) {
    case 'maxCpu':
      processes = Process.orderByMaxCPU(processes);
      break;
    case 'minCpu':
      processes = Process.orderByMinCPU(processes);
      break;
    case 'maxMen':
      processes = Process.orderByMaxMEM(processes);
      break;
    case 'minMen':
      processes = Process.orderByMinMEM(processes);
      break;
  }
  processes = processes.slice(0, n);
  return res.json({
    ok: true,
    length: processes.length,
    process: processes,
  });
}
