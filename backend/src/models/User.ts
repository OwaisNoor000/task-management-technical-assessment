import bcrypt from 'bcrypt';
import { generateTodayDateTime } from '../utils/GeneralUtil';

export  class User{
    private _userId: number | null;
    private _email: string;
    private _password: string;
    private _name: string;
    private _dateCreated: string;

    constructor (userId:number|null,email:string,password:string,name:string,dateCreated?:string){
        this._userId = userId;
        this._email = email;
        this._password = password;
        this._name = name;
        
        if(dateCreated===undefined){
            this._dateCreated = generateTodayDateTime();
        }else{
            this._dateCreated=dateCreated;
        }
        
    }

    public get userId(): number | null {
        return this._userId;
    }
    public set userId(value: number | null) {
        this._userId = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get dateCreated(): string {
        return this._dateCreated;
    }
    public set dateCreated(value: string) {
        this._dateCreated = value;
    }
}