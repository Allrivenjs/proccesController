import { Response } from 'express';

import { IProcess, Process } from '../models/procces';

export const getBashProcess = async ( req : any, res : Response ) => {
    const { n } = req.query;
    const getProcess : IProcess[] = await Process.fromBash(n);
    return res.send(getProcess);
};
