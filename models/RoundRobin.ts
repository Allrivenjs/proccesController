import {IProcess, Process} from './procces';
import {IGroupProcess} from "./groupProcesses";

// TODO:
// el algoritmo de round robin es:
// 1. crear los archivos de los procesos
// 2. ejecutar los procesos por turnos, cada proceso tiene un quantum
// 3. eliminar los archivos de los procesos
// 4. terminar;


// TODO:
// tenemos que tener un IGroupProcess que tenga un array de procesos, y recibimos el quantum, entonces:
// debemos ejecutar solo un proceso del grupo de procesos, y en ese proce debemos asignarle un nombre que sera el nombre del proceso,
// y tambien una descripcion, que sera la descripcion del grupo de procesos y el contenido asocitivo al proceso


// se debe definir que el procesos se pueda contener en un array de listos, en un array (siempre sera un proceso) de ejecucion y en un array de terminados
// el algoritmo debe permitir pausar el hilo de ejecucion, y debe permitir reanudar el hilo ( entiendase como hilo el procesos que se esta ejecutando ) de ejecucion (esto es para el front)


// para poder resolver eso,
//


let arrayReady: Array<Promise<IProcess>> = [];
let arrayExecution: Array<Process> = [];
let arrayFinished: Array<Process> = [];


export const roundRobin = (groupProcess: IGroupProcess, quantum: number) => {

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
