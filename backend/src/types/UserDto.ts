export interface UserRequestDto{
    email:string;
    password:string;
    name:string;
}

export interface UserResponseDto{
    rowCount:number;
    userId:number;
    email:string;
    password:string;
    username:string;
    dateCreated:string;
}

export interface LoginRequestDto{
    email:string;
    password:string
}

export interface LoginResponseDto{
    status:boolean;
    result:string;
    user:UserResponseDto;
}
