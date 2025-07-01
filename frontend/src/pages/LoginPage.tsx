import WelcomeForm from "../components/WelcomeForm";
import { Provider } from "../components/ui/provider"

export default function Login(){
    return (
        <Provider>
            <div className=" flex flex-row justify-center items-center bg-[#1e1e1e]" 
            style={{height:'100vh',width:"100vw"}}>
                <WelcomeForm formType="register"/>
            </div>
        </Provider>
    )
}
