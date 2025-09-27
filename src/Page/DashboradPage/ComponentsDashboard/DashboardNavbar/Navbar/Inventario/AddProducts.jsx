import React, { useState } from "react";
import { db } from "../../../../../../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; // Añade addDoc, query, where, y getDocs
import { Button, Form, FormLabel } from "react-bootstrap";

const FormularioInsercion = ({ onProductAdded }) => {
    const normalizeString = (str) => {
        // Convierte a minúsculas, elimina acentos y quita espacios
        return str.trim().toLowerCase().replace(/\s+/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    // Lo simplifico para la corrección:
    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        cantidad: 0,
        valorUnitario: 0
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Manejo especial para números si es necesario, pero lo dejo simple por ahora
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🚨 1. Validar que la cantidad y el valor sean mayores a cero
        if (formData.cantidad <= 0 || formData.valorUnitario <= 0) {
            alert("La cantidad y el valor unitario deben ser mayores a cero.");
            return;
        }

        setIsLoading(true);

        try {
            // 🚨 2. Normalización y Preparación de Datos
            const dataToSave = {
                // ... Mantenemos los datos originales para la visualización
                codigo: formData.codigo.trim(),
                nombre: formData.nombre.trim(),
                cantidad: parseInt(formData.cantidad),
                valorUnitario: parseFloat(formData.valorUnitario),
                // ... Añadimos las versiones normalizadas para la búsqueda
                nombreNormalizado: normalizeString(formData.nombre),
                codigoNormalizado: normalizeString(formData.codigo)
            };

            // 🚨 3. Verificar Duplicados (por nombre O código)
            const inventarioRef = collection(db, 'inventario');

            // Query 1: Buscar por Nombre Normalizado
            let q = query(inventarioRef, where('nombreNormalizado', '==', dataToSave.nombreNormalizado));
            let snapshot = await getDocs(q);

            // Si no se encuentra por nombre, buscar por Código Normalizado
            if (snapshot.empty) {
                q = query(inventarioRef, where('codigoNormalizado', '==', dataToSave.codigoNormalizado));
                snapshot = await getDocs(q);
            }

            if (!snapshot.empty) {
                // Producto duplicado encontrado
                alert('Ya existe un producto con el mismo nombre o código.'); // Usa Swal.fire() si lo tienes importado
                setIsLoading(false);
                return; // Detener el guardado
            }

            // 🚨 4. Inserción Final
            await addDoc(inventarioRef, {
                ...dataToSave,
                fechaCreacion: new Date()
            });

            alert('Producto guardado con éxito.'); // Usa Swal.fire() si lo tienes importado

            // 🚨 5. Aviso al padre para cerrar y recargar la tabla 🚨
            onProductAdded();

        } catch (error) {
            console.error("Error al guardar:", error);
            alert('Hubo un error al guardar el producto.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {/* Campo CÓDIGO */}
            <Form.Group className="mb-3">
                <FormLabel>Código del Producto</FormLabel>
                <Form.Control type="text" name="codigo" value={formData.codigo} onChange={handleChange} required />
            </Form.Group>

            {/* Campo NOMBRE */}
            <Form.Group className="mb-3">
                <FormLabel>Nombre del Producto</FormLabel>
                <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </Form.Group>
           
            {/* Campo NOMBRE */}
            <Form.Group className="mb-3">
                <FormLabel>Cantidad</FormLabel>
                <Form.Control type="text" name="cantidad" value={formData.cantidad} onChange={handleChange} required />
            </Form.Group>
           
            {/* Campo NOMBRE */}
            <Form.Group className="mb-3">
                <FormLabel>Valor Unitario</FormLabel>
                <Form.Control type="text" name="valorUnitario" value={formData.valorUnitario} onChange={handleChange} required />
            </Form.Group>

            {/* Botón */}
            <div className="d-grid gap-2 mt-4">
                <Button variant="success" type="submit" disabled={isLoading}>
                    {isLoading ? 'Guardando...' : 'Guardar Producto'}
                </Button>
            </div>
        </Form>
    );
};

export default FormularioInsercion;