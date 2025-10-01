import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

// 1. Crear el Contexto
const AuthContext = createContext();

// 2. Hook personalizado para usar el contexto
export function useAuth() {
    return useContext(AuthContext);
}

// 3. Componente Proveedor
export function AuthProvider({ children }) {
    const [user, firebaseLoading] = useAuthState(auth);
    const [userRole, setUserRole] = useState(null);
    const [isRoleLoading, setIsRoleLoading] = useState(true);

    // Hacemos fetchUserRole una función estable con useCallback
    const fetchUserRole = useCallback(async (uid) => {
        // Solo cargamos el rol si hay un usuario logueado
        try {
            const userDocRef = doc(db, 'usuarios', uid);
            const userDoc = await getDoc(userDocRef);
            
            let role = 'operario'; // Asumimos operario por defecto
            
            if (userDoc.exists()) {
                role = userDoc.data().rol;
            } 
            
            setUserRole(role);
        } catch (error) {
            console.error("Error al obtener el rol del usuario:", error);
            setUserRole('operario');
        } finally {
            
        }
    }, []); // Dependencias vacías para useCallback

    useEffect(() => {
        // 1. Manejo del estado inicial de carga de Firebase (si es true, salimos)
        if (firebaseLoading) {
            return;
        }

        // 2. Si hay un usuario, iniciamos la carga del rol
        if (user) {
            // Ponemos isRoleLoading en true solo si no se ha cargado todavía el rol
            if (userRole === null) {
                setIsRoleLoading(true); 
            }
            
            // Llamamos a la función asíncrona y manejamos la finalización aquí
            fetchUserRole(user.uid).then(() => {
                // 🚨 CORRECCIÓN: SE PONE EN FALSE AQUÍ AL TERMINAR LA PROMESA 🚨
                setIsRoleLoading(false);
            });

        } else {
            // 3. Si no hay usuario (sesión cerrada)
            setUserRole(null);
            setIsRoleLoading(false); // La carga termina inmediatamente si no hay nadie logueado.
        }
        
    }, [user, firebaseLoading, fetchUserRole]); // Añadimos fetchUserRole a las dependencias por buenas prácticas

    // El objeto de valor que proveerá el contexto
    const value = {
        user,
        userRole,
        firebaseLoading, // Carga inicial de firebase-hooks
        isRoleLoading,   // Carga del rol desde Firestore
        isAdmin: userRole === 'administrador'
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}