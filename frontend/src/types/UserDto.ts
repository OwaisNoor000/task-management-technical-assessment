export interface User{
    userId:number;
    email:string;
    password:string;
    username:string;
    dateCreated:string;
}

export interface UserLoginResponse{
    status:boolean,
    result:number;
    user:User;
    token:string;
}

export interface UserLoginRequest{
    email:string,
    password:string,
}

export interface UserRegisterResponse{
    rowCount:number,
    userId:number,
    email:string,
    password:string,
    dateCreated:string,
}

export interface UserRegisterRequest{
    name:string,
    email:string,
    password:string,
}

