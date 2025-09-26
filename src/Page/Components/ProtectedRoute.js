import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

function ProtectedRoute({ children, requiredRole }) {
  const [user, firebaseLoading] = useAuthState(auth);
  const [hasRequiredRole, setHasRequiredRole] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    // Si la autenticación está cargando, no hacer nada.

    if (firebaseLoading) {
      return;
    }

    const checkAccess = async () => {
     
      // 1. Verificar si el usuario está autenticado
      // 1. Verificar si el usuario está autenticado
      if (!user) {
        
        // 🚨 MODIFICACIÓN CLAVE: Verificamos si es un logout intencional
        const isLoggingOut = sessionStorage.getItem('isLoggingOut');

        if (isLoggingOut === 'true') {
            // Es un logout: limpiamos la bandera y redirigimos sin alerta
            sessionStorage.removeItem('isLoggingOut'); 
            navigate("/", { replace: true });
            setIsLoading(false);
            return;
        }

        // Si la bandera NO está puesta, es un intento de acceso directo (¡Mostramos la alerta!)
        Swal.fire({
          icon: "warning",
          title: "Acceso restringido",
          text: "Debes iniciar sesión para acceder a esta página.",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/", { replace: true });
        });
        setIsLoading(false); 
        return;
      }

      // 2. Si la ruta no requiere un rol específico, el acceso es permitido
      if (!requiredRole) {
        setHasRequiredRole(true);
       
        setIsLoading(false); // Detenemos la carga //
        return;
      }
      // 3. Si requiere un rol, obtener el documento del usuario
      const userDocRef = doc(db, 'usuarios', user.uid);
      const userDoc = getDoc(userDocRef).then((userDoc) => {
       
        // Verificar si el rol coincide
        if (userDoc.exists() && userDoc.data().rol === requiredRole) {
          setHasRequiredRole(true);
          } else {
          // El usuario no tiene el rol, mostramos la alerta y redirigimos
          Swal.fire({
            icon: "error",
            title: "Acceso denegado",
            text: "No tienes permisos para acceder a esta página.",
            confirmButtonText: "Ok",
          }).then(() => {
            navigate("/dashboard", { replace: true });
          });
        }
        setIsLoading(false); // Detenemos la carga
      })
    };
    checkAccess();
  }, [user, firebaseLoading, navigate, requiredRole]);
  // Si está cargando, siempre mostramos el spinner
  if (isLoading) {
    return <Spinner />;
  }
  // Si el proceso de carga ha terminado y tiene el rol, renderizamos los componentes
  //return children ? children : <Spinner/>;
  return hasRequiredRole ? children : <Spinner />;
}

export default ProtectedRoute;