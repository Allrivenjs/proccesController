import { parentPort } from 'worker_threads';
import { Processes } from './algorithmMethod/Processes';

let isPaused = false;

parentPort.on('message',async (data) => {
	console.log('worker message:', data);
	const process = new Processes();
	switch (data.type) {
		case 'start':
			const info = data.data;
			 await process.roundRobin(info.processesCatalog, info.quantum, info.th);
			break;
		case 'pause':
			process.setPause();
			break;
		case 'resume':
			process.resumeProcess();
			break;
	}
})



parentPort.postMessage('done');