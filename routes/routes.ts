//importar express y crear rutas
import EventEmitter from 'events';

import { Router } from 'express';
import { Worker } from 'worker_threads';

import { getBashProcess } from '../controllers/bashController';
import {ejecutabe} from "../tests/process.test";
import {ProcessGroup} from "../models/ProcessGroup";
import { Process } from '../models/procces';
// import { indexController } from '../controllers/indexController';
//
const worker = new Worker('./worker.js');


const router = Router();

router.get('/process', getBashProcess);
router.get('/process/:id', (req, res) => {

});

router.get('/do-round-robin', async (req, res) => {
	const {processesCatalogIndex, quantum} = req.body;
	await new Promise((resolve) => {
		worker.once('message', (data) => {
			console.log('worker message:', data);
		})
		worker.postMessage({
			type: 'start',
			data: {
				processesCatalogIndex,
				quantum,
			}
		});
	});
});
router.get('/pause-round-robin', async (req, res) => {
	await new Promise((resolve) => {
		worker.postMessage({
			'type': 'pause',
		});
	});
});
router.get('/resume-round-robin', async (req, res) => {
	await new Promise((resolve) => {
		worker.postMessage({
			'type': 'resume',
		});
	});
});

router.post('/create-group-process', async (req, res) => {
	const {processes, name, th} = req.body;

	const processesArray = Process.fromArray(processes);

	const catalogIndex = ProcessGroup.createAProcessCatalog(name, th);
	await ProcessGroup.fillCatalogProcess(catalogIndex, processesArray);
	return res.json({
		'catalogIndex': catalogIndex,
	});
});



export default router;
