import React from 'react';
import MainPage from './pages/MainPage.tsx'
import ReactDOM from 'react-dom/client';
import 'react-datepicker/dist/react-datepicker.css';
import WelcomeForm from './components/WelcomeForm.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from 'react-router-dom';
import AppRoutes from './routes/Router.tsx';


const queryClient = new QueryClient();

function App(){
    return(
        <AppRoutes/>
    )
}

ReactDOM.createRoot(document.getElementById('app')!).render(
    <React.StrictMode>
        <QueryClientProvider client = {queryClient}>
            <App />
          </QueryClientProvider>
      </React.StrictMode>

);
