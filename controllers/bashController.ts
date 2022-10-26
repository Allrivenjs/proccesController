import {IProcess, Process} from "../models/procces";
import {Response} from "express";

const getBashProcess = async ( req : any, res : Response ) => {
    const { n } = req.query;
    const getProcess : IProcess[] = await Process.fromBash(n);
    return res.send(getProcess);
}
module.exports = {
    getBashProcess
}



