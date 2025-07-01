import type { UserLoginRequest, UserLoginResponse, UserRegisterRequest, UserRegisterResponse } from "../types/UserDto";
import axios from 'axios';

export const createUser:(val:UserRegisterRequest)=>Promise<UserRegisterResponse> = (req:UserRegisterRequest)=>{
    return axios
        .post("http://localhost:3000/api/auth/register",req).then((response)=>{
            return response.data;
        });

}

export const validateLoginCredentials:(val:UserLoginRequest)=>Promise<UserLoginResponse> = (req:UserLoginRequest)=>{
    return axios
        .post("http://localhost:3000/api/auth/login",req).then((response)=>{
            return response.data;
        })
}