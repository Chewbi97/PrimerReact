
import '.Page\LoginPage\LoginPage.css'
import { useState } from 'react'
import Swal from 'sweetalert2'

function LoginPage() {
    //codigo de JS
    function handleloginclick(){
        const {username, setUsername} = useState('');

        function handleloginclick(){
            if(username.trim()=== ''){
                Swal.fire("Por favor ingresar un valor valido")
            }
        }
    }
    //etiquetas html
    return(
        <div className="login-container">
            <h2>EJERCICIO DE PRUEBA</h2>
            <input type="text" 
                placeholder="Escriba el Nombre de Usuario"
                value={username}
                onChange={(e) =>setUsername(e.target.value)}
            />              
            <button onClick={handleloginclick}>Iniciar Sesión</button> 

        </div>
    );
}

export default LoginPage;