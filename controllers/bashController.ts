import {IProcess, Process} from "../models/procces";
import {Response} from "express";

const getBashProcess = async ( req : any, res : Response ) => {
    const { n } = req.query;
    const getProcess : IProcess[] = await Process.fromBash();


    return res.json({
        ok: true,
        "length": getProcess.length,
        "process": getProcess.slice(0, n)
    });
}
module.exports = {
    getBashProcess
}



