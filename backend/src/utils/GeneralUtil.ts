import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { UserResponseDto } from '../types/UserDto';
import { Request, Response, NextFunction } from 'express';

export const generateTodayDateTime:()=>string = ()=>{
    const today = new Date();

    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const hashPassword:(val:string)=>Promise<string> = (password:string)=>{
    const saltRounds = 10;
    const hashedPassword = bcrypt.hash(password,saltRounds).then(result=>{return result} ); 
    // We do this because the above variable is a promise
    return hashedPassword;
}

export const validateEmail:(val:string)=>boolean = (email:string)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


export function asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
}
