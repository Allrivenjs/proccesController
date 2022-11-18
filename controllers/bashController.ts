import { Response } from 'express';

import { Process } from '../models/procces';

export const getBashProcess = async ( req : any, res : Response ) => {
    const { number } = req.query;

    const processes: Process[] = await Process.fromBash( parseInt( number ) );

    return res.json({
        ok: true,
        "length": processes.length,
        "process": processes,
    });
};
