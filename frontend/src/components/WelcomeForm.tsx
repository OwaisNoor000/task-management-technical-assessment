import { MdAdsClick } from "react-icons/md"
import { PasswordInput } from "./ui/password-input";
import {  useState } from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { createUser, validateLoginCredentials } from "../hooks/UserHooks";
import { Button, Input, Popover, Portal, Text } from "@chakra-ui/react"
import { Error } from "../types/Error";
import {useMutation,useQueryClient} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SuccessAlert from "./utils/SuccessAlert";
import { type displayType } from "./utils/SuccessAlert";
import axios from "axios";
import { previousSaturday } from "date-fns";
import type { UserLoginRequest } from "../types/UserDto";



type FormType = "register"|"login"

const toggleFormType = (ftype:FormType)=>{
    return ftype === "login" ? "register" : "login";
}

type WelcomeFormProps = {
   formType:FormType 
}


export default function WelcomeForm({formType}:WelcomeFormProps){
    const [ftype,setFtype] = useState(formType);
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [formError,setFormError] = useState<(Error|string)[]>([]);
    const [errorVisibility,setErrorVisibility] = useState(false);
    const [successMessageVisibility,setSuccessMessageVisibility] = useState<displayType>("none");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    


    const registerMutation = useMutation({
      mutationFn:createUser,
      onSuccess:(res)=>{

        navigate("/welcome");
        setFtype("login");
        setSuccessMessageVisibility("flex");
        setErrorVisibility(false);
        setUsername("");
        setPassword("");
      },
      onError:async (error)=>{
         if (axios.isAxiosError(error)) {
          console.error('Error response:', error.response?.data);

          // You can also store the server error message to show to the user
          if(error.response?.data.err){
            populateErrors([error.response?.data.err])
            setErrorVisibility(true);
            setSuccessMessageVisibility("none");
          }else{
            populateErrors([error.response?.data.error])
            setErrorVisibility(true);
            setSuccessMessageVisibility("none");
          }
            
        } else {
          console.error('Unexpected error:', error);
        }
      }
    });

   const loginMutation = useMutation({
      mutationFn:validateLoginCredentials,
      onSuccess:(res)=>{

        localStorage.setItem("token",res.token);

        navigate("/home");
        setSuccessMessageVisibility("flex");
        setErrorVisibility(false);
        setUsername("");
        setPassword("");
        
      },
      onError:async (error)=>{
         if (axios.isAxiosError(error)) {
          console.error('Error response:', error.response?.data);

          // You can also store the server error message to show to the user
          if(error.response?.data.err){
            populateErrors([error.response?.data.err])
            setErrorVisibility(true);
            setSuccessMessageVisibility("none");
          }else{
            populateErrors([error.response?.data.error])
            setErrorVisibility(true);
            setSuccessMessageVisibility("none");
          }
            
        } else {
          console.error('Unexpected error:', error);
        }
      }
    }); 


    const switchFormType = ()=>{
        setFtype(toggleFormType(ftype));
    }

    const populateErrors = (additionalErrors?:(Error|string)[]) => {
      const errors: (Error|string)[] = [];

      if (username.trim().replace(/\s+/g, " ") === "" && ftype==="register") {
        errors.push(Error.no_username);
      }
      if (password.trim().replace(/\s+/g, " ") === "") {
        errors.push(Error.no_password);
      }
      if(password.length<6){
        errors.push(Error.password_too_short)
      }
      if (email.trim().replace(/\s+/g, " ") === "") {
        errors.push(Error.no_email);
      }

      


      if (additionalErrors !== undefined){
        for(const error of additionalErrors){
          errors.push(error);
        }
      }
      


      setFormError(errors);
      return errors; // optional, for immediate logic
    };

    const register = async()=>{
      console.log("Register() is working"); 
      const errors = populateErrors();

      if(errors.length > 0){
        setErrorVisibility(true);
        return;
      }else{
        setErrorVisibility(false);
      }
      
      // Create new user
      registerMutation.mutate({
        "name":username,
        "password":password,
        "email":email,  
      });

    }

    const login = async()=>{
      const errors = populateErrors();

      if(errors.length > 0){
        setErrorVisibility(true);
        return;
      }else{
        setErrorVisibility(false);
      }
      
      loginMutation.mutate({"email":email,"password":password} as UserLoginRequest);
    }


    return (
        <div className="h-[500px] w-[500px] flex flex-col items-center text-white">
            <div className="" style={{fontWeight:"bold",fontSize:"30px"}}>
                {ftype.charAt(0).toUpperCase() + ftype.slice(1) + " "} 
                to your account</div>
            <div style={{margin:"5px 0 20px 0"}}>Enter your email and password below to sign in</div>
            <div className="" style={{margin:"10px 0px 10px 0px"}}>
                <Input type="email" css={{ "--focus-color": "#DE4C4A","--focus-width":"20px","border":"2px solid pink ","border-radius":"10px" 
                    ,"width":"400px",}}
                     placeholder="Email" size="lg" onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            {ftype==="register" && <div className="" style={{margin:"10px 0px 10px 0px"}}>
                <Input css={{ "--focus-color": "#DE4C4A","--focus-width":"20px","border":"2px solid pink ","border-radius":"10px" 
                    ,"width":"400px",
                }} placeholder="Username" size="lg" onChange={(e)=>{setUsername(e.target.value)}}/>
            </div>}
            <div className="" style={{margin:"10px 0px 10px 0px"}}>
                <PasswordInput placeholder="Password"
                css={{ "--focus-color": "#DE4C4A","--focus-width":"20px","border":"2px solid pink ","border-radius":"10px" 
                    ,"width":"400px",color:"white"
                }} 
                size="xl" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className="flex flex-row items-center w-[400px]">
                <span style={{margin:"0 10px 0 0"}}>
                    {ftype=="login"? "First time user?": "Already registered?"}
                </span>
                <span style={{fontWeight:"bold",color:"#DE4C4A"}} className="cursor-pointer hover:scale-110"
                onClick={switchFormType}>
                    {ftype=="login"? "Sign up": "Sign in"}
                </span>
            </div>
              
              
              <Popover.Root open={errorVisibility} closeOnInteractOutside={true} onOpenChange={(e) => setErrorVisibility(e.open)}>
                <Popover.Trigger asChild>
                  <Button loading={loading} css={{"backgroundColor":"#DE4C4A","marginTop":"15px","width":"400px"}}
                    className="hover:scale-105" onClick={ftype=="register"?register:login}>
                        <MdAdsClick /> Click me to   
                            {ftype=="register"? " Sign up": " Sign in"}
                  </Button>  
                </Popover.Trigger>
                <Portal>
                  <Popover.Positioner>
                    <Popover.Content>
                      <Popover.Arrow />
                      <Popover.Body>
                        <Text my="4">
                          {formError.map((err,index)=>(
                            <div key={index}>{index+1 +". "+ err}</div>
                          ))}
                        </Text>
                      </Popover.Body>
                    </Popover.Content>
                  </Popover.Positioner>
                </Portal>
              </Popover.Root>  
              
              <SuccessAlert text="Operation Successful" display={successMessageVisibility} setDisplay={setSuccessMessageVisibility}/>
        </div>
        )
  }

