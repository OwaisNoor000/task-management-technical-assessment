import Task from "./Task";
import { IoMdAdd } from "react-icons/io";
import TaskForm from "./TaskForm";
// import { TaskResponse } from "../types/TaskDto";
import { Mutation, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTasks, updateTask,saveTask as persistTask } from "../hooks/TaskHooks";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { Provider } from "./ui/provider";
import { FaSpinner } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { TaskPriority } from "../types/TaskPriority";
import { TaskResponse, TaskUpdateRequest } from "../types/TaskDto";
import { TaskContext } from "../hooks/TaskContext";
import { TaskStatusEnum } from "../types/TaskStatusEnum";



export default function TaskInbox(){
    const [loading,setLoading] = useState(false);
    const [editMode,setEditMode] = useState(false);
    const [addMode,setAddMode] = useState(false);
    const {taskData,setTaskData} = useContext(TaskContext);
    const [chosenId,setChosenId] = useState(0);
    const [chosenTitle,setChosenTitle] = useState("");
    const [chosenDescription,setChosenDescription] = useState("");
    const [chosenPriority,setChosenPriority] = useState(TaskPriority.LOW);


    const queryClient = useQueryClient();

    const {status,error,data} = useQuery({
        queryKey:["tasks"],
        queryFn:getAllTasks
    });

    const updateMutation = useMutation({
        mutationFn:updateTask,
        
        onMutate: async (updatedTask) => {
            // Optimistic update
            await queryClient.cancelQueries({queryKey:["tasks"]});
            const previousTasks = queryClient.getQueryData<TaskResponse[]>(['tasks']);
            queryClient.setQueryData<TaskResponse[]>(['tasks'], oldTasks =>
            oldTasks
                ? oldTasks.map(task =>
                    task.id === updatedTask.id
                    ? { ...task, ...updatedTask }
                    : task
                )
                : []
            );
            return { previousTasks };
        },

        onError: (err, variables, context) => {
            // Rollback on error
            if (context?.previousTasks) {
            queryClient.setQueryData(['tasks'], context.previousTasks);
            }
            console.error('Save error:', err);
        },

        onSettled: () => {
            queryClient.invalidateQueries({queryKey:['tasks']});
        },

        onSuccess:newTask=>{
            // Cache the task on the frontend
            queryClient.setQueryData(["tasks",newTask.id],newTask);
        
        },
    });
    
    const addMutation = useMutation({
        mutationFn:persistTask,
        onSuccess:newTask=>{
            // Cache the task on the frontend
            queryClient.setQueryData(["tasks",newTask.id],newTask);
        },
        onError:(err)=>{console.log(err)}

    });

    const saveMutation = useMutation({
        mutationFn: persistTask,

        onMutate: async (newTaskData:TaskResponse) => {
            await queryClient.cancelQueries({ queryKey: ['tasks'] });

            const previousTasks = queryClient.getQueryData<TaskResponse[]>(['tasks']);

            // Create a fake ID for optimistic UI
            const fakeId = Date.now() * -1;
            const optimisticTask: TaskResponse = {
            ...newTaskData,
            id: fakeId
            };

            // Optimistically add to cache
            queryClient.setQueryData<TaskResponse[]>(['tasks'], oldTasks =>
            oldTasks ? [...oldTasks, optimisticTask] : [optimisticTask]
            );

            return { previousTasks, fakeId };
        },

        onError: (err, variables, context) => {
            if (context?.previousTasks) {
            queryClient.setQueryData(['tasks'], context.previousTasks);
            }
            console.error('Add error:', err);
        },

        onSuccess: (serverTask, variables, context) => {
            // Replace the optimisiitic task with the actual task
            queryClient.setQueryData<TaskResponse[]>(['tasks'], oldTasks =>
            oldTasks
                ? oldTasks.map(task =>
                    task.id === context?.fakeId ? serverTask : task
                )
                : [serverTask]
            );
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
        });

    
    
    useEffect(() => {
        setLoading(status === "pending");
    }, [status]);

    if(status==="error"){
        console.log(error);
    }

    if(status==="success"){
        console.log(data);
    }

    const editTask = (id:number)=>{
        // Do not execute this function if an edit pop up is already opened
        if(editMode===true || addMode===true){
            return;
        }

        if(data===undefined){return}

        for(const task of data){
            if(task.id===id){
                // Add selected task to context
                const taskToShow = {id:task.id,description:task.description,title:task.title,status:task.status,priority:task.priority} as TaskUpdateRequest;
                setTaskData(prev=>(
                    {
                        ...prev,
                        taskToUpdate:taskToShow
                    }
                ));

            }
        }
        setEditMode(true); 
    }

    const addTask=()=>{
        console.log("executes");
        if(editMode===true || addMode===true){
            return;
        }

        const taskToShow = {id:-1,description:"",title:"",status:TaskStatusEnum.PENDING,priority:TaskPriority.LOW} as TaskUpdateRequest;
        setTaskData(prev=>(
                {
                    ...prev,
                    taskToUpdate:taskToShow
                }
            ));
        setAddMode(true);
        
    }
    
    const closeEdit = ()=>{
        setEditMode(false);
        setAddMode(false);
    }
    
    const saveTask = (taskToSave:TaskUpdateRequest)=>{
        if(editMode){
            updateMutation.mutate({id:taskToSave.id,title:taskToSave.title,
            description:taskToSave.description,priority:taskToSave.priority,status:taskToSave.status} as TaskResponse
            );
            setEditMode(false);
        }else if(addMode){
            saveMutation.mutate({id:taskToSave.id,title:taskToSave.title,
            description:taskToSave.description,priority:taskToSave.priority,status:taskToSave.status} as TaskResponse
            );
            setAddMode(false);
        }
        
    }
    
    

    


    return (
        <div className="w-2/3 min-h-[500px] mt-24  p-4 overflow-scroll overflow-x-hidden scroll
        custom-scrollbar">
            <span className="text-4xl font-bold text-white flex flex-row items-center">
                Inbox
                { loading && <ClipLoader color="white" cssOverride={{margin:"0 20px 0 20px"}}/>}
            </span>
                
            <div className="flex flex-row items-center text-xl text-gray-300 hover:text-[#DE4C4A] hover:cursor-pointer"
           >
                <IoMdAdd className="text-gray-300 mx-2 text-2xl"/>
                <span className=""  onClick={()=>addTask()}>Add Task</span>
            </div>

            {data!==undefined && data.sort((t1,t2)=>t1.id-t2.id).map(t=>(
                <Task id={t.id} title={t.title} description={t.description} status={t.status} priority={t.priority} lastModified={t.updated_at}
                editTaskFunc={()=>editTask(t.id)}/>
            ))}

            <span style={{display:editMode||addMode?"block":"none"}}>
            <TaskForm cancelFunc={closeEdit} saveFunc={saveTask} editSyncVariable={editMode}/>
            </span>
        </div>
    )
}