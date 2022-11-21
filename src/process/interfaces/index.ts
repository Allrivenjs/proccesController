import { IProcessEvent } from "./events";

export interface GetProcessesResponse {
    ok:      boolean;
    length:  number;
    process: IProcessDirty[];
}

export interface IProcessDirty {
    PID:                 string[];
    "%CPU":              string[];
    "%MEM":              string[];
    COMMAND:             string[];
    USER:                User[];
    NI:                  string[];
    VSZ:                 string[];
    RSS:                 string[];
    STAT:                Stat[];
    STARTED:             string[];
    TIME:                string[];
    CMD:                 string[];
    absoluteDescription: string;
    cycle:               number;
    text:                string;
}


export interface IProcess {
    id: number;
    PID:                 string;
    CPUPercentage:              string;
    MEMPercentage:              string;
    COMMAND:             string;
    USER:                User[];
    NI:                  string;
    VSZ:                 string;
    RSS:                 string;
    STAT:                Stat[];
    STARTED:             string;
    TIME:                string;
    CMD:                 string;
    absoluteDescription: string;
    cycle:               number;
    text:                string;
}

export interface IGroup {
    name: string;
    description: string;
    TH: string;
    processes: IProcessEvent[]
};

export enum Stat {
    I = "I<",
    S = "S",
    Ss = "Ss",
    StatI = "I",
}

export enum User {
    Root = "root",
}


export interface ICreateProcessCatalog {
    name: string;
    th: number;
    processes: IProcess[],
};
