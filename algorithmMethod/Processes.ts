import { WriteForFile } from "../helpers/Files/WriteForFile";

import { ProcessCatalog } from "../models/ProcessCatalog";

/*
* 157
*
*/
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

        while(!stop) {
            while (i < processCatalog.getAllProcess().length) {

                for (let j = 0; j < quantum; j++) {
                    // verificar si el proceso esta pausado
                    this.pauseProcess(processCatalog);
                    console.log('hola: ', i);


                    const process = processCatalog.getProcessByIndex(i);
                    //process is running

                    // agregar accesores para la propiedad status
                    process.setStatus('running');
                    //save the process in a file

                    // para no siga escribiendo si no tiene nada que escribir
                    if (realBurst <= process.getLengthProcess(processCatalog.getDescription())) {
                        const position = process.getLengthProcess(processCatalog.getDescription()) - realBurst;
                        WriteForFile.writeForFile(`${path}/${process.COMMAND}.txt`, process.getCharForDescriptionPosition(position));
                    }

                    //decrease the burst time
                    const processActualBurstTime = process.getBurstTime() - 1;
                    process.setBurstTime(processActualBurstTime);

                    //if the burst time is 0, the process is finished
                    if (processActualBurstTime === 0) {
                        process.setStatus('finished');
                        //agregamos el proceso a la lista de procesos terminados
                        processFinished.push(process);
                        //si el proceso termino, lo eliminamos de la lista de procesos
                        processCatalog.deleteAProcessByIndex(i);
                        i--;
                        break;
                    };
                };
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
