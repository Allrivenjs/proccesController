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

router.get("/process", getBashProcess);
router.get("/process/:id", (req, res) => {});


router.get("/do-round-robin", async (req, res) => {
  const { processesCatalogIndex, quantum } = req.body;
  const catalogGroupProcesses = ProcessGroup.getAProcessCatalogByIndex(
    processesCatalogIndex
  );
  const process = new Processes();
  await process.roundRobin(catalogGroupProcesses, quantum);
  res.json({ message: "ok" });

});

router.post('/do-round-robin', async (req, res) => {
	const {processesCatalogIndex, quantum} = req.body;
	const catalogGroupProcesses = ProcessGroup.getAProcessCatalogByIndex(processesCatalogIndex);
	const process = new Processes();
	await process.roundRobin(catalogGroupProcesses, quantum);
	res.json({message: 'ok'});

});
//
// router.get('/pause-round-robin', async (req, res) => {
// 	await new Promise((resolve) => {
// 		worker.postMessage({
// 			'type': 'pause',
// 		});
// 	});
// });
// router.get('/resume-round-robin', async (req, res) => {
// 	await new Promise((resolve) => {
// 		worker.postMessage({
// 			'type': 'resume',
// 		});
// 	});
// });

router.post("/create-group-process", async (req, res) => {
  const { processes, name, th } = req.body;
  const processesArray = Process.fromArray(processes);
  const catalogIndex = ProcessGroup.createAProcessCatalog(name, th);
  await ProcessGroup.fillCatalogProcess(catalogIndex, processesArray);

  return res.json({
    catalogIndex: catalogIndex,
  });
});

export default router;
