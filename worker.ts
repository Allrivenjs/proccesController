import { EventEmitter } from 'events';
import { parentPort } from 'worker_threads';

let isPaused = false;

export const emitter = new EventEmitter();

emitter.on('toggle-paused', () => {
	isPaused = !isPaused;
});

const mockRoundRobin = async () => {
	let i = 0;
	while(true) {
		if(isPaused) {
			console.log('round robin esta pausado, no se ejecturán procesos');
			continue;
		}

		console.log('round robin cicle');
		await new Promise((resolve) => {
			setTimeout(resolve, 1000);
		});
		i++;
		if (i >= 5) {
			return 'terminado';
		}
	}
};

mockRoundRobin();

parentPort.postMessage('done');
