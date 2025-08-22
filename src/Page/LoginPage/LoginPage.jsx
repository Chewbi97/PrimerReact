import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import bootstrap from "bootstrap"
//Estilos CSS//
//import "./LoginPage.css"



function Home() {
    return (
        <div className="home-container d-flex justify-content-center align-items-center vh-100">
            <div className="login-box" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">INICIO DE SESIÓN</h2>
                <form action="">
                    <div className="mb-3">
                        <label className="form-label d-flex-justify-content-center">Usuario</label>
                        <input type="text" placeholder="Usuario o Correo Electrónico" className="user-input" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label d-flex-justify-content-center">Contraseña</label>
                        <input type="password" placeholder="Contraseña" className="password-input" />
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="d-grid gap-3" style={{width:"250px"}}>
                            <Link to="/RegisterPage">
                                <button className="btn btn-primary width-100">IR A REGISTRO</button>
                            </Link>
                            <Link to="/ForgetPage">
                                <button className="btn btn-primary width-100">OLVIDE MI CONTRASEÑA</button>
                            </Link>
                            <Link to="/HooksGral">
                                <button className="btn btn-primary width-100">HOOK GENERAL</button>
                            </Link>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
};

export default Home;