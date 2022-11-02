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
        console.log(path);
        //la descripcion del procesos, es la descripcion del grupo + los datos del proceso.
        let stop = false;
        let processFinished = [];
        let k = 0;
        try {
        while(!stop) {
            let i = 0;
                while (i < processCatalog.getProcessLength()) {
                const process = processCatalog.getProcessByIndex(i);
                // agregar accesores para la propiedad status
                //process is running
                process.setStatus('running');

                    for (let j = 0; j < quantum; j++) {
                        // verificar si el proceso esta pausado
                        this.pauseProcess(processCatalog);
                        console.log("Circle of running processes: " , k);
                        //hacemos un sleep basico
                        await new Promise((resolve) => {
                            setTimeout(() => {
                                resolve('a');
                            }, 10);
                        });
                        // para no siga escribiendo si no tiene nada que escribir
                        if (process.cycle <= process.getLengthProcess(processCatalog.getDescription())) {
                            process.text = process.text + process.getCharForDescriptionPosition(process.cycle);
                            process.cycle++;
                            console.log("Process: ", process.PID, " cycle: ", process.cycle);
                        }
                        //decrease the burst time
                        process.burstTime--;
                        console.log("ProccesBursTime: " + process.burstTime);

                        //if the burst time is 0, the process is finished
                        if (process.burstTime === 0) {
                            console.log("Process finished: " );
                            process.setStatus('finished');
                            process.COMMAND = process.COMMAND[0].replace('/', '');
                            await WriteForFile.writeForFile(`${path}/${process.COMMAND}.txt`, process.text);
                            //agregamos el proceso a la lista de procesos terminados
                            processFinished.push(process);
                            //si el proceso termino, lo eliminamos de la lista de procesos
                            processCatalog.deleteAProcessByIndex(i);
                            i == 0? i = 0 : i--;
                            break;
                        }
                        k++;
                        console.log("K is k: "+k)
                    }
                    console.log("i es i: "+i)
                i++;
            }
           if (processCatalog.getProcessLength() === 0) {
               stop = true;
           }

        }
        }catch (e) {
            console.error(e);
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
