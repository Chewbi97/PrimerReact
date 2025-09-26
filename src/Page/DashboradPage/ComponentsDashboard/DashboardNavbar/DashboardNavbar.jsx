import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { signOut, updateProfile, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';
import logo from '../../../../assets/logo inventario.png';
import userDefault from '../../../../assets/user.png';
import "../DashboardNavbar/DashboardNavbar.css"


function DashboardNavbar() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const displayName = user?.displayName;
  const [userFirstName, setUserFirstName] = useState('');
  const userPhoto = user?.photoURL || userDefault;
  const [userRole, setUserRole] = useState(null); 
  const [isRoleLoading, setIsRoleLoading] = useState(true);

  const capitalizeName = (name) => {
    if (!name) return '';
    return name.split(' ').map(word => {
      if (word.length === 0) return '';
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  };

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        // Si el usuario tiene displayName (ej. Google), lo usamos
        if (user.displayName) {
          setUserFirstName(user.displayName.split(" ")[0]);
        } else {
          // Si no, buscamos el nombre en Firestore
          const userDocRef = doc(db, 'usuarios', user.uid);
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            // Capturamos el primer nombre y lo guardamos
            setUserFirstName(userData.nombres.split(" ")[0]);
          } else {
            // Si por alguna razón no se encuentra, usamos el correo
            setUserFirstName(user.email.split("@")[0]);
          }
        }
      } else {
        // Si no hay usuario, el nombre es 'Usuario'
        setUserFirstName('Usuario');
      }
    };
    fetchUserName();
  }, [user]); // Este useEffect se ejecuta cada vez que el estado del usuario cambia
  
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a cerrar sesión.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'No, quedarme',
    });

    if (result.isConfirmed) {
      try {
        // Mantenemos la bandera *ANTES* del signOut, por si acaso
        sessionStorage.setItem("isLoggingOut", "true"); // <-- Renombré a 'isLoggingOut' para claridad

        await signOut(auth);
        
        // Eliminamos el sessionStorage.setItem que estaba aquí, ya lo pusimos arriba.
        
        Swal.fire({
          icon: 'success',
          title: 'Sesión cerrada',
          text: '¡Has cerrado sesión exitosamente!',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate('/');
        });
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          title: 'Hubo un problema al cerrar sesión.',
        });
      }
    }
  };
  return (
    <Navbar expand="lg" variant="dark" className="dashboard-navbar">
      <Container>
        <Navbar.Brand onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Brilla Logo" height="40" className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
{            /*<Nav.Link onClick={() => navigate('/UsersList')}>Usuarios</Nav.Link>*/

}
            {/*<a href='/UsersList'>Usuarios</a>*/}
            <Nav.Link onClick={() => window.location.href = '/UsersList'}>Usuarios</Nav.Link>
            <Nav.Link onClick={() => navigate('/cronograma')}>Cronograma</Nav.Link>
            <Nav.Link onClick={() => navigate('/inventory')}>Inventario</Nav.Link>
            <Nav.Link onClick={() => navigate('/opcion2')}>Opción 2</Nav.Link>
            <NavDropdown id="basic-nav-dropdown" title={
              <span className="d-flex align-items-center gap-2">
                {capitalizeName(userFirstName)}
                <img
                  src={user?.photoURL || userDefault}
                  alt="Foto de usuario"
                  className="rounded-circle"
                  width="30"
                  height="30"
                />

              </span>

            }>
              <NavDropdown.Item onClick={() => navigate('/ProfilePage')}>Perfil</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DashboardNavbar;