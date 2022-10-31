import { ProcessGroup } from "../models/ProcessGroup";

describe('test in Process file', () => {
	test('round robin should work (?)', async () => {

		const catalogIndex = ProcessGroup.createAProcessCatalog();

		await ProcessGroup.fillCatalogProcess(catalogIndex);

		console.log(ProcessGroup.getAProcessCatalogByIndex(catalogIndex).toString());

		// processes.mockRoundRobin();
	});
});
