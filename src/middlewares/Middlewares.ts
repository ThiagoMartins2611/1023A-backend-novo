import { Request, Response, NextFunction } from "express";

class Middlewares{

     MiddlewaresGerais(req:Request, res:Response, next: NextFunction){
        return res.status(401).json("Mensagens de erro");
    }

    userVerify(req:Request, res:Response, next: NextFunction){
        return res.status(401).json("Mensagens de erro");
    }
}

export default new Middlewares