import {exec} from 'child_process';
import * as fs from 'fs';

// @ts-ignore
import Parser from 'table-parser';

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
    burstTime: number | null;
    status: string;
    absoluteDescription: string;

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
        this.burstTime = 0  //change (TH * (length of description of group process)) (TH is init for user)
        this.status = 'ready';
        this.absoluteDescription = '';
    }

    public static fromObject(obj: any): Process {
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
        process.burstTime = obj.burstTime;
        process.status = obj.status;
        return process;
    }

    public setBurstTime(burstTime: number): void {
        this.burstTime = burstTime; 
    }

    public getLengthProcess(description: string): number {
        return description.length + this.toString().length;
    }

    public setAbsoluteDescription(description: string) {
        this.absoluteDescription = description + this.toString();
    }

    public getAbsoluteDescription(): string {
        return this.absoluteDescription;
    }

    public getCharForDescriptionPosition(position: number): string {
        return this.absoluteDescription[position];
    }


    public static fromArray(arr: any[]): Process[] {
        const processes: Process[] = [];
        for (const obj of arr) {
            processes.push(Process.fromObject(obj));
        }
        return processes;
    }

    public static fromString(str: string): Process[] {
        const arr = Parser.parse(str);
        return Process.fromArray(arr);
    }

    public static async fromBash(): Promise<Process[]> {
        return await new Promise((resolve: any, _) => {
            exec(`ps -eo %cpu,%mem,pid,comm,user,nice,vsz,rss,stat,start,time,cmd | head -n 10`, (err: any, stdout: string, _: string) => {
                resolve(Process.fromString(stdout));
            });
        });
    }

    public static async fromFile(): Promise<Process[]> {
        return await new Promise((resolve: any, _) => {
            fs.readFile('./scripts/taskList.sh', 'utf8', (err: any, stdout: string) => {
                resolve(Process.fromString(stdout));
            });
        });
    }

    public toString(): string {
        return `PID: ${this.PID}, %CPU: ${this['%CPU']}, %MEM: ${this['%MEM']}, COMMAND: ${this.COMMAND}, USER: ${this.USER}, NI: ${this.NI}, VSZ: ${this.VSZ}, RSS: ${this.RSS}, STAT: ${this.STAT}, STARTED: ${this.STARTED}, TIME: ${this.TIME}, CMD: ${this.CMD}`;
    };

    public toStringSimple(): string {
        return `PID: ${this.PID}, %CPU: ${this['%CPU']}, %MEM: ${this['%MEM']}, BURST_TIME: ${this.burstTime} COMMAND: ${this.COMMAND},USER: ${this.USER}, TIME: ${this.TIME}`;
    }
}
