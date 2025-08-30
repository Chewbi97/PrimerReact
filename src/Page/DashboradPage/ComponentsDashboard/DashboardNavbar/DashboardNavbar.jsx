import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase'; 
import { useAuthState } from 'react-firebase-hooks/auth'; 
import Swal from 'sweetalert2';
import logo from '../../../../assets/logo inventario.png';
import userDefault from '../../../../assets/user.png';


function DashboardNavbar() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const userPhoto = user?.photoURL || userDefault;

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
        await signOut(auth);
        sessionStorage.setItem("logout", "true");
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
          text: 'Hubo un problema al cerrar sesión.',
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
            <NavDropdown title="Personas" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => navigate('/clientes')}>Clientes</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigate('/auxiliares')}>Auxiliares</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => navigate('/usuario')}>usuario</Nav.Link>
            <Nav.Link onClick={() => navigate('/cronograma')}>Cronograma</Nav.Link>
            <Nav.Link onClick={() => navigate('/opcion1')}>Opción 1</Nav.Link>
            <Nav.Link onClick={() => navigate('/opcion2')}>Opción 2</Nav.Link>
            <Nav.Item className="logout-container" onClick={handleLogout}>
              <Nav.Link className="logout-link d-flex align-items-center gap-2">
                <FaSignOutAlt /> Cerrar Sesión
                <img src={userPhoto} alt="Foto de usuario" className="user-photo-nav" />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DashboardNavbar;