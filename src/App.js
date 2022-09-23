import { Routes, Route } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import Login from './views/Login';
import { Budgets } from "./views/Budgets";
import ProtectedRoute from './auth/ProtectedRoute';

function App() {

  const { isLoading } = useAuth0();
 


  

  if (isLoading) {

    return <div>Loading...</div>;
  }

  return (
    <div className="vh-100" style={{background: "linear-gradient(to right, rgba(106, 133, 182, 0.5), rgba(186, 200, 224, 0.5)"}}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<ProtectedRoute component={Budgets} />} />
      </Routes>
      
    </div>
  );
}

export default App;
