import * as userDao from "../daos/UserDao";
import { User } from "../models/User";
import AppError, { CustomError } from "../types/AppError";
import { LoginRequestDto, LoginResponseDto, UserRequestDto, UserResponseDto } from "../types/UserDto";




export const registerUser:(val:UserRequestDto)=>Promise<UserResponseDto> = async (userRequest:UserRequestDto)=>{
    let newUser:User = new User(null,userRequest.email,userRequest.password,userRequest.name);
    
    const createdUser:User = await userDao.createUser(newUser);
    const response:UserResponseDto = {
    rowCount:1,
    // UserID will never be null as db always generates user id, We do this to escape TS type check
    userId:createdUser.userId===null?-1:createdUser.userId, 
    email:createdUser.email,
    password:createdUser.password,
    username:createdUser.name,
    dateCreated:createdUser.dateCreated,
    };
    return response;
}

export const loginUser:(val:LoginRequestDto)=>Promise<LoginResponseDto> = async(loginRequest:LoginRequestDto)=>{
    let user:User = new User(null,loginRequest.email,loginRequest.password,"");

    try{
        const loggedInUser:User = await userDao.matchEmailAndPassword(user); // unused because as long as there is no error, credentials match
        console.log("username");
        console.log(loggedInUser.name);
        let userResponse:UserResponseDto = {
            userId:loggedInUser.userId,
            username:loggedInUser.name,
            email:loggedInUser.email,
            password:loggedInUser.password, // For caching purposes
            dateCreated:loggedInUser.dateCreated
        } as UserResponseDto
        return {"status":true,"result":"","user":userResponse} as LoginResponseDto;

    }catch(err){
        throw err
    }
}


export const getUser:(val:number)=>Promise<UserResponseDto> = async (userId:number)=>{
    const user:User = await userDao.getUserById(userId);
    return {
        userId:user.userId,
        username:user.name,
        password:user.password,
        email:user.email,
        dateCreated:user.dateCreated
    } as UserResponseDto
}

