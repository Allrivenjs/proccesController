
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
        global.socketListener.on('resume', () => {
            console.log('resume');
            this.resumeProcess();
        });
        global.socketListener.on('pause', () => {
            console.log('pause');
            this.setPause();
        });
    }

    public async roundRobin(processCatalog: ProcessCatalog, quantum: number) {
        const path = await WriteForFile.createDirectory(`./processes/${processCatalog.getUUID()}`);
        const th = processCatalog.getTH();

        // la descripcion del procesos, es la descripcion del grupo + los datos del proceso.
        let processFinished = [];
        let k = 0;
        let timeFinished = 0;
        let start = 1;

        while (true) {
            console.log('**** ITERACIÓN **** #: ' + k);
            for (let i = 0; i < processCatalog.getAllProcess().length; i++) {
                const process = processCatalog.getProcessByIndex(i);
                if(process.start === 0) {
                    process.start = start++;
                }
                this.sendSocket(processCatalog, process, k);

                if (process.USER != 'root') {
                    for (let j = 0; j < quantum; j++) {
                        this.pauseProcess(processCatalog);
                        await this.write(processCatalog, process, k, path);
                    }
                }else {
                    while (true) {
                        this.pauseProcess(processCatalog);
                        await this.write(processCatalog, process, k, path);
                        if (process.text.length >= process.getDescriptionLength()) {
                            break;
                        }
                    }
                }

                console.log(` - doing process ${process.PID} - ${process.COMMAND} - left caracters to write ${process.getDescriptionLength() - process.text.length}`);

                if (process.text.length >= process.getDescriptionLength()) {
                    timeFinished += process.burstTime;
                    process.finished = timeFinished;
                    process.setStatus('finished');
                    this.sendSocket(processCatalog, process, k);
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
        global.socketListener.emit('finished-algorithm', {
            'status': 'finished-algorithm',
            'processCatalog': processCatalog,
            'processFinished': processFinished,
        });
        for (const process of processFinished) {
            console.log(`process ${process.PID} - ${process.COMMAND} description: `, process.getAbsoluteDescription());
        }
        console.log('process finished: ', processFinished);
    };

    public pauseProcess(processCatalog: ProcessCatalog) {
        if (this.pause) {
            processCatalog.getAllProcess().forEach((process) => {
                process.status = 'pause';
            });
        }
        while (this.pause) {

        }
    }

    public resumeProcess() {
        this.pause = false;
    }

    public setPause() {
        this.pause = true;
    }
    public sendSocket(processCatalog, process, iteration) {
        global.socketListener.emit(process.status, {
            'status': process.status,
            'process': process,
            'processCatalog': processCatalog,
            'iteration': iteration,

        });
    }
   public async write(processCatalog, process, k, path){
        process.setStatus('process');
        this.sendSocket(processCatalog, process, k);
        const calculatePercent = (process.text.length * 100) / process.getDescriptionLength();
        process.setPercent(calculatePercent);
        process.text += process.getCharForDescriptionPosition(process.text.length);
        await WriteForFile.writeForFile(`./${path}/${process.COMMAND}-${process.PID}.txt`, process.text);
        await sleep(processCatalog.getTH());
    }

}
