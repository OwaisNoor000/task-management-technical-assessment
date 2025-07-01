import {Request, Response} from "express";
import { LoginRequestDto, LoginResponseDto, UserRequestDto,UserResponseDto } from "../types/UserDto";
import * as userService from "../services/UserService";
import { generateJwt } from "../utils/JWTUtils";
import { AuthRequest } from "../types/AuthRequest";
import AppError, { CustomError } from "../types/AppError";

export async function register(req:Request,res:Response){
    const userRequestDto:UserRequestDto = req.body;
    try{
        const createdUser:UserResponseDto = await userService.registerUser(userRequestDto); 
        return res.status(201).json(createdUser);
    }catch(err){
        console.log(err);
        return res.status(500).json({"err":String(err)});
    }
}

export async function login(req:Request,res:Response){
   const loginRequestDto:LoginRequestDto = req.body;
   try{
        const loginStatus:LoginResponseDto = await userService.loginUser(loginRequestDto);
        
        if(loginStatus.status===true){
            const token = generateJwt(loginStatus.user.userId, loginStatus.user.email);
            res.setHeader("Authorization", `Bearer ${token}`);
        }
        

        return res.status(200).json(loginStatus);
   } catch(err){
        console.log(err);
        return res.status(500).json({err:String(err)});

   }
}

export async function getUserProfile(req:AuthRequest,res:Response){
    
    if(req.user?.userId===undefined){
        throw new AppError(CustomError.MISSING_JWT_TOKEN,"The jwt token was not checked by the Jwt Middleware and is missing");    
    }

    const userId:number = req.user?.userId;
    
    try{
        const user:UserResponseDto = await userService.getUser(userId);
        return res.status(200).json(user);
    }catch(err){
        console.log(err);
        return res.status(500).json({});
    }
}