import { Processes } from "../algorithmMethod/Processes";
import { ProcessGroup } from "../models/ProcessGroup";

export const ejecutable = async  () => {
	const catalogIndex = ProcessGroup.createAProcessCatalog();
	await ProcessGroup.fillCatalogProcess(catalogIndex);
	const processesCaller = new Processes();
	await processesCaller.mockRoundRobin2(ProcessGroup.getAProcessCatalogByIndex(catalogIndex), 10);
}
