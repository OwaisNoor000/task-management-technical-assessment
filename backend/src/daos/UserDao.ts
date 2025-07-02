import {query} from "./index";
import { hashPassword, validateEmail, verifyPassword } from "../utils/GeneralUtil";
import { User } from "../models/User";
import { UserRequestDto, UserResponseDto } from "../types/UserDto";
import AppError, { CustomError } from "../types/AppError";
import { response } from "express";
import { verifyJwt } from "../utils/JWTUtils";


export const getUserById:(val:number)=>Promise<User> = async (userId:number)=>{
    const result = await query(`SELECT * FROM users where id = $1`,[String(userId)]);
    if (result.rows.length>0){
        const response = result.rows[0];
        let user:User = new User(response.id,response.email,response.password,response.name,response.created);
        return user;
    }else{
        throw new AppError(CustomError.USER_ID_NONEXISTENT,"");
    }
    
    
}



export const createUser:(val:User)=>Promise<User> = async (user:User)=>{
    const hashedPassword = await hashPassword(user.password);
    const result = await query(
    `
    INSERT INTO users (email, password, name)
    VALUES ($1, $2, $3)
    RETURNING id, email, password, name, created_at
    `,
    [user.email, hashedPassword, user.name]
    );

    if(result===null || result.rowCount===null || result.rowCount==0){
        throw new AppError(CustomError.DATABASE_ERROR,"DB did not return anything after statement execution");
    }
    
    let response = result.rows[0]
    let createdUser:User = new User(response.id,response.email,response.password,response.name,response.created)
    return createdUser;
}

export const matchEmailAndPassword:(val:User)=>Promise<User> = async (user:User)=>{
    // Validate the email
    const response = await query(
        `
        SELECT * FROM users where email = $1
        `,
        [user.email]
    );

    if(response===null || response.rowCount===null){
        throw new AppError(CustomError.DATABASE_ERROR,"DB did not return anything after statement execution");
    }
    let emailCheck = response.rowCount===0?false:true;

    if(emailCheck){
        // Check the password after email match
        let matchingUser= response.rows[0]
        
        const response2 = await query(
            `
            SELECT password FROM users where email = $1
            `,
            [user.email]
        );
        if(response2===null || response.rowCount===null){
            throw new AppError(CustomError.DATABASE_ERROR,"DB did not return anything after statement execution");
        }
        console.log("Dao test");
        console.log(response2)
        let passwordCheck = false;
        passwordCheck = await verifyPassword(user.password,response2.rows[0].password)
        

        if(passwordCheck){
            return new User(matchingUser.id,matchingUser.email,matchingUser.password,matchingUser.name,matchingUser.created);
        }else{
            throw new AppError(CustomError.LOGIN_PASSWORD_INCORRECT,CustomError.LOGIN_PASSWORD_INCORRECT);
        }

    }else{
        throw new AppError(CustomError.LOGIN_EMAIL_INCORRECT,CustomError.LOGIN_EMAIL_INCORRECT);
    }
}