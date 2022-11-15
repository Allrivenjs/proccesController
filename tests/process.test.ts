import { Processes } from '../algorithmMethod/Processes';
import { ProcessGroup } from '../models/ProcessGroup';

export const ejecutabe = async () => {
	const catalogIndex = ProcessGroup.createAProcessCatalog();
	await ProcessGroup.fillCatalogProcess(catalogIndex);
	const processesCaller = new Processes();
	await processesCaller.roundRobin(ProcessGroup.getAProcessCatalogByIndex(catalogIndex), 10);
};
