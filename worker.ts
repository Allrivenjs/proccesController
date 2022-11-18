import { parentPort } from 'worker_threads';
import { Processes } from './algorithmMethod/Processes';
import {ProcessGroup} from "./models/ProcessGroup";
import { ProcessCatalog } from './models/ProcessCatalog';

let isPaused = false;

parentPort.on('message',async (data) => {
	console.log('worker message:', data);
	const process = new Processes();
	switch (data.type) {
		case 'start':
			 const info = data.data;
			 const catalogGroupProcessesJson = ProcessGroup.getAProcessCatalogByIndex(info.processesCatalogIndex);
			 console.log('catalogGroupProcessesJson', catalogGroupProcessesJson);
			 const catalogGroupProcesses = ProcessCatalog.fromJSON(catalogGroupProcessesJson);
			 await process.roundRobin(catalogGroupProcesses, info.quantum, catalogGroupProcesses.getTH());
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