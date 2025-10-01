import React, { useState } from "react";
import { Modal, Button, Form, FormLabel } from "react-bootstrap";
import Swal from "sweetalert2";
import { db } from "../../../../../../firebase";
import { doc, updateDoc, increment } from "firebase/firestore";

// 🚨 CORRECCIÓN CLAVE 1: Recibir la prop 'user' 🚨
const ModalMovimiento = ({ user, movimientoData, handleClose, onMovimientoExitoso }) => {

    const { show, tipo, producto } = movimientoData;

    const [cantidadMovida, setCantidadMovida] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleModalClose = () => {
        setCantidadMovida(0);
        handleClose();
    };

    const modalTitle = tipo === 'entrada'
        ? `Registrar Entrada de: ${producto?.nombre}`
        : `Registrar Salida de: ${producto?.nombre}`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 🚨 CORRECCIÓN CLAVE 2: Obtener y validar el UID 🚨
        const uid = user?.uid;
        if (!uid) {
            Swal.fire('Error', 'No se pudo identificar al usuario para registrar el movimiento.', 'error');
            return;
        }


        const cantidad = parseInt(cantidadMovida);

        // 1. Validaciones
        if (cantidad <= 0 || isNaN(cantidad)) {
            Swal.fire('Error de Cantidad', 'La cantidad debe ser un número positivo.', 'warning');
            return;
        }

        if (tipo === 'salida' && cantidad > producto.cantidad) {
            Swal.fire('Stock Insuficiente', `La cantidad a sacar (${cantidad}) excede el stock actual (${producto.cantidad}).`, 'error');
            return;
        }

        setIsLoading(true);

        try {
            // ✅ CORREGIDO: Referencia al documento en la subcolección del usuario
            // Ruta: inventario / {user.uid} / inventario / {producto.id}
            const productoRef = doc(db, 'inventario', uid, 'inventario', producto.id);

            // Si es entrada, suma (+); si es salida, resta (-)
            const valorCambio = tipo === 'entrada' ? cantidad : -cantidad;

            await updateDoc(productoRef, {
                cantidad: increment(valorCambio),
                fechaUltimoMovimiento: new Date()
            });

            Swal.fire(
                '¡Transacción Exitosa!',
                `Movimiento de ${tipo} registrado correctamente.`,
                'success'
            );

            onMovimientoExitoso(); 
            handleModalClose(); 
        } catch (error) {
            console.error("Error al registrar movimiento:", error);
            
            Swal.fire(
                'Error de Servidor',
                'Hubo un problema al registrar el movimiento. Permisos insuficientes (FireStore rules) o error de conexión.',
                'error'
            );

        } finally {
            setIsLoading(false);
        }
    };


    if (!show || !producto) return null;

    return (
        <Modal show={show} onHide={handleModalClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Stock actual: <strong>{producto.cantidad}</strong></p>
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                        <FormLabel>Cantidad a {tipo === 'entrada' ? 'Ingresar' : 'Retirar'}</FormLabel>
                        <Form.Control
                            type="number"
                            min="1"
                            name="cantidadMovida"
                            value={cantidadMovida}
                            onChange={(e) => setCantidadMovida(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <div className="d-grid gap-2 mt-4">
                        <Button variant={tipo === 'entrada' ? 'success' : 'warning'} type="submit" disabled={isLoading}>
                            {isLoading ? 'Registrando...' : `Confirmar ${tipo}`}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalMovimiento;