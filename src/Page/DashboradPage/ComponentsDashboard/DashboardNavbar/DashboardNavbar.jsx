import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../../Components/AuthContext'; 
import { signOut } from 'firebase/auth';
import { auth } from '../../../../firebase';
import Swal from 'sweetalert2';
import logo from '../../../../assets/logo inventario.png';
import userDefault from '../../../../assets/user.png';
import "../DashboardNavbar/DashboardNavbar.css"


function DashboardNavbar() {
    const navigate = useNavigate();
    
    // 🚨 1. CENTRALIZAR EN useAuth 🚨
    const { 
        user,             // Usuario autenticado (de firebase-hooks)
        firebaseLoading,  // Estado de carga de Firebase Auth
        isRoleLoading,    // Estado de carga del Rol
        isAdmin           // Propiedad booleana de AuthContext
    } = useAuth();

    // El nombre a mostrar en el Dropdown
    const userDisplayName = user?.displayName || user?.email || 'Usuario';
    const userPhoto = user?.photoURL || userDefault;
    
    // Función de capitalización (se mantiene)
    const capitalizeName = (name) => {
        if (!name) return '';
        // Usamos el nombre del usuario del contexto o el email si no hay nombre
        const namePart = name.split(" ")[0]; 
        if (namePart.length === 0) return 'Usuario';
        return namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase();
    };

    const handleLogout = async () => {
        // ... (Tu lógica de Swal y signOut es correcta, asumiendo que signOut está disponible globalmente o en AuthContext) ...
        // Dado que signOut no está en AuthContext, asumiremos que está en el scope global (importado arriba)
        
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
                // Usar la función de signOut importada
                sessionStorage.setItem("isLoggingOut", "true");
                await signOut(auth); // 'auth' debe estar importado globalmente
                
                Swal.fire({
                    icon: 'success',
                    title: 'Sesión cerrada',
                    text: '¡Has cerrado sesión exitosamente!',
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => {
                    navigate('/', { replace: true });
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
    
    // 🚨 2. MANEJO DEL ESTADO DE CARGA 🚨
    // Si la autenticación o el rol están cargando, mostramos un navbar simplificado o un spinner.
    if (firebaseLoading || isRoleLoading) {
        return (
            <Navbar expand="lg" variant="dark" className="dashboard-navbar">
                 <Container>
                    <Navbar.Brand>Cargando...</Navbar.Brand>
                 </Container>
            </Navbar>
        );
    }
    
    // 🚨 3. LÓGICA DE RENDERIZACIÓN 🚨
    return (
        <Navbar expand="lg" variant="dark" className="dashboard-navbar">
            <Container>
                <Navbar.Brand onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
                    <img src={logo} alt="Brilla Logo" height="40" className="d-inline-block align-top" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        
                        {/* ✅ OCULTAR ENLACE DE USUARIOS (Ahora depende solo de isAdmin del contexto) */}
                        { isAdmin && (
                            // Usamos navigate para una navegación más limpia de React Router
                            <Nav.Link onClick={() => navigate('/UsersList')}>Usuarios</Nav.Link>
                        )}
                        
                        <Nav.Link onClick={() => navigate('/cronograma')}>Cronograma</Nav.Link>
                        <Nav.Link onClick={() => navigate('/inventory')}>Inventario</Nav.Link>
                        <Nav.Link onClick={() => navigate('/opcion2')}>Opción 2</Nav.Link>
                        
                        <NavDropdown id="basic-nav-dropdown" title={
                            <span className="d-flex align-items-center gap-2">
                                {/* Usamos el nombre limpio y capitalizado */}
                                {capitalizeName(userDisplayName)}
                                <img
                                    src={userPhoto}
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