import { ProcessCatalog } from "./ProcessCatalog";
import { v4 as uuidv4 } from "uuid";
import { Process } from "./procces";
import * as fs from "fs";
import { WriteForFile } from '../helpers/Files/WriteForFile';

/*
 * Class to store a group of ProcessCatalog and the functionality
 * and encapsulate the functionality to do with them
 */
export class ProcessGroup {
  private static groupProcesses: ProcessCatalog[] = [];

  /*
   * method to create and add a new catalog to the group of catalogs array
   * it returns the index of the created catalog
   */
  public static createAProcessCatalog(
    name = `process #${this.groupProcesses.length + 1}`,
    TH = this.generateRandomTH()
  ): number {
    const uuid = uuidv4();
    const processCatalog = new ProcessCatalog(uuid, name, name, TH);
    return this.groupProcesses.push(processCatalog) - 1;
  }

  public static async fillCatalogProcessAuto(index: number) {
    const processes = await Process.fromBash();
    this.groupProcesses[index].setProcesses(processes);
  }
  public static async fillCatalogProcess(index: number, processes: Process[]) {
    this.groupProcesses[index].setProcesses(processes);
  }

  public static setGroupProcess(processCatalog: ProcessCatalog) {
    this.groupProcesses.push(processCatalog);
  }

  public static getAProcessCatalogByIndex(index: number): ProcessCatalog {
    return this.groupProcesses[index];
  }

  public static getAProcessCatalogByUUID(uuid: uuidv4): ProcessCatalog {
    return this.groupProcesses.find(
      (groupProcess) => groupProcess.getUUID() === uuid
    );
  }

  public static getAllProcessCatalogs(): ProcessCatalog[] {
    return this.groupProcesses;
  }

  public static deleteAProcessCatalogByUUID(uuid: uuidv4): void {
    this.groupProcesses = this.groupProcesses.filter(
      (groupProcess) => groupProcess.getUUID() !== uuid
    );
  }

  public static updateAProcessCatalogByUUID(
    processCatalog: ProcessCatalog
  ): void {
    const index = this.groupProcesses.findIndex(
      (_groupProcess) => _groupProcess.getUUID() === processCatalog.getUUID()
    );

    this.groupProcesses[index] = processCatalog;
  }

  public static getGroupProcessByName(name: string): ProcessCatalog {
    return this.groupProcesses.find(
      (groupProcess) => groupProcess.getName() === name
    );
  }

  private static generateRandomTH(): number {
    return Math.random() * (1 - 0.1) + 0.1;
  }

  public static async saveGroupProcess(): Promise<void> {
    const path = "./database/group-process.json";
    if (!WriteForFile.existsForFile(path)){
      await WriteForFile.createDirectory('./database');
    }
    await WriteForFile.writeForFile(path, JSON.stringify(this.groupProcesses));
  }
  public static async loadGroupProcess(): Promise<void> {
    const path = "./database/group-process.json";
    const data = await WriteForFile.readForFile(path)
    this.groupProcesses = this.fromArray(JSON.parse(data));
  }

  public static fromArray(array: any): ProcessCatalog[] {
    const response = [];
    array.forEach((processCatalog) => {
      const processCatalog1 =  new ProcessCatalog(
        processCatalog.uuid,
        processCatalog.name,
        processCatalog.description,
        processCatalog.TH
      );
      console.log(processCatalog.processes);
      processCatalog1.setProcesses(processCatalog.processes);
      response.push(processCatalog1);
    });
    return response;
  }


}
