import { Link } from "react-router-dom";


function RECUPERACION(){
    return(
        <div>
            <h1>OLVIDE MI CONTRASEÑA</h1>
            <Link to ="/loginPage">
                <button>VOLVER AL INICIO</button>
            </Link>
            
        </div>
    )
};

export default RECUPERACION;