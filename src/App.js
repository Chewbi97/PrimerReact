import { BrowserRouter, Routes, Route } from "react-router-dom"
// Publicas
import LoginPage from "./Page/LoginPage/LoginPage"
import RegisterPage from "./Page/RegisterPage/RegisterPage"
import ForgetPage from "./Page/ForgetPage/ForgetPage"
import NotFoundPage from "./Page/Components/NotFoundPages"
import ResetPasswordPage from "./Page/ResetPasswordPage/ResetPasswordPage"

// Componentes del Dashboard y Protección
import ProtectedRoute from "./Page/Components/ProtectedRoute"
import DashboardLayout from "./Page/DashboradPage/DashboardLayout"
import DashboardPage from "./Page/DashboradPage/ComponentsDashboard/DashboardPage/DashboardPage"
import ProfilePage from "./Page/DashboradPage/ComponentsDashboard/DashboardNavbar/NavDropdown/ProfilePage"
import Inventory from "./Page/DashboradPage/ComponentsDashboard/DashboardNavbar/Navbar/Inventario/Inventario"
import UsersList from "./Page/DashboradPage/ComponentsDashboard/DashboardUsersList/DashboardUserList"

// Contexto de Autenticación 
import { AuthProvider } from "./Page/Components/AuthContext";

// Import para HOOKS (Se mantienen por fuera)
import UseEffectPlay from "./Playground/UseEffectPlay"
import UseStatePlay from "./Playground/UseStatePlay"
import UseRefPlay from "./Playground/UseRefPlay"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Rutas Públicas y de Hooks */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/ForgetPage" element={<ForgetPage />} />
          <Route path="/RegisterPage" element={<RegisterPage />} />
          <Route path="/ResetPasswordPage" element={<ResetPasswordPage />} />
          <Route path="/usestate" element={<UseStatePlay />} />
          <Route path="/useeffect" element={<UseEffectPlay />} />
          <Route path="/useref" element={<UseRefPlay />} />

          {/* 1. RUTAS PROTEGIDAS PARA TODOS (ROL NO REQUERIDO)   */}        
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>

              {/* Accesibles si solo está LOGUEADO */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/ProfilePage" element={<ProfilePage />} />

            </Route>
          </Route>

          {/* 2. RUTAS PROTEGIDAS SÓLO PARA ADMINISTRADOR          */}          
          <Route element={<ProtectedRoute requiredRole="administrador" />}>
            <Route element={<DashboardLayout />}>

              {/* Accesibles solo si el rol es "administrador" */}
              <Route path="/UsersList" element={<UsersList />} />

            </Route>
          </Route>


          {/* Ruta para páginas no encontradas */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;