import { Process } from './procces';
import {IGroupProcess} from "./groupProcesses";


// el algoritmo de round robin es:
// 1. crear los archivos de los procesos
// 2. ejecutar los procesos por turnos, cada proceso tiene un quantum
// 3. eliminar los archivos de los procesos
// 4. terminar;
export const roundRobin = (processCatalog: IGroupProcess, quantum: number) => {
    let processCatalogCopy = processCatalog;

    // createFilesByProcess(processCatalog);

    while (true) {
        for (let i = 0; i < quantum; i++) {
         //   executeProcess(actualProcess);
        }
        if (1==1){
            break;
        }
    }
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
    }
};

const deleteFilesByProcess = (processCatalog: Array<Process>) => {
    for (const process of processCatalog) {
        // TODO:
        // llamar al helper para eliminar los archivos de los procesos y limpiar esa vaina:
    }
};
