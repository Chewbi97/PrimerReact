import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  const [fakeLoading, setFakeLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFakeLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && !fakeLoading) {
      if (!user) {
        const logoutFlag = sessionStorage.getItem("logout");

        if (!logoutFlag) {
          Swal.fire({
            icon: "warning",
            title: "Acceso restringido",
            text: "Debes iniciar sesión para acceder a esta página.",
            confirmButtonText: "Ok",
          }).then(() => {
            navigate("/", { replace: true });
          });
        } else {
          sessionStorage.removeItem("logout");
          navigate("/", { replace: true });
        }
      }
    }
  }, [loading, fakeLoading, user, navigate]);

  if (loading || fakeLoading) {
    return <Spinner />;
  }

  return user ? children : null;
}

export default ProtectedRoute;
