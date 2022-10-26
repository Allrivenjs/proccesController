import { Response } from 'express';

import { Process } from '../models/procces';

export const getBashProcess = async ( req : any, res : Response ) => {
    const { n } = req.query;
    const getProcess = await Process.fromBash();

    res.json(getProcess);
};
