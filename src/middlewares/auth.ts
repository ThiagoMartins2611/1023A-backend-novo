import { Request, Response, NextFunction } from "express";

class Auth{

    userAuth(req:Request, res:Response, next: NextFunction){
        console.log("passei no middleware")
        next()
        
    }

}

export default new Auth