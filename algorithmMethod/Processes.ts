import { sleep } from "../helpers";
import { WriteForFile } from "../helpers/Files/WriteForFile";
import { ProcessCatalog } from "../models/ProcessCatalog";
import { parentPort } from 'worker_threads';

export class Processes {
  pause: boolean;
  static instance: Processes;

  constructor() {
    this.pause = false;
  }

  static getInstance() {
    if (!Processes.instance) {
      Processes.instance = new Processes();
    }
    return Processes.instance;
  }

  public async roundRobin(processCatalog: ProcessCatalog, quantum: number) {
    const path = await WriteForFile.createDirectory(
      `./processes/${processCatalog.getUUID()}`
    );
    const th = processCatalog.getTH();

    // la descripcion del procesos, es la descripcion del grupo + los datos del proceso.
    let processFinished = [];
    let k = 0;
    let timeFinished = 0;
    let start = 1;

    while (true) {
      console.log("**** ITERACIÓN **** #: " + k);
      for (let i = 0; i < processCatalog.getAllProcess().length; i++) {
        const process = processCatalog.getProcessByIndex(i);
        if (process.start === 0) {
          process.start = start++;
        }
        this.sendEvent(processCatalog, process, k);

        if (process.USER != "root") {
          for (let j = 0; j < quantum; j++) {
            await this.pauseProcess(processCatalog);
            await this.write(processCatalog, process, k, path);
          }
        } else {
          while (true) {
            this.pauseProcess(processCatalog);
            await this.write(processCatalog, process, k, path);
            if (process.text.length >= process.getDescriptionLength()) {
              break;
            }
          }
        }

        console.log(
          ` - doing process ${process.PID} - ${
            process.COMMAND
          } - left caracters to write ${
            process.getDescriptionLength() - process.text.length
          }`
        );

        if (process.text.length >= process.getDescriptionLength()) {
          timeFinished += process.burstTime;
          process.finished = timeFinished;
          process.setStatus("finished");
          this.sendEvent(processCatalog, process, k);
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

    console.log("round robin finished");
    parentPort.postMessage({
      'type': 'finished-algorithm',
      'data': {
        status: "finished-algorithm",
        processCatalog: processCatalog,
        processFinished: processFinished,
      }
    })
    for (const process of processFinished) {
      console.log(
        `process ${process.PID} - ${process.COMMAND} description: `,
        process.getAbsoluteDescription()
      );
    }
    console.log("process finished: ", processFinished);
  }

  public pauseProcess(processCatalog: ProcessCatalog, pause = false) {
    if (this.pause) {
      processCatalog.getAllProcess().forEach((process) => {
        process.status = "pause";
      });
    }
    while (this.pause) {
      console.log(this.pause);
      console.log('ahora mismo si esta pausado');
      parentPort.postMessage({
        'type': 'pause',
        'data': {
          status: "finished-algorithm",
        }
      })
      sleep(1000);
    }
  }

  public resumeProcess() {
    this.pause = false;
    parentPort.postMessage({
      'type': 'resume',
      'data': {
        status: "resume-algorithm",
      }
    })
  }

  public setPause() {
    this.pause = true;
  }
  public sendEvent(processCatalog, process, iteration) {
    parentPort.postMessage({
      'type': 'round-robin',
      'data': {
        processCatalog: processCatalog,
        process: process,
        iteration: iteration
      }
    })
  }

  public async write(processCatalog, process, k, path) {
    process.setStatus("process");
    this.sendEvent(processCatalog, process, k);
    process.text += process.getCharForDescriptionPosition(process.text.length);
    const calculatePercent =
      (process.text.length * 100) / process.getDescriptionLength();
    process.setPercent(calculatePercent);
    await WriteForFile.writeForFile(
      `./${path}/${process.COMMAND}-${process.PID}.txt`,
      process.text
    );
    await sleep(processCatalog.getTH());
  }
}
