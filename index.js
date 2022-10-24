const { exec } = require('child_process');
const Parser = require('table-parser');

exec('./scripts/taskList.sh', (err, stdout, stderr) => {
	const stdoutParsed = Parser.parse(stdout);
	console.log(stdoutParsed);
});



