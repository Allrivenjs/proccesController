import { WriteForFile } from "../helpers/Files/WriteForFile";

import { ProcessCatalog } from "../models/ProcessCatalog";
import {ProcessGroup} from "../models/ProcessGroup";

export class Processes {
    pause: boolean;

    constructor() {
        this.pause = false;
    }


    public async mockRoundRobin(processCatalog: ProcessCatalog, quantum: number) {
        //said that the process is running
        const path = await WriteForFile.createDirectory(`./processes/${processCatalog.getUUID()}`);

        //la descripcion del procesos, es la descripcion del grupo + los datos del proceso.
        let i = 0;
        let stop = false;
        let processFinished = [];
        let k = 0;
        while(!stop) {
            while (i < processCatalog.getProcessLength()) {
                const process = processCatalog.getProcessByIndex(i);
                // agregar accesores para la propiedad status
                //process is running
                process.setStatus('running');

                for (let j = 0; j < quantum; j++) {
                    // verificar si el proceso esta pausado
                    this.pauseProcess(processCatalog);
                    console.log("Circle of running processes: " , k);
                    // para no siga escribiendo si no tiene nada que escribir
                    if (process.cycle <= process.getLengthProcess(processCatalog.getDescription())) {
                        process.text = process.text + process.getCharForDescriptionPosition(process.cycle);
                        process.cycle++;
                    }
                    //decrease the burst time
                    const processActualBurstTime = process.getBurstTime() - 1;
                    process.setBurstTime(processActualBurstTime);
                    //if the burst time is 0, the process is finished
                    if (processActualBurstTime === 0) {
                        process.setStatus('finished');
                        process.COMMAND = process.COMMAND[0].replace('/', '');
                        await WriteForFile.writeForFile(`${path}/${process.COMMAND}.txt`, process.text);
                        //agregamos el proceso a la lista de procesos terminados
                        processFinished.push(process);
                        //si el proceso termino, lo eliminamos de la lista de procesos
                        processCatalog.deleteAProcessByIndex(i);
                        i--;
                        break;
                    }
                    k++;
                }

                i++;
            }
           if (processCatalog.getProcessLength() === 0) {
               stop = true;
           }
        }
    }

    public pauseProcess(processCatalog: ProcessCatalog) {
        if (this.pause) {
            processCatalog.getAllProcess().forEach((process) => {
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
};
