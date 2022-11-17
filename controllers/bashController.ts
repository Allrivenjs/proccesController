import { Response } from 'express';

import {  Process } from '../models/procces';

export const getBashProcess = async ( req : any, res : Response ) => {
    const { n } = req.query;

    const getProcess = await Process.fromBash();


    return res.json({
        ok: true,
        "length": getProcess.length,
        "process": getProcess.slice(0, n)
    });
}




