import { Link } from "react-router-dom";


function Home(){
    return(
        <div>
            <h1>HOME</h1>
            <Link to ="/RegisterPage">
                <button>IR A REGISTRO</button>
            </Link>
            <Link to ="/ForgetPage">
                <button>OLVIDE MI CONTRASEÑA</button>
            </Link>
            <Link to ="/HooksGral">
                <button>HOOK GENERAL</button>
            </Link>
        </div>
    )
};

export default Home;