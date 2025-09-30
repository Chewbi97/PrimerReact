import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../../../../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Table, Button, Form, Modal, Dropdown } from "react-bootstrap";
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import Swal from "sweetalert2";
import FormularioInsercion from './AddProducts';
import ModalMovimiento from "./MovimientoInventario";
import "./Inventario.css"


function Inventory() {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Estado para saber qué producto se está editando (null = modo añadir)
    const [productoAEditar, setProductoAEditar] = useState(null);
    //Movimientos (Entrada/Salida)
    const [movimientoData, setMovimientoData] = useState({
        show: false,
        tipo: null,
        producto: null,
    });
    // Funciones de control de Modal
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true); // Puedes usar esta función en el FAB
    // Función para obtener los productos 
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

    // Función para recargar la tabla al añadir producto 
    const handleProductAdded = () => {
        handleClose(); // Cerrar el modal
        fetchProductos(); // Recargar los datos para ver el nuevo producto
    }

    //CARGA INICIAL DE DATOS 
    useEffect(() => {
        fetchProductos();
    }, []);

    //Acciones Entrada, Salida, Editar, Eliminar

    if (isLoading) {
        return <p>Cargando inventario...</p>;
    }

    //Acciones para los productos



    const handleCloseMovimiento = () => setMovimientoData({ show: false, tipo: null, producto: null, });

    const handleAccion = async (tipoAccion, productoSeleccionado) => {

        //ENTRADA/SALIDA 
        if (tipoAccion === 'entrada' || tipoAccion === 'salida') {
            setMovimientoData({
                show: true,
                tipo: tipoAccion,
                producto: productoSeleccionado,
            });
            return;
        }

        // 2. Lógica para EDICIÓN
        if (tipoAccion === 'editar') {
            setProductoAEditar(productoSeleccionado);
            setShowModal(true);
        }
        else if (tipoAccion === 'eliminar') {

            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: `¡Vas a eliminar permanentemente el producto "${productoSeleccionado.nombre}"! Esta acción no se puede deshacer.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, ¡Eliminar!',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                try {
                    const productoRef = doc(db, 'inventario', productoSeleccionado.id);
                    await deleteDoc(productoRef);

                    Swal.fire(
                        '¡Eliminado!',
                        `El producto "${productoSeleccionado.nombre}" ha sido eliminado.`,
                        'success'
                    );

                    fetchProductos();

                } catch (error) {
                    console.error("Error al eliminar el producto:", error);

                    // Mensaje de Error
                    Swal.fire(
                        'Error',
                        'Hubo un error al eliminar el producto. Inténtalo de nuevo.',
                        'error'
                    );
                }
            }
        }
    };

    const handleMovimientoExitoso = () => {
        handleCloseMovimiento();
        fetchProductos(); 
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
                                        <Dropdown>
                                            <Dropdown.Toggle variant="light" className={`dropdown-acciones`} as={Button}>
                                                <FaEllipsisV />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {/* 1. MOVIMIENTOS */}
                                                <Dropdown.Item onClick={() => handleAccion('entrada', p)}>Entrada de Producto</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleAccion('salida', p)}>Salida de Producto</Dropdown.Item>

                                                <Dropdown.Divider /> {/* 🚨 Separador 🚨 */}

                                                {/* 2. GESTIÓN DEL PRODUCTO */}
                                                <Dropdown.Item onClick={() => handleAccion('editar', p)}>Editar Detalles</Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => handleAccion('eliminar', p)}
                                                    className="text-danger" // Para resaltarlo en rojo
                                                >
                                                    Eliminar Producto
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
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
                    <FormularioInsercion
                        // 👈 PASAMOS LA FUNCIÓN DE CALLBACK
                        onProductAdded={handleProductAdded}
                    />
                </Modal.Body>
            </Modal>

            <ModalMovimiento
                movimientoData={movimientoData}
                handleClose={handleCloseMovimiento}
                onMovimientoExitoso={handleMovimientoExitoso}
            />

        </section>
    );
};


export default Inventory;