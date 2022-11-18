import { parentPort } from 'worker_threads';
import { Processes } from './algorithmMethod/Processes';
import {ProcessGroup} from "./models/ProcessGroup";
import { ProcessCatalog } from './models/ProcessCatalog';


let isPaused = false;

parentPort.on('message',async (data) => {
	console.log('worker message:', data);
	const catalogGroupProcesses = ProcessGroup.getAProcessCatalogByIndex(data.data.processesCatalogIndex);
	console.log(catalogGroupProcesses)
	const process = new Processes();
	switch (data.type) {
		case 'start':
			 const info = data.data;
			 const catalogGroupProcesses = ProcessGroup.getAProcessCatalogByIndex(info.processesCatalogIndex);
			 await process.roundRobin(catalogGroupProcesses, info.quantum);
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
