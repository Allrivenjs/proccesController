export interface ProcessEventResponse {
    status:         string;
    process:        IProcessEvent;
    processCatalog: ProcessCatalog;
    iteration:      number;
};

export interface IProcessEvent {
    PID:                 string;
    COMMAND:             string;
    USER:                string[];
    NI:                  string;
    VSZ:                 string;
    RSS:                 string;
    STAT:                string[];
    STARTED:             string;
    TIME:                string;
    CMD:                 string;
    burstTime:           number;
    status:              string;
    absoluteDescription: string;
    cycle:               number;
    text:                string;
    finished:            number;
    start:               number;
    percent:             number;
};

export interface ProcessCatalog {
    uuidv4:      string;
    name:        string;
    description: string;
    TH:          string;
    processes:   IProcessEvent[];
};


export interface ProcessFinishedEventResponse {
    status:          string;
    processCatalog:  ProcessCatalog;
    processFinished: IProcessEvent[];
}
