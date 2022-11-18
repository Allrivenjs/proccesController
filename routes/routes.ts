//importar express y crear rutas
import EventEmitter from "events";

// @ts-ignore
import { Router } from "express";
import { Worker } from "worker_threads";

import { getBashProcess } from "../controllers/bashController";

import { ProcessGroup } from "../models/ProcessGroup";
import { Process } from "../models/procces";
import { Processes } from "../algorithmMethod/Processes";

const router = Router();
const worker = new Worker('./worker.js');
router.get("/process", getBashProcess);
router.get("/process/:id", (req, res) => {});

router.post("/do-round-robin", async (req, res) => {


  const { processesCatalogIndex, quantum } = req.body;
  await new Promise((resolve) => {
    worker.on('message', ({ type, data }) => {
      switch (type) {
        case "round-robin":
          const { processCatalog, process, iteration } = data;
          sendSocket(processCatalog, process, iteration);
          break;
        case "pause":
          global.socketListener.emit('pause', {
            status: 'pause',
          });
          break;
        case "finished-algorithm":
          const { processCatalog: processCatalogFinished, processFinished } = data;
          global.socketListener.emit('finished-algorithm', {
            status: 'finished-algorithm',
              processCatalog: processCatalogFinished,
              processFinished: processFinished,
          });
          res.json({ message: "ok" });
          break;
        case "resume":
          global.socketListener.emit('resume', {
            status: 'resume',
          });
        break;
      }
    });
    worker.postMessage({
      'type':'start',
      'data': {
        processesCatalogIndex,
        quantum
      }
    })
  });


  // const { processesCatalogIndex, quantum } = req.body;
  // const catalogGroupProcesses = ProcessGroup.getAProcessCatalogByIndex(
  //   processesCatalogIndex
  // );
  // const process = new Processes();
  // await process.roundRobin(catalogGroupProcesses, quantum);
  // res.json({ message: "ok" });
});
//
router.get('/pause-round-robin', async (req, res) => {
  console.log("pausando");
	await new Promise((resolve) => {
		worker.postMessage({
			'type': 'pause',
		});
    res.json({ message: "ok" });
	});
});
router.get('/resume-round-robin', async (req, res) => {
  console.log("pausando");
	await new Promise((resolve) => {
		worker.postMessage({
			'type': 'resume',
		});
    res.json({ message: "ok" });
	});

});

router.post("/create-group-process", async (req, res) => {
  const { processes, name, th } = req.body;
  const processesArray = Process.fromArray(processes);
  const catalogIndex = ProcessGroup.createAProcessCatalog(name, th);
  await ProcessGroup.fillCatalogProcess(catalogIndex, processesArray);
  await ProcessGroup.saveGroupProcess();
  return res.json({
    catalogIndex: catalogIndex,
  });
});

const sendSocket = (processCatalog, process, iteration) => {
  global.socketListener.emit(process.status, {
    status: process.status,
    process: process,
    processCatalog: processCatalog,
    iteration: iteration,
  });
}

export default router;
