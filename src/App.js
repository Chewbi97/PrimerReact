import { BrowserRouter,Routes,Route } from "react-router-dom"
import LoginPage from "./Page/LoginPage/LoginPage"
import RegisterPage from "./Page/RegisterPage/RegisterPage"
import ForgetPage from "./Page/ForgetPage/ForgetPage"

//Import para HOOKS
import HooksGral from "./Playground/HooksGral"
import HookUseState from "./Playground/HookUseState" 


function App() {
  
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/LoginPage" element={<LoginPage/>} /> 
        <Route path="/Forgetpage" element={<ForgetPage/>} />
        <Route path="/RegisterPage" element={<RegisterPage/>} />

        {/* Rutas para Hooks*/}
        <Route path="/HooksGral" element={<HooksGral/>} />
        <Route path="/usestate" element={<HookUseState/>} />
        
      
      </Routes>
      </BrowserRouter>


  );    
};

export default App;
