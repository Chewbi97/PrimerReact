
import './LoginPage.css';
import { useState } from 'react';
import Swal from 'sweetalert2';

function LoginPage() {
    const [username, setUsername] = useState('');

    function handleLoginClick() {
        if (username.trim() === '') {
            Swal.fire("Por favor ingrese un valor válido");
        } else {
            Swal.fire(`Bienvenido ${username}`);
        }
    }

    return (
        <div className="login-container">
            <h2>EJERCICIO DE PRUEBA</h2>
            <input 
                type="text" 
                placeholder="Escriba el Nombre de Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />              
            <button onClick={handleLoginClick}>Iniciar Sesión</button> 
        </div>
    );
}

export default LoginPage;