
const { exec } = require('child_process');
const Parser = require('table-parser');
import {Process} from "./models/procces";

// exec('./scripts/taskList.sh', (err, stdout, stderr) => {
// 	const stdoutParsed = Parser.parse(stdout);
// 	console.log(stdoutParsed);
// });


const bash = async (): Promise<Process[]> =>
	  await new Promise((resolve: any, _) => {
		exec('./scripts/taskList.sh', (err: any, stdout:string, _: string) => {
			resolve(Parser.parse(stdout))
		});
	});

const setFileProcess = async () => {
	const process = await bash();
	for (const p of process) {
		console.log(p);
		break;
	}
}



const main = async () => {
	await setFileProcess();
}

main();


