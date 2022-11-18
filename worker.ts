import { parentPort } from "worker_threads";
import { Processes } from "./algorithmMethod/Processes";
import { ProcessGroup } from "./models/ProcessGroup";

let isPaused = false;

parentPort.on("message", async ({ type, data }) => {
  console.log("worker message:", data);
  const process = new Processes();
  switch (type) {
    case "start":
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
