import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Navbar, Nav, Container, NavDropdown, Table, Button, Form, Modal, Image } from "react-bootstrap";
import { FaEdit, FaTrash, FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { auth, db } from "../../../../firebase";
import { signOut } from "../../../../firebase";
import "../DashboardUsersList/DashboardUserList.css"
import logo from '../../../../assets/logo inventario.png'

function UsersList() {
    const navigate = useNavigate();
    const [auxiliares, setAuxiliares] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAux, setSelectedAux] = useState(null);

    useEffect(() => {
        const fetchAuxiliares = async () => {
            const querySnapshot = await getDocs(collection(db, 'usuarios'));
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAuxiliares(data);
        };
        fetchAuxiliares();
    }, []);

    const handleEliminar = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás recuperar este registro!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await deleteDoc(doc(db, 'usuarios', id));
                setAuxiliares(auxiliares.filter(a => a.id !== id));
                Swal.fire('Eliminado', 'Registro eliminado correctamente.', 'success');
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'No se pudo eliminar el registro.', 'error');
            }
        }
    };

    const handleEdit = (aux) => {
        setSelectedAux(aux);
        setShowModal(true);
    };

    const handleSaveChanges = async () => {
        try {
            const auxRef = doc(db, 'usuarios', selectedAux.id);
            await updateDoc(auxRef, {
                nombres: selectedAux.nombres,
                apellidos: selectedAux.apellidos,
                cedula: selectedAux.cedula,
                telefono: selectedAux.telefono,
                email: selectedAux.email,
                fechaNacimiento: selectedAux.fechaNacimiento,
                sexo: selectedAux.sexo,
                estado: selectedAux.estado
            });

            setAuxiliares(auxiliares.map(a =>
                a.id === selectedAux.id ? selectedAux : a
            ));

            setShowModal(false);
            Swal.fire('Actualizado', 'Los datos fueron actualizados.', 'success');
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'No se pudo actualizar.', 'error');
        }
    };

    const handleModalChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        if (name === 'telefono' && !/^\d*$/.test(value)) {
            return; // Detiene la función si el valor no es un número
        }
        if (name === 'cedula' && !/^\d*$/.test(value)) {
            return; // Detiene la función si el valor no es un número
        }
        setSelectedAux({
            ...selectedAux,
            [name]: value
        });
    };

    //Edad del usuario//
    const calculateAge = (birthDate) => {
        if (!birthDate) return '-'; // Maneja los casos en que no hay fecha de nacimiento

        const today = new Date();
        const dob = new Date(birthDate);

        let age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();

        // Si el mes actual es menor que el mes de nacimiento, o si es el mismo mes pero el día actual es menor que el día de nacimiento, resta 1 a la edad.
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        return age;
    };

    //Estado del usuario//
    const StatusBadge = ({ estado }) => {
        let statusClass = 'pending';
        let statusText = 'Pendiente';

        if (estado === 'Activo') {
            statusClass = 'active';
            statusText = 'Activo';
        } else if (estado === 'Inactivo') {
            statusClass = 'disabled';
            statusText = 'Inactivo';
        }

        return (
            <span className={`status-badge ${statusClass}`}>
                {statusText}
            </span>
        );
    };

    //Roles//
    const RoleBadge = ({ role }) => {
        let roleClass = 'user';
        let roleText = 'Usuario';

        if (role === 'administrador') {
            roleClass = 'admin';
            roleText = 'Administrador';
        }

        return (
            <span className={`role-badge ${roleClass}`}>
                {roleText}
            </span>
        );
    };

    const normalizeName = (text) => {
        if (!text) return '';
        const words = text.split(' ');
        const normalized = words.map(word => {
            if (word.length > 0) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
            return '';
        }).join(' ');
        return normalized;
    };

    return (

        <>
            <main className="main-content">
                <Container fluidclassName="mt-4">
                    <h2 className="page-title text-center mb-4">
                        Usuarios
                    </h2>
                    <div className="table-container">
                        <Table striped bordered hover responsive className="tabla-auxiliares">
                            <thead>
                                <tr>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Cédula</th>
                                    <th>Teléfono</th>
                                    <th>Email</th>
                                    <th>Fecha Nacimiento</th>
                                    <th>Edad</th>
                                    <th>Sexo</th>
                                    <th>Estado</th>
                                    <th>Rol</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auxiliares.map(aux => (
                                    <tr key={aux.id}>
                                        <td>{normalizeName(aux.nombres)}</td>
                                        <td>{normalizeName(aux.apellidos)}</td>
                                        <td>{aux.cedula}</td>
                                        <td>{aux.telefono}</td>
                                        <td>{aux.email}</td>
                                        <td>{aux.fechaNacimiento || '-'}</td>
                                        <td>{calculateAge(aux.fechaNacimiento) || '-'}</td>
                                        <td>{aux.sexo || '-'}</td>
                                        <td><StatusBadge estado={aux.estado} /></td>
                                        <td><RoleBadge role={aux.rol} /></td>
                                        <td>
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => handleEdit(aux)}
                                            >
                                                <FaEdit />
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleEliminar(aux.id)}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </main>

            {/* MODAL EDICIÓN */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Auxiliar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedAux && (
                        <Form>
                            <Form.Group className="mb-2">
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombres"
                                    value={selectedAux.nombres}
                                    onChange={handleModalChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="apellidos"
                                    value={selectedAux.apellidos}
                                    onChange={handleModalChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Cédula</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cedula"
                                    value={selectedAux.cedula}
                                    onChange={handleModalChange}
                                    maxLength={10}
                                    minLength={10}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefono"
                                    value={selectedAux.telefono}
                                    onChange={handleModalChange}
                                    maxLength={10}
                                    minLength={10}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={selectedAux.email}
                                    onChange={handleModalChange}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Fecha de Nacimiento</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="fechaNacimiento"
                                    value={selectedAux.fechaNacimiento || ''}
                                    onChange={handleModalChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Sexo</Form.Label>
                                <Form.Select
                                    name="sexo"
                                    value={selectedAux.sexo || ''}
                                    onChange={handleModalChange}
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Estado</Form.Label>
                                <Form.Select
                                    name="estado"
                                    value={selectedAux.estado || 'Pendiente'}
                                    onChange={handleModalChange}
                                >
                                    <option>Pendiente</option>
                                    <option>Activo</option>
                                    <option>Inactivo</option>
                                </Form.Select>
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UsersList;