import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/Authpage';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/profile/:id" element={<Profile />} />
     
    </Routes>
  );
};

export default App;
