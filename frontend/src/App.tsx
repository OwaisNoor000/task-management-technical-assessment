import React from 'react';
import MainPage from './pages/MainPage.tsx'
import ReactDOM from 'react-dom/client';
import 'react-datepicker/dist/react-datepicker.css';



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
