import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import "./LoginPage.css"

function Home() {

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleLogin = () => {

        const usuarioCorrecto = "admin";
        const passwordCorrecto = "1234";

        if (usuario === usuarioCorrecto && password === passwordCorrecto) {
            Swal.fire({
                icon: "success", title: "Bienvenido", text: "Inicio de sesión exitoso", confirmButtonColor: "#856CF5"
            });
        } else {
            Swal.fire({
                icon: "error", title: "Error", text: "Usuario o contraseña incorrectos", confirmButtonColor: "#856CF5"
            });
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: "350px" }}>
                <h3 className="text-center mb-4">INICIO DE SESIÓN</h3>

                <div className="mb-3">
                    <label className="form-label fw-bold">Usuario</label>
                    <input type="text" className="form-control" placeholder="Usuario o Correo Electrónico" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Contraseña</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"} className="form-control" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button
                            type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}><i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                        </button>
                    </div>
                </div>

                <div className="d-grid gap-2">
                    <button
                        className="btn w-75 mx-auto text-white" style={{ backgroundColor: "#8F42E3", border: "2px solid #421e68", borderRadius: "8px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", padding: "0", marginBottom: "15px" }} onClick={handleLogin}>Iniciar Sesión</button>

                    <Link to="/RegisterPage">
                        <button className="btn custom-btn w-100 d-flex align-items-center justify-content-center">Registrarse</button>
                    </Link>

                    <Link to="/ForgetPage">
                        <button className="btn custom-btn w-100 d-flex align-items-center justify-content-center">Olvidé Mi Contraseña</button>
                    </Link>

                    <Link to="/HooksGral">
                        <button className="btn custom-btn w-100 d-flex align-items-center justify-content-center">Hook General</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;