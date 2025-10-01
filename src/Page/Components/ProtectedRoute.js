import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Spinner from "./Spinner"; 

function ProtectedRoute({ children, requiredRole }) {
    // USAMOS EL HOOK PARA OBTENER EL ESTADO GLOBAL
    const { user, firebaseLoading, isRoleLoading, userRole } = useAuth(); 
    
    // 🚨 1. ESTADO PARA VERIFICAR SI EL COMPONENTE ESTÁ MONTADO 🚨
    const isMounted = useRef(true); 
    
    const [canAccess, setCanAccess] = useState(false);
    const navigate = useNavigate();

    // Esperamos a que todo esté cargado (Firebase y Rol)
    const isLoading = firebaseLoading || isRoleLoading;
    
    // 🚨 2. EFECTO PARA LIMPIAR EL REF CUANDO EL COMPONENTE SE DESMONTA 🚨
    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (isLoading) {
            setCanAccess(false);
            return;
        }

        const isLoggingOut = sessionStorage.getItem('isLoggingOut') === 'true';

        // 1. Verificar si el usuario está autenticado
        if (!user) {
            setCanAccess(false);

            // 1a. Priorizar el Cierre de Sesión (SIN ALERTA)
            if (isLoggingOut) {
                sessionStorage.removeItem('isLoggingOut'); 
                navigate("/", { replace: true }); 
                return; 
            }

            // 1b. Acceso Restringido (CON ALERTA)
            if (isMounted.current) {
                Swal.fire({
                    icon: "warning",
                    title: "Acceso restringido",
                    text: "Debes iniciar sesión para acceder a esta página.",
                    confirmButtonText: "Ok",
                }).then(() => {
                    if (isMounted.current) { 
                        navigate("/", { replace: true });
                    }
                });
            }
            
            return; 
        }

        // 2. Verificar el Rol (Si no se requiere rol, acceso permitido)
        if (!requiredRole) {
            setCanAccess(true);
            return;
        }
        
        // 3. Si se requiere rol, verificar coincidencia
        if (userRole === requiredRole) {
            setCanAccess(true);
        } else {
            // 🚨 CORRECCIÓN CLAVE AQUÍ: REDIRECCIÓN FORZADA 🚨
            setCanAccess(false);

            // 1. Mostrar la alerta de acceso denegado
            if (isMounted.current) {
                Swal.fire({
                    icon: "error",
                    title: "Acceso denegado",
                    text: "No tienes permisos para acceder a esta página.",
                    confirmButtonText: "Ok",
                });
            }
            
            // 2. Navegación forzada inmediata (ESTO EVITA LA PANTALLA EN BLANCO)
            // Ya que el usuario no tiene el rol, lo mandamos al dashboard principal sin esperar al click.
            navigate("/dashboard", { replace: true }); 

            // Dejamos que la navegación haga el 'return', pero la lógica de React necesita el setCanAccess.
            // Si la navegación es instantánea, el return del useEffect ya no es necesario aquí.
        }
        
    }, [user, userRole, isLoading, navigate, requiredRole]);

    // Si está cargando, siempre mostramos el spinner
    if (isLoading) {
        return <Spinner />;
    }
    
    // Si el proceso de carga ha terminado y tiene acceso, renderizamos los componentes
    return canAccess ? <Outlet /> : null;  
}

export default ProtectedRoute;