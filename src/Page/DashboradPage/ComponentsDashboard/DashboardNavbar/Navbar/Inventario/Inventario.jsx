import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../../../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Table, Button, Form, Modal, } from "react-bootstrap";
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import FormularioInsercion from './AddProducts';
import "./Inventario.css"

function Inventory() {
    // 🚨 CORRECCIÓN 1: useNavigate() debe ser llamado 🚨
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]); // Cambié 'product' a 'productos' por consistencia
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Funciones de control de Modal
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true); // Puedes usar esta función en el FAB

    // Función para obtener los productos (necesaria para el useEffect y handleProductAdded)
    const fetchProductos = async () => {
        try {
            const inventarioRef = collection(db, 'inventario');
            const snapshot = await getDocs(inventarioRef);

            const listaProductos = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setProductos(listaProductos);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // 🚨 Función para recargar la tabla al añadir producto 🚨
    const handleProductAdded = () => {
        handleClose(); // Cerrar el modal
        fetchProductos(); // Recargar los datos para ver el nuevo producto
    }

    // 🚨 CARGA INICIAL DE DATOS 🚨
    useEffect(() => {
        fetchProductos();
    }, []);

    // ... Lógica de Acciones (Entrada, Salida, Editar, Eliminar) ...

    if (isLoading) {
        return <p>Cargando inventario...</p>;
    }

    return (
        <section className="inventario-page-container">

            {/* 1. Encabezado de la página */}
            <header className="inventario-header">
                <h1>Inventario</h1>
            </header>

            {/* 2. Boton para añadir productos (FAB) */}
            <div className="fab-container">
                <Button
                    variant="primary"
                    className="fab-button shadow-lg"
                    onClick={handleShow} // 🚨 Usamos la función handleShow 🚨
                >
                    <FaPlus size={20} className="me-2" />
                    Añadir Producto
                </Button>
            </div>

            {/* 3. Sección de la Tabla (La Vista de Inventario) */}
            <section className="inventario-table-section">
                <Table striped hover responsive className="inventory-table"> {/* 🚨 CORRECCIÓN: Usar componente Table, no HTML puro 🚨 */}
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 🚨 RECORRIDO DE DATOS CON map() 🚨 */}
                        {productos.length > 0 ? (
                            productos.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.codigo}</td>
                                    <td>{p.nombre}</td>
                                    <td>{p.cantidad}</td>
                                    <td>
                                        <Button variant="light">
                                            <FaEllipsisV />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No hay productos en el inventario.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </section>

            {/* 4. Modal de Inserción */}
            <Modal
                show={showModal}
                onHide={handleClose}
            // ...
            >
                <Modal.Header closeButton>
                    <Modal.Title>Añadir Nuevo Producto</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/* 🚨 REEMPLAZAMOS el <Form> por el componente hijo 🚨 */}
                    <FormularioInsercion
                        // 👈 PASAMOS LA FUNCIÓN DE CALLBACK
                        onProductAdded={handleProductAdded}
                    />
                </Modal.Body>
            </Modal>

        </section>
    );
};


export default Inventory;