import { IProcess } from "./procces";
import {v4 as uuidv4} from 'uuid';

export interface IGroupProcess {
    id: uuidv4;
    name: string;
    description: string;
    processes: IProcess[];
}


export class GroupProcesses {
    private groupProcesses: IGroupProcess[] = [];

    public setGroupProcess(IGroupProcess: IGroupProcess){
        this.groupProcesses.push(IGroupProcess);
    }

    public getGroupProcess(uuid: uuidv4): IGroupProcess {
        return this.groupProcesses.find((groupProcess) => groupProcess.id === uuid);
    }

    public getGroupProcesses(): IGroupProcess[] {
        return this.groupProcesses;
    }

    public deleteGroupProcess(uuid: uuidv4): void {
        this.groupProcesses = this.groupProcesses.filter((groupProcess) => groupProcess.id !== uuid);
    }

    public updateGroupProcess(uuid: uuidv4, IGroupProcess: IGroupProcess): void {
        const index = this.groupProcesses.findIndex((groupProcess) => groupProcess.id === uuid);
        this.groupProcesses[index] = IGroupProcess;
    }

    public getGroupProcessByName(name: string): IGroupProcess {
        return this.groupProcesses.find((groupProcess) => groupProcess.name === name);
    }
}