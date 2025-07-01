import { Request, Response, NextFunction } from "express";
import { generateJwt,verifyJwt } from "../utils/JWTUtils";
import { ResponseFormat } from "../../../../../../../node_modules/@langchain/core/dist/tools/types";
import AppError, { CustomError } from "../types/AppError";
import { AuthRequest } from "../types/AuthRequest";



export function authenticateJWT(req:AuthRequest,res:Response,next:NextFunction){
    const authHeader = req.headers.authorization;

    // All Protected routes must have a JWT token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: CustomError.MISSING_JWT_TOKEN});
        return;
    }

    const token = authHeader.split(" ")[1];

    try{
        const payload = verifyJwt(token) as {userId:number,email:string};

        if (!payload) {
            res.status(401).json({ message: CustomError.INVALID_JWT_TOKEN});
            return;
        }

        req.user = {userId:payload.userId,email:payload.email};
        next();
    }catch(err){
         res.status(401).json({ message: CustomError.INVALID_JWT_TOKEN});
         return;
    }
    

}

