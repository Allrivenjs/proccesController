import { Processes } from "../algorithmMethod/Processes";
import { ProcessGroup } from "../models/ProcessGroup";

describe('test in Process file', () => {
	test('round robin should work (?)', async () => {

		const catalogIndex = ProcessGroup.createAProcessCatalog();
		await ProcessGroup.fillCatalogProcess(catalogIndex);
		const processesCaller = new Processes();
		await processesCaller.mockRoundRobin(ProcessGroup.getAProcessCatalogByIndex(catalogIndex), 4);

		// processes.mockRoundRobin();
	});
});
