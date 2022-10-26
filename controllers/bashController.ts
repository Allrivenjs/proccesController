import {IProcess, Process} from "../models/procces";
import {Response} from "express";

const getBashProcess = async ( req : any, res : Response ) => {
    const { n } = req.query;
    const getProcess = await Process.fromBash();
}
module.exports = {
    getBashProcess
}



