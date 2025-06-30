import { TaskPriority } from "../types/TaskPriority";
import {TaskStatusEnum} from "../types/TaskStatusEnum";
import { generateTodayDateTime} from "../utils/GeneralUtil";

export class Task{
    private _taskId: number | null;
    private _title: string;
    private _description: string;
    private _status: TaskStatusEnum;
    private _userId: number;
    private _dateCreated: string;
    private _dateUpdated: string;
    private _priority: TaskPriority;
    
    
    constructor(id:number|null,title:string,description:string,status:TaskStatusEnum,userId:number,priority:TaskPriority,dateCreated?:string,dateUpdated?:string){
        this._title = title;        
        this._description = description;
        this._status = status;
        this._userId = userId;
        this._dateCreated = dateCreated===undefined?generateTodayDateTime():dateCreated;
        this._dateUpdated = dateUpdated===undefined?generateTodayDateTime():dateUpdated;
        this._taskId = id;
        this._priority=priority;
    }


    public get taskId(): number | null {
        return this._taskId;
    }
    public set taskId(value: number | null) {
        this._taskId = value;
    }


    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get status(): TaskStatusEnum {
        return this._status;
    }
    public set status(value: TaskStatusEnum) {
        this._status = value;
    }

    public get userId(): number {
        return this._userId;
    }
    public set userId(value: number) {
        this._userId = value;
    }

    public get dateCreated(): string {
        return this._dateCreated;
    }
    public set dateCreated(value: string) {
        this._dateCreated = value;
    }

    public get dateUpdated(): string {
        return this._dateUpdated;
    }
    public set dateUpdated(value: string) {
        this._dateUpdated = value;
    }
    public get priority_1(): TaskPriority {
        return this._priority;
    }
    public set priority_1(value: TaskPriority) {
        this._priority = value;
    }
}