
export interface Process {
    pid: number;
    cpu: number;
    men: number;
    command: string;
    user: string;
    NI: number;
    VSZ: bigint;
    RSS: bigint;
    STAT: string;
    started: string;
    time: string;
    cmd: string;
}