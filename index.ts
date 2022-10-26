import routes from './routes/routes';
import express from 'express';
import { Process } from './models/procces';

import { roundRobin } from './models/RoundRobin';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

const testFunction = async () => {
	const processCatalog = await Process.fromBash();
	const quantum = 2;
	roundRobin(processCatalog, quantum);
};

testFunction();

app.listen(3000, () => {
	console.log('Server on port 3000');
});
