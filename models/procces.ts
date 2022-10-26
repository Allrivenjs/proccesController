import { exec } from 'child_process';
import * as fs from 'fs';

// @ts-ignore
import Parser from 'table-parser';

export interface IProcess {
    PID: number;
    '%CPU': number;
    '%MEM': number;
    COMMAND: string;
    USER: string;
    NI: number;
    VSZ: bigint;
    RSS: bigint;
    STAT: string;
    STARTED: string;
    TIME: string;
    CMD: string;
    burstTime: number;
}


export class Process {
    PID: number;
    '%CPU': number;
    '%MEM': number;
    COMMAND: string;
    USER: string;
    NI: number;
    VSZ: bigint;
    RSS: bigint;
    STAT: string;
    STARTED: string;
    TIME: string;
    CMD: string;
    burstTime: number;

    constructor() {
        this.PID = 0;
        this['%CPU'] = 0;
        this['%MEM'] = 0;
        this.COMMAND = '';
        this.USER = '';
        this.NI = 0;
        this.VSZ = BigInt(0);
        this.RSS = BigInt(0);
        this.STAT = '';
        this.STARTED = '';
        this.TIME = '';
        this.CMD = '';
        this.burstTime = Math.random() * (100 - 10) + 10;
    }

    public static fromObject(obj: any): IProcess {
        const process = new Process();
        process.PID = obj.PID;
        process['%CPU'] = obj['%CPU'];
        process['%MEM'] = obj['%MEM'];
        process.COMMAND = obj.COMMAND;
        process.USER = obj.USER;
        process.NI = obj.NI;
        process.VSZ = obj.VSZ;
        process.RSS = obj.RSS;
        process.STAT = obj.STAT;
        process.STARTED = obj.STARTED;
        process.TIME = obj.TIME;
        process.CMD = obj.CMD;
        return process;
    }

    public static fromArray(arr: any[]): IProcess[] {
        const processes: Process[] = [];
        for (const obj of arr) {
            processes.push(Process.fromObject(obj));
        }
        return processes;
    }

    public static fromString(str: string): IProcess[] {
        const arr = Parser.parse(str);
        return Process.fromArray(arr);
    }

    public static async fromBash(n : number = 10): Promise<IProcess[]> {
        return await new Promise((resolve: any, _) => {
            exec(`ps -eo %cpu,%mem,pid,comm,user,nice,vsz,rss,stat,start,time,cmd | head -n ${n}`, (err: any, stdout:string, _: string) => {
                resolve(Process.fromString(stdout));
            });
        });
    }

    public static async fromFile(): Promise<IProcess[]> {
        return await new Promise((resolve: any, _) => {
            fs.readFile('./scripts/taskList.sh', 'utf8', (err: any, stdout: string) => {
                resolve(Process.fromString(stdout));
            });
        });
    }

}
