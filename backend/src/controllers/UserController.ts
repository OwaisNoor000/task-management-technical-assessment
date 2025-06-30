import {Request, Response} from "express";
import { LoginRequestDto, LoginResponseDto, UserRequestDto,UserResponseDto } from "../types/UserDto";
import * as userService from "../services/UserService";

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
        return res.status(200).json(loginStatus);
   } catch(err){
        console.log(err);
        return res.status(500).json();

   }
}

export async function getUserProfile(req:Request,res:Response){
    const userId:number = parseInt(req.params.id,10);
    try{
        const user:UserResponseDto = await userService.getUser(userId);
        return res.status(200).json(user);
    }catch(err){
        console.log(err);
        return res.status(500).json({});
    }
}