import { parentPort } from "worker_threads";
import { Processes } from "./algorithmMethod/Processes";
import { ProcessGroup } from "./models/ProcessGroup";

let isPaused = false;

parentPort.on("message", async ({ type, data }) => {
  const process = Processes.getInstance();
  switch (type) {
    case "start":
      await ProcessGroup.loadGroupProcess();
      const catalogGroupProcesses = ProcessGroup.getAProcessCatalogByIndex(
        data.processesCatalogIndex
      );
      await process.roundRobin(catalogGroupProcesses, data.quantum);
      break;
    case "pause":
      process.setPause();
      break;
    case "resume":
      process.resumeProcess();
      break;
  }
});

parentPort.postMessage("done");
