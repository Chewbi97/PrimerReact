import { Link } from "react-router-dom";


function REGISTER() {
    return (
        <div className="container d-flex justify-content-center align-items-start" style={{ minHeight: "100vh", paddingTop: "20px", paddingBottom: "20px", overflowY: "auto" }}>
            <div className="card p-4 shadow" style={{ width: "500px" }}>
                <h2 className="text-center mb-4">REGISTRO PARA NUEVO USUARIO</h2>
                <div className="mb-3">
                    <label className="form-label fw-bold">Nombre</label>
                    <input type="text" className="form-control mb-3" placeholder="Juan"></input>
                    <label className="form-label fw-bold">Apellido</label>
                    <input type="text" className="form-control mb-3" placeholder="Peréz"></input>
                    <label className="form-label fw-bold">Pais</label>
                    <input type="text" className="form-control mb-3" placeholder="Mexico"></input>
                    <label className="form-label fw-bold">Documento</label>
                    <div className="d-flex">
                        <select className="form-select me-2" style={{ width: "100px" }}>
                            <option>C.C</option>
                            <option>T.I</option>
                            <option>C.E</option>
                        </select>
                        <input type="text" className="form-control mb-3" placeholder="123456789"></input>
                    </div>
                    <label className="form-label fw-bold">Telefono</label>
                    <input type="text" className="form-control mb-3" placeholder="355555555"></input>
                    <label className="form-label fw-bold">Correo Electrónico</label>
                    <input type="text" className="form-control mb-3" placeholder="juan@email.com"></input>
                    <label className="form-label fw-bold">Contraseña</label>
                    <input type="text" className="form-control mb-3" placeholder="8 Caracteres, al menos una mayuscula, un numero y un caracter especial" style={{ fontSize: "12px" }}></input>
                    <label className="form-label fw-bold">Confirmar Contraseña</label>
                    <input type="text" className="form-control mb-3" placeholder="8 Caracteres, al menos una mayuscula, un numero y un caracter especial"></input>

                </div>
                <div className="d-flex flex-column align-items-center mt-3">
                    <Link to="/">
                        <button className="btn btn-primary mb-2" style={{ width: "150px" }}>Registrar</button>
                    </Link>
                    <Link to="/">
                        <button className="btn btn-light border" style={{ width: "150px" }}>Cancelar</button>
                    </Link>
                </div>
            </div>



        </div>
    )
};

export default REGISTER;