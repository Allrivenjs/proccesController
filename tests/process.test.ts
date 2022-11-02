import { Processes } from "../algorithmMethod/Processes";
import { ProcessGroup } from "../models/ProcessGroup";

describe('test in Process file', () => {
	test('round robin should work (?)', async () => {

		const catalogIndex = ProcessGroup.createAProcessCatalog();

		await ProcessGroup.fillCatalogProcess(catalogIndex);

		// console.log(ProcessGroup.getAProcessCatalogByIndex(catalogIndex).toString());

		const processesCaller = new Processes();

		processesCaller.mockRoundRobin(ProcessGroup.getAProcessCatalogByIndex(catalogIndex), 4);

		// processes.mockRoundRobin();
	});
});
