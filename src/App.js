import { BrowserRouter, Routes, Route } from "react-router-dom"
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
import DashboardPage from "./Page/DashboradPage/ComponentsDashboard/DashboardPage/DashboardPage"
import ResetPasswordPage from "./Page/ResetPasswordPage/ResetPasswordPage"
import ProfilePage from "./Page/DashboradPage/ComponentsDashboard/DashboardNavbar/NavDropdown/ProfilePage"
import DashboardContent from "./Page/DashboradPage/ComponentsDashboard/DashboardContent/DashboardContent"
import DashboardLayout from "./Page/DashboradPage/DashboardLayout"
import UsersList from "./Page/DashboradPage/ComponentsDashboard/DashboardUsersList/DashboardUserList"





function App() {

  return (

    <BrowserRouter>
      <Routes>

        {/* Rutas para páginas públicas */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/ForgetPage" element={<ForgetPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/ResetPasswordPage" element={<ResetPasswordPage />} />


        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<NotFoundPage />} />

        {/* Rutas protegidas */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/ProfilePage" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          {/* Accesibles solo para administradores */}
          <Route path="/UsersList" element={<ProtectedRoute requiredRole="Administrador"><UsersList /></ProtectedRoute>} />
        </Route>
        {/* Rutas para Hooks*/}
        <Route path="/usestate" element={<UseStatePlay />} />
        <Route path="/useeffect" element={<UseEffectPlay />} />
        <Route path="/useref" element={<UseRefPlay />} />
      </Routes>
    </BrowserRouter>


  );
};

export default App;
