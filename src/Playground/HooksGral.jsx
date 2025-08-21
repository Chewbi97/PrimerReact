import { Link } from "react-router-dom";

function HooksGral(){
    return(
        <div>
            <h1>HOOKS GENERAL</h1>
            <Link to="/usestate">
                <button>IR A HOOK USESTATE</button>
            </Link>
            <Link to="/">
                <button>VOLVER AL INICIO</button>
            </Link>

        </div>
    );
}

export default HooksGral;