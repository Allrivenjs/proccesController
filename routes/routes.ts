//importar express y crear rutas
import EventEmitter from 'events';

import { Router } from 'express';
import { Worker } from 'worker_threads';

import { getBashProcess } from '../controllers/bashController';
// import { indexController } from '../controllers/indexController';
//



const router = Router();

router.get('/process', getBashProcess);
router.get('/process/:id', (req, res) => {

});

router.get('/do-round-robin', async (req, res) => {
	const worker = new Worker('./worker.js');
	worker.on('message', (data: any) => {
		res.json({ status: 'doing round robin' });
	});
});

router.get('/pause-round-robin', (req, res) => {
	res.json({ status: 'paused' });
});

export default router;
