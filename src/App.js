import { BrowserRouter,Routes,Route } from "react-router-dom"
//Publicas//
import LoginPage from "./Page/LoginPage/LoginPage"
import RegisterPage from "./Page/RegisterPage/RegisterPage"
import ForgetPage from "./Page/ForgetPage/ForgetPage"
import ResetPasswordPage from "./Page/ResetPasswordPage/ResetPasswordPage"

//Import para HOOKS
import HooksGral from "./Playground/HooksGral"
import HookUseState from "./Playground/HookUseState" 
import UseEffectPlay from "./Playground/UseEffectPlay"
import UseStatePlay from "./Playground/UseStatePlay"
import UseRefPlay from "./Playground/UseRefPlay"

function App() {
  
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} /> 
        <Route path="/ForgetPage" element={<ForgetPage/>} />
        <Route path="/RegisterPage" element={<RegisterPage/>} />
        <Route path="/ResetPasswordPage" element={<ResetPasswordPage/>} />

        {/* Rutas para Hooks*/}
        <Route path="/HooksGral" element={<HooksGral/>} />
        <Route path="/usestate" element={<HookUseState/>} />
        <Route path="/usestate" element={<UseStatePlay />} />
        <Route path="/useeffect" element={<UseEffectPlay />} />
        <Route path="/useref" element={<UseRefPlay />} />

       ¿
      
      </Routes>
      </BrowserRouter>


  );    
};

export default App;
