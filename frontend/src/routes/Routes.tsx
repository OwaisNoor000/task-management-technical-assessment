import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeForm from "../components/WelcomeForm";
import MainPage from "../pages/MainPage";
import Login from "../pages/LoginPage";
import { AuthProvider } from "../hooks/AuthContext";

export default function AppRoutes(){
    return(
    <Router>
      <Routes>
        <Route path="/welcome" element={<Login/>} />
        <Route path="/home" element={
          <AuthProvider>
            <MainPage/>
          </AuthProvider>
          } />
      </Routes>
    </Router>)
     
}
