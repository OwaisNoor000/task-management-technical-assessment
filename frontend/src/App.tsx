import React from 'react';
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import MainPage from './pages/MainPage.tsx'
import ReactDOM from 'react-dom/client';


function App(){
    return(
        <MainPage/>
    )
}

ReactDOM.createRoot(document.getElementById('app')!).render(
      <React.StrictMode>
                <App />
      </React.StrictMode>
);
