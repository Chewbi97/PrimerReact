import { Link } from "react-router-dom";
//Estilos CSS//
import "./LoginPage.css"



function Home() {
    return (
        <div className="home-container">
            <div className="login-box">
                <h1>HOME</h1>
                <Link to="/RegisterPage">
                    <button className="login-btn">IR A REGISTRO</button>
                </Link>
                <Link to="/ForgetPage">
                    <button className="login-btn">OLVIDE MI CONTRASEÑA</button>
                </Link>
                <Link to="/HooksGral">
                    <button className="login-btn">HOOK GENERAL</button>
                </Link>
            </div>
        </div>
    )
};

export default Home;