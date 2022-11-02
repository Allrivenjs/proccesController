import { ProcessCatalog } from "./ProcessCatalog";
import { v4 as uuidv4 } from 'uuid';
import { Process } from "./procces";

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
        description = 'no description',
        TH = this.generateRandomTH(),
    ): number {
        const uuid = uuidv4();
        const processCatalog = new ProcessCatalog(uuid, name, description, TH);
        return this.groupProcesses.push(processCatalog) - 1;
    };

    public static async fillCatalogProcess(index: number) {
        const processes = await Process.fromBash();
        this.groupProcesses[index].setProcesses(processes);
    };

    public static setGroupProcess(processCatalog: ProcessCatalog){
        this.groupProcesses.push(processCatalog);
    }

    public static getAProcessCatalogByIndex(index: number): ProcessCatalog {
        return this.groupProcesses[index];
    };

    public static getAProcessCatalogByUUID(uuid: uuidv4): ProcessCatalog {
        return this.groupProcesses.find((groupProcess) => groupProcess.getUUID() === uuid);
    }

    public static getAllProcessCatalogs(): ProcessCatalog[] {
        return this.groupProcesses;
    }

    public static deleteAProcessCatalogByUUID(uuid: uuidv4): void {
        this.groupProcesses = this.groupProcesses.filter(
            (groupProcess) => groupProcess.getUUID() !== uuid);
    }

    public static updateAProcessCatalogByUUID(processCatalog: ProcessCatalog): void {
        const index = this.groupProcesses.findIndex(
            (_groupProcess) => _groupProcess.getUUID() === processCatalog.getUUID() );

        this.groupProcesses[index] = processCatalog;
    }

    public static getGroupProcessByName(name: string): ProcessCatalog {
        return this.groupProcesses.find((groupProcess) => groupProcess.getName() === name);
    }

    private static generateRandomTH(): number {
        return Math.floor(Math.random() * (10 - 1) + 5);
    };
}
