import React, { useState, useEffect } from "react";
import { db } from "../../../../../../firebase";
// Añade updateDoc y doc para la lógica de edición
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { Button, Form, FormLabel } from "react-bootstrap";
import Swal from "sweetalert2";

// 🚨 CORRECCIÓN CLAVE 1: Recibir las props 'user' y 'productoAEditar' 🚨
const FormularioInsercion = ({ user, productoAEditar, onProductAdded }) => {
    const normalizeString = (str) => {
        return str.trim().toLowerCase().replace(/\s+/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        cantidad: 0,
        valorUnitario: 0
    });
    const [isLoading, setIsLoading] = useState(false);
    
    // useEffect para manejar la edición
    useEffect(() => {
        if (productoAEditar) {
            setFormData({
                codigo: productoAEditar.codigo || '',
                nombre: productoAEditar.nombre || '',
                cantidad: productoAEditar.cantidad || 0,
                valorUnitario: productoAEditar.valorUnitario || 0,
            });
        } else {
            // Limpiar formulario si no hay producto a editar
            setFormData({ codigo: '', nombre: '', cantidad: 0, valorUnitario: 0 });
        }
    }, [productoAEditar]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🚨 CORRECCIÓN CLAVE 2: Obtener y validar el UID 🚨
        const uid = user?.uid;
        if (!uid) {
            Swal.fire('Error', 'No se pudo identificar al usuario. Por favor, vuelve a iniciar sesión.', 'error');
            return;
        }

        // Validación general para números (aunque la cantidad sea 0 en edición)
        if (formData.nombre.trim() === '' || formData.codigo.trim() === '') {
             Swal.fire("Validación", "Los campos Nombre y Código no pueden estar vacíos.", "warning");
            return;
        }

        setIsLoading(true);

        try {
            // ✅ CORREGIDO: Definir la referencia a la SUBCOLECCIÓN del usuario 
            const inventarioRef = collection(db, 'inventario', uid, 'inventario');

            const dataToSave = {
                codigo: formData.codigo.trim(),
                nombre: formData.nombre.trim(),
                cantidad: parseInt(formData.cantidad),
                valorUnitario: parseFloat(formData.valorUnitario),
                nombreNormalizado: normalizeString(formData.nombre),
                codigoNormalizado: normalizeString(formData.codigo)
            };
            
            // --- Lógica de DUPLICADOS (solo para NUEVA inserción) ---
            if (!productoAEditar) {
                 // ✅ CORREGIDO: Buscar duplicados DENTRO de la subcolección 
                let q = query(inventarioRef, where('nombreNormalizado', '==', dataToSave.nombreNormalizado));
                let snapshot = await getDocs(q);

                if (snapshot.empty) {
                    q = query(inventarioRef, where('codigoNormalizado', '==', dataToSave.codigoNormalizado));
                    snapshot = await getDocs(q);
                }

                if (!snapshot.empty) {
                    Swal.fire('Duplicado', 'Ya existe un producto con el mismo nombre o código en tu inventario.', 'warning');
                    setIsLoading(false);
                    return;
                }
            }


            if (productoAEditar) {
                // --- LÓGICA DE EDICIÓN ---
                // No se actualizan cantidad/valorUnitario aquí, solo los datos maestros (código, nombre)
                const productoDocRef = doc(inventarioRef, productoAEditar.id); 
                
                await updateDoc(productoDocRef, {
                    codigo: dataToSave.codigo,
                    nombre: dataToSave.nombre,
                    codigoNormalizado: dataToSave.codigoNormalizado,
                    nombreNormalizado: dataToSave.nombreNormalizado,
                    // No modificar cantidad o valor unitario aquí. Es mejor hacerlo en el ModalMovimiento
                    // o con otro formulario específico para cambios de precio.
                });
                
            } else {
                // --- LÓGICA DE CREACIÓN ---
                // ✅ CORREGIDO: Inserción Final en la subcolección 
                await addDoc(inventarioRef, {
                    ...dataToSave,
                    fechaCreacion: new Date()
                });
            }

            Swal.fire('Guardado', `Producto ${productoAEditar ? 'editado' : 'guardado'} con éxito.`, 'success');
            onProductAdded();

        } catch (error) {
            console.error("Error al guardar:", error);
            Swal.fire('Error', 'Hubo un error al guardar el producto. Permisos insuficientes o error de conexión.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            
            <Form.Group className="mb-3">
                <FormLabel>Código del Producto</FormLabel>
                <Form.Control type="text" name="codigo" value={formData.codigo} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
                <FormLabel>Nombre del Producto</FormLabel>
                <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </Form.Group>
            
            {/* Estos campos pueden ser necesarios si el formulario de inserción maneja también la cantidad/precio inicial */}
            {!productoAEditar && (
                <>
                    <Form.Group className="mb-3">
                        <FormLabel>Cantidad Inicial</FormLabel>
                        <Form.Control type="number" name="cantidad" min="0" value={formData.cantidad} onChange={handleChange} required />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <FormLabel>Valor Unitario</FormLabel>
                        <Form.Control type="number" name="valorUnitario" min="0" step="0.01" value={formData.valorUnitario} onChange={handleChange} required />
                    </Form.Group>
                </>
            )}

            <div className="d-grid gap-2 mt-4">
                <Button variant="success" type="submit" disabled={isLoading}>
                    {isLoading ? 'Guardando...' : productoAEditar ? 'Guardar Cambios' : 'Guardar Producto'}
                </Button>
            </div>
        </Form>
    );
};

export default FormularioInsercion;