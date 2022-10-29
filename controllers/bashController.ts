import { Response } from 'express';

import { IProcess, Process } from '../models/procces';

export const getBashProcess = async ( req : any, res : Response ) => {
    const { n } = req.query;

    const getProcess : IProcess[] = await Process.fromBash();


    return res.json({
        ok: true,
        "length": getProcess.length,
        "process": getProcess.slice(0, n)
    });
}




