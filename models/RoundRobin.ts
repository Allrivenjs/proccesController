import { Process } from './procces';

export const roundRobin = (processCatalog: Array<Process>, quantum: number) => {
    let processCatalogCopy = processCatalog;
    
    let actualProcess = processCatalog[0];

    createFilesByProcess(processCatalog);

    while(true) {
        for (let i = 0; i < quantum; i++) {
            executeProcess(actualProcess);
        };
        break;
    };
};

const executeProcess = (process: Process) => {
    // TODO:
    // hace las cositas que vaya a hacer el proceso, es decir, escribir en el archivo
};

const createFilesByProcess = (processCatalog: Array<Process>) => {
    for (const process of processCatalog) {
        // TODO:
        // llamar al helper para crear archivos con:
        // - el nombre del proceso en cuestión
        // - la ruta, que sea por defecto ./process_files o algo así
    };
};

const deleteFilesByProcess = (processCatalog: Array<Process>) => {
    for (const process of processCatalog) {
        // TODO:
        // llamar al helper para eliminar los archivos de los procesos y limpiar esa vaina:
    };
};
