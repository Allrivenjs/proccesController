import { parentPort } from 'worker_threads';

let isPaused = false;

parentPort.on('message', (data) => {
	console.log('worker message jiji:', data);
	switch (data) {
		case 'start':
			mockRoundRobin();
			break;
		case 'pause':
			isPaused = true;
			break;
		case 'resume':
			isPaused = false;
			break;
	}
})

parentPort.on('toggle-paused', (data) => {
	console.log('worker message:', data);
	isPaused = !isPaused;
});

const mockRoundRobin = async () => {
	let i = 0;
	while(true) {
		if(isPaused) {
			console.log('round robin esta pausado, no se ejecturán procesos');
			parentPort.postMessage('fue pausado');
			continue;
		}
		console.log('round robin cicle');
		parentPort.postMessage('Esta ejecutando');
		await new Promise((resolve) => {
			setTimeout(resolve, 1000);
		});
		i++;
		if (i >= 5) {
			parentPort.postMessage('finalizo');
		}
	}
};

// mockRoundRobin();


parentPort.postMessage('done');