//importar express y crear rutas
import EventEmitter from 'events';

import { Router } from 'express';
import { Worker } from 'worker_threads';

import { getBashProcess } from '../controllers/bashController';
// import { indexController } from '../controllers/indexController';
//
const worker = new Worker('./worker.js');


const router = Router();

router.get('/process', getBashProcess);
router.get('/process/:id', (req, res) => {

});

router.get('/do-round-robin', async (req, res) => {
	const {processesCatalog, quantum, th} = req.body;
	await new Promise((resolve) => {
		worker.once('message', (data) => {
			console.log('worker message:', data);
		})
		worker.postMessage({
			type: 'start',
			data: {
				processesCatalog,
				quantum,
				th,
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



export default router;
