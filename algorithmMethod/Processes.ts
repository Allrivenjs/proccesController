import {GroupProcesses, IGroupProcess} from "../models/groupProcesses";
import {WriteForFile} from "../helpers/Files/WriteForFile";
import {Process} from "../models/procces";

export class Processes {
    pause: boolean;

    constructor() {
        this.pause = false;
    }


    public mockRoundRobin(groupProcess: IGroupProcess, quantum: number) {
        //said that the process is running
        const path = WriteForFile.createDirectory(`./processes/${groupProcess.id}`);

        //la descripcion del procesos, es la descripcion del grupo + los datos del proceso.

        let i = 0;
        let stop = false;
        let processFinished = [];

       while(!stop){
            while (i <= groupProcess.processes.length) {
                for (let j = 0; j < quantum; j++) {
                    // verificar si el proceso esta pausado
                    this.pauseProcess(groupProcess);


                    const process = groupProcess.processes[i];
                    //process is running
                    process.status = 'running';
                    //save the process in a file
                    const realBurst = (process.burstTime / groupProcess.TH);
                    if (realBurst <= process.getLengthProcess(groupProcess.description)) {
                        const position = process.getLengthProcess(groupProcess.description) - realBurst;
                        WriteForFile.writeForFile(`${path}/${process.COMMAND}.txt`, process.getCharForDescriptionPosition(position));
                    }
                    //decrease the burst time
                    process.burstTime--;
                    //if the burst time is 0, the process is finished
                    if (process.burstTime === 0) {
                        process.status = 'finished';
                        //agregamos el proceso a la lista de procesos terminados
                        processFinished.push(process);
                        //si el proceso termino, lo eliminamos de la lista de procesos
                        groupProcess.processes.splice(i, 1);
                        i--;
                        break;
                    }
                }
                i++;
            }
           if (groupProcess.processes.length === 0) {
               stop = true;
           }
        }
    }



    public pauseProcess(groupProcess: IGroupProcess) {
        if (this.pause) {
            groupProcess.processes.forEach((process) => {
                process.status = 'pause';
            });
        }
        while (this.pause) {
            //:D
        }
    }

    public resumeProcess() {
        this.pause = false;
    }

    public setPause() {
        this.pause = true;
    }


}