
import { sleep } from '../helpers';
import { WriteForFile } from '../helpers/Files/WriteForFile';

import { ProcessCatalog } from '../models/ProcessCatalog';

/*
* 157
*
*/
export class Processes {
    pause: boolean;

    constructor() {
        this.pause = false;
    }

    public async roundRobin(processCatalog: ProcessCatalog, quantum: number, th: number = 0) {
        const path = await WriteForFile.createDirectory(`./processes/${processCatalog.getUUID()}`);
        console.log(path);

        // la descripcion del procesos, es la descripcion del grupo + los datos del proceso.
        let processFinished = [];
        let k = 0;

        while (true) {
            console.log('**** ITERACIÓN **** #: ' + k);
            for (let i = 0; i < processCatalog.getAllProcess().length; i++) {
                const process = processCatalog.getProcessByIndex(i);
                
                if (process.USER != 'root') {
                    for (let j = 0; j < quantum; j++) {
                        process.text += process.getCharForDescriptionPosition(process.text.length);
                        await WriteForFile.writeForFile(`./${path}/${process.COMMAND}-${process.PID}.txt`, process.text);
                        await sleep(process.burstTime);
                    }
                }else {
                    while (true) {
                        process.text += process.getCharForDescriptionPosition(process.text.length);
                        await WriteForFile.writeForFile(`./${path}/${process.COMMAND}-${process.PID}.txt`, process.text);
                        await sleep(processCatalog.getTH());
                        if (process.text.length >= process.getDescriptionLength()) {
                            break;
                        }
                    }
                }

                console.log(` - doing process ${process.PID} - ${process.COMMAND} - left caracters to write ${process.getDescriptionLength() - process.text.length}`);

                if (process.text.length >= process.getDescriptionLength()) {
                    processFinished = [
                        ...processFinished,
                        ...processCatalog.deleteAProcessByIndex(i),
                    ];
                }
            }

            if (processCatalog.getProcessLength() === 0) {
                break;
            }

        k++;
        }

        console.log('round robin finished');
        for (const process of processFinished) {
            console.log(`process ${process.PID} - ${process.COMMAND} description: `, process.getAbsoluteDescription());
        }
        console.log('process finished: ', processFinished.length);
        return processFinished;
    };

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
}
