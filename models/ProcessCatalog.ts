import {Process} from './procces';
import {v4 as uuidv4} from 'uuid';

export class ProcessCatalog {
    private readonly uuidv4: uuidv4;
    private readonly name: string;
    private readonly description: string;
    private processes: Array<Process>;
    private readonly TH: number;

    constructor( uuidv4: uuidv4, name: string, description: string, TH: number ) {
        this.uuidv4 = uuidv4;
        this.name = name;
        this.description = description;
        this.TH = TH;
        this.processes = [];
    };

    public setProcesses(processes: Array<Process>) {
        processes.map( (process) => {
            process.setAbsoluteDescription(this.description);
            process.status = 'ready';
            process.setBurstTime(this.TH);
        });
        this.processes = processes;
    };

    public deleteAProcessByIndex(index: number) {
        this.processes.splice(index, 1);
    };

    public getProcessLength(): number {
        return this.processes.length;
    };

    public getUUID(): uuidv4 {
        return this.uuidv4;
    };

    public getName(): string {
        return this.name;
    };

    public getDescription(): string {
        return this.description;
    };

    public getTH(): number {
        return this.TH;
    };

    public getAllProcess(): Process[] {
        return this.processes;
    };

    public  getProcessByIndex(index: number): Process {
        return this.processes[index];
    };

    public toString() {
        let processString = '';

        for (const process of this.processes) {
            processString += `  ${process.toStringSimple()}\n`;
        }

        return `
                        UUID: ${this.uuidv4},
                        name: ${this.name},
                        description: ${this.description},
                        TH: ${this.TH},
                                    
                        process: {
                        ${processString}
                        }
                        `;
    };
}
