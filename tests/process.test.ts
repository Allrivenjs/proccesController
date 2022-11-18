import { Processes } from "../algorithmMethod/Processes";
import { ProcessGroup } from "../models/ProcessGroup";

export const ejecutabe = async () => {
  const catalogIndex = ProcessGroup.createAProcessCatalog();
  await ProcessGroup.fillCatalogProcessAuto(catalogIndex);
  const processesCaller = new Processes();
  await processesCaller.roundRobin(
    ProcessGroup.getAProcessCatalogByIndex(catalogIndex),
    10
  );
};

describe("Process", () => {
  it("should run", async () => {
    await ejecutabe();
  });
});
