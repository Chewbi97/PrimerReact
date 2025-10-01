import React, { useState, useEffect, useMemo, useCallback } from "react";
import { db } from "../../../../../../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../Components/AuthContext"; 
import { Table, Button, Form, Modal, Dropdown, FormControl } from "react-bootstrap";
import { FaPlus, FaEllipsisV, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Swal from "sweetalert2";
import FormularioInsercion from './AddProducts';
import ModalMovimiento from "./MovimientoInventario";
import "./Inventario.css"


function Inventory() {
    const navigate = useNavigate();
    
    // 🚨 CORRECCIÓN CLAVE: OBTENER EL OBJETO 'user' COMPLETO 🚨
    const { isAdmin, isRoleLoading, user } = useAuth(); 

    // Definición de Estados
    const [productos, setProductos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    
    const [productoAEditar, setProductoAEditar] = useState(null);
    const [movimientoData, setMovimientoData] = useState({
        show: false,
        tipo: null,
        producto: null,
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    // Función para obtener los productos 
    const fetchProductos = useCallback(async () => {
        // 🚨 VERIFICACIÓN CLAVE: Si el usuario o su UID no están disponibles, salimos 🚨
        if (!user || !user.uid) {
            setIsLoading(false);
            return;
        }

        try {
            // ✅ CORREGIDO: Referencia a la subcolección del usuario para LECTURA
            const inventarioRef = collection(db, 'inventario', user.uid, 'inventario');
            
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
    }, [user]); 

    // Funciones de manejo de Modales/Recarga
    const handleClose = () => {
        setShowModal(false);
        setProductoAEditar(null);
    }
    const handleShow = () => {
        setProductoAEditar(null);
        setShowModal(true);
    }
    
    const handleProductAdded = () => {
        handleClose();
        fetchProductos();
    }
    
    const handleCloseMovimiento = () => setMovimientoData({ show: false, tipo: null, producto: null, });

    const handleMovimientoExitoso = () => {
        handleCloseMovimiento();
        fetchProductos();
    }

    // CARGA INICIAL DE DATOS 
    useEffect(() => {
        fetchProductos();
    }, [fetchProductos]); 

    // Lógica de ordenación y filtrado (se mantiene)
    const sortedProductos = useMemo(() => {
        let sortableItems = [...productos];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                // ... (lógica de ordenación)
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                const isNumeric = sortConfig.key === 'cantidad' || sortConfig.key === 'valorUnitario'; 

                let valA, valB; 

                if (isNumeric) {
                    valA = parseFloat(aValue);
                    valB = parseFloat(bValue);
                } else {
                    valA = String(aValue).toLowerCase();
                    valB = String(bValue).toLowerCase();
                }

                if (valA < valB) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (valA > valB) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [productos, sortConfig]);

    const filteredProductos = useMemo(() => {
        if (!searchTerm) {
            return sortedProductos;
        }

        return sortedProductos.filter(p =>
            String(p.codigo).toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(p.nombre).toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, sortedProductos]);

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) {
            return <FaSort className="ms-1 text-muted" />;
        }
        if (sortConfig.direction === 'ascending') {
            return <FaSortUp className="ms-1" />;
        }
        return <FaSortDown className="ms-1" />;
    };

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleAccion = async (tipoAccion, productoSeleccionado) => {
        if (!user || !user.uid) return; 

        if (tipoAccion === 'editar') {
            setProductoAEditar(productoSeleccionado);
            setShowModal(true);
        }
        else if (tipoAccion === 'entrada' || tipoAccion === 'salida') {
             setMovimientoData({
                show: true,
                tipo: tipoAccion,
                producto: productoSeleccionado,
            });
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
                    // ✅ CORREGIDO: Referencia de eliminación anidada
                    const productoRef = doc(db, 'inventario', user.uid, 'inventario', productoSeleccionado.id);
                    await deleteDoc(productoRef);

                    Swal.fire('¡Eliminado!', `El producto "${productoSeleccionado.nombre}" ha sido eliminado.`, 'success');

                    fetchProductos();

                } catch (error) {
                    console.error("Error al eliminar el producto:", error);
                    Swal.fire('Error', 'Hubo un error al eliminar el producto. Inténtalo de nuevo.', 'error');
                }
            }
        }
    };


    if (isLoading || isRoleLoading) {
        return <p>Cargando inventario...</p>;
    }


    return (
        <section className="inventario-page-container">
            <header className="inventario-header">
                <h1>Inventario</h1>
            </header>

            {isAdmin && (
                <div className="fab-container">
                    <Button
                        variant="primary"
                        className="fab-button shadow-lg"
                        onClick={handleShow}
                    >
                        <FaPlus size={20} className="me-2" />
                        Añadir Producto
                    </Button>
                </div>
            )}
            
            <div className="mb-3 inventario-header">
                <FormControl
                    type="text"
                    placeholder="Buscar por código o producto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            {/* 5. Modal de Inserción */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{productoAEditar ? 'Editar Producto' : 'Añadir Nuevo Producto'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormularioInsercion
                        // 🚨 PASANDO EL OBJETO USER 🚨
                        user={user} 
                        productoAEditar={productoAEditar}
                        onProductAdded={handleProductAdded}
                    />
                </Modal.Body>
            </Modal>
            
            <ModalMovimiento
                // 🚨 PASANDO EL OBJETO USER 🚨
                user={user}
                movimientoData={movimientoData}
                handleClose={handleCloseMovimiento}
                onMovimientoExitoso={handleMovimientoExitoso}
            />

            <section className="inventario-table-section">
                <Table striped hover responsive className="inventory-table">
                    <thead>
                        <tr>
                            <th onClick={() => sortData('codigo')}>Código {getSortIcon('codigo')}</th>
                            <th onClick={() => sortData('nombre')}>Producto {getSortIcon('nombre')}</th>
                            <th onClick={() => sortData('cantidad')}>Cantidad {getSortIcon('cantidad')}</th>
                            <th onClick={() => sortData('valorUnitario')}>Valor Unitario {getSortIcon('valorUnitario')}</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProductos.length > 0 ? (
                            filteredProductos.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.codigo}</td>
                                    <td>{p.nombre}</td>
                                    <td>{p.cantidad}</td>
                                    <td>{parseFloat(p.valorUnitario).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="secondary" className={`dropdown-acciones`} as={Button}>
                                                <FaEllipsisV />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => handleAccion('entrada', p)}>Entrada de Producto</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleAccion('salida', p)}>Salida de Producto</Dropdown.Item>
                                                {isAdmin && (
                                                    <>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item onClick={() => handleAccion('editar', p)}>Editar Detalles</Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={() => handleAccion('eliminar', p)}
                                                            className="text-danger"
                                                        >
                                                            Eliminar Producto
                                                        </Dropdown.Item>
                                                    </>
                                                )}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No hay productos en el inventario.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </section>
        </section>
    );
};

export default Inventory;