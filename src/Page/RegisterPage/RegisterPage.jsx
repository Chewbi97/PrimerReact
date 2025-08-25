import { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css"

function REGISTER() {

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmError, setConfirmError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const validatePassword = (value) => {
        setPassword(value);

        // Validador //
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        const hasMinLength = value.length >= 8;

        if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar || !hasMinLength) {
            setError("Debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.");
        } else {
            setError(""); // ✅ Cumple con todo
        }
    };
    const validateConfirmPassword = (value) => {
        setConfirmPassword(value);

        if (value !== password) {
            setConfirmError("Las contraseñas no coinciden.");
        } else {
            setConfirmError("");
        }
    };
    return (
        <div className="container d-flex justify-content-center align-items-start"
            style={{ minHeight: "100vh", paddingTop: "20px", paddingBottom: "20px", overflowY: "auto" }}>
            <div className="card p-4 shadow" style={{ width: "500px" }}>
                <h2 className="text-center mb-4">REGISTRO PARA NUEVO USUARIO</h2>
                <div className="mb-3">
                    <label className="form-label fw-bold">Nombre</label>
                    <input type="text" className="form-control mb-3" placeholder="Nombres de Usuario"></input>
                    <label className="form-label fw-bold">Apellido</label>
                    <input type="text" className="form-control mb-3" placeholder="Apellidos de Usuario"></input>
                    <label className="form-label fw-bold">Pais</label>
                    <input type="text" className="form-control mb-3" placeholder="Colombia"></input>
                    <label className="form-label fw-bold">Documento</label>
                    <div className="d-flex">
                        <select className="form-select me-2" style={{ width: "75px", height: "35px" }}>
                            <option>C.C</option>
                            <option>T.I</option>
                            <option>C.E</option>
                        </select>
                        <input type="text" className="form-control mb-3" placeholder="123456789"></input>
                    </div>
                    <label className="form-label fw-bold">Telefono</label>
                    <input type="text" className="form-control mb-3" placeholder="355555555"></input>
                    <label className="form-label fw-bold">Correo Electrónico</label>
                    <input type="text" className="form-control mb-3" placeholder="usuario@e-mail.com"></input>
                    <div>
                        <label className="form-label fw-bold">Contraseña</label>
                        <div className="input-group mb-2">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                value={password}
                                onChange={(e) => validatePassword(e.target.value)}
                                placeholder="Escriba su Contraseña"
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                            </button>
                        </div>
                        <div style={{ minHeight: "20px" }}>
                        {error && <small className="text-danger">{error}</small>}
                        </div>
                    <label className="form-label fw-bold">Confirmar Contraseña</label>
                    <div className="input-group mb-2">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => validateConfirmPassword(e.target.value)}
                            placeholder="Confirme su Contraseña"
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <i className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                        </button>
                    </div>
                    <div style={{ minHeight: "20px" }}>
                    {confirmError && <small className="text-danger">{confirmError}</small>}
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center mt-3">
                <Link to="/">
                    <button className="btn custom-btn w-140 d-flex align-items-center justify-content-center" style={{ width: "150px" }}>Registrar</button>
                </Link>
                <Link to="/">
                    <button className="custom-bttn w-140 d-flex align-items-center justify-content-center" style={{ width: "150px" }}>Cancelar</button>
                </Link>
            </div>
        </div>



        </div >
    )
};

export default REGISTER;