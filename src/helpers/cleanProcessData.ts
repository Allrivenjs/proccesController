import { IProcess, IProcessDirty } from "../process/interfaces";

export const cleanProcessData = (processes: Array<IProcessDirty>) => {
  const newProcesses: Array<IProcess> = processes.map( (process, index) => {
    return {
      id: index,
      PID: process.PID[0],
      NI: process.NI[0],
      CMD: process.CMD[0],
      RSS: process.RSS[0],
      VSZ: process.VSZ[0],
      STAT: process.STAT,
      STARTED: process.STARTED[0],
      absoluteDescription: process.absoluteDescription,
      text: process.text,
      TIME: process.TIME[0],
      USER: process.USER,
      cycle: process.cycle,
      COMMAND: process.COMMAND[0],
      CPUPercentage: process["%CPU"][0],
      MEMPercentage: process["%MEM"][0],
    };
  });
  return newProcesses;
};
