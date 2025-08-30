import { useAuthState } from 'react-firebase-hooks/auth'; 
import { auth } from '../../../../firebase';
import logo from '../../../../assets/logo inventario.png';
import userDefault from '../../../../assets/user.png';


function DashboardContent() {
  const [user] = useAuthState(auth);
  const userPhoto = user?.photoURL || userDefault;

  return (
    <main className="main-content">
      <div>
        <img src={logo} alt="logo inventario" className="main-logo" />
        <h1 className="welcome-title">Welcome to Inventory.App</h1>
        <p className="welcome-text">Manage your inventories, movements, and more efficiently!</p>

        <p className="welcome-text"><strong>Name:</strong> {user?.displayName || "Sin nombre"}</p>
        <p className="welcome-text"><strong>Email:</strong> {user?.email || "Sin correo"}</p>
        <img src={userPhoto} alt="Foto de usuario" className="main-logo" style={{ maxWidth: '100px', borderRadius: '50%' }} />
      </div>
    </main>
  );
}

export default DashboardContent;