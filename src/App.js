import { BrowserRouter,Routes,Route } from "react-router-dom"
//Publicas//
import LoginPage from "./Page/LoginPage/LoginPage"
import RegisterPage from "./Page/RegisterPage/RegisterPage"
import ForgetPage from "./Page/ForgetPage/ForgetPage"
import NotFoundPage from "./Page/Components/NotFoundPages"

//Import para HOOKS
import UseEffectPlay from "./Playground/UseEffectPlay"
import UseStatePlay from "./Playground/UseStatePlay"
import UseRefPlay from "./Playground/UseRefPlay"

//Import rutas de autenticación Firebase//
import ProtectedRoute from "./Page/Components/ProtectedRoute"
import DashboardPage from "./Page/DashboradPage/DashboardPage"
import ResetPasswordPage from "./Page/ResetPasswordPage/ResetPasswordPage"
import AuxiliaresPage from "./Page/AuxiliarPage/AuxiliarPage"

//Imports protocolos de seguridad//
import ProtectPage from "./Page/ProtectPage/ProtectPage"


function App() {
  
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} /> 
        <Route path="/ForgetPage" element={<ForgetPage/>} />
        <Route path="/RegisterPage" element={<RegisterPage/>} />
        <Route path="/ResetPasswordPage" element={<ResetPasswordPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        
        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<NotFoundPage />} />

        {/* Ruta protocolo de seguridad */}
        <Route path="/ProtectPage" element={<ProtectPage />} />

        {/* Rutas para Hooks*/}
        <Route path="/usestate" element={<UseStatePlay />} />
        <Route path="/useeffect" element={<UseEffectPlay />} />
        <Route path="/useref" element={<UseRefPlay />} />

       
      
      </Routes>
      </BrowserRouter>


  );    
};

export default App;
