# PRIMER PROYECTO REACT

La base de este proyecto es **React** usando **CRA => Create React App**, ademas se usan librerias de **CSS y JS**, como lo son **Bootstrap y SweetAlert**:

- [Bootstrap](https://getbootstrap.com/) estilos rápidos y responsivos **(CSS)**.
- [SweetAlert2](https://sweetalert2.github.io/) alertas y confirmaciones atractivas **(JavaScript)**.

---

# 📍 Primer paso: 
## Instalación y ejecución.

1. **Crear el proyecto con Create React App**
    
    ```bash
    npx create-react-app nombre-del-proyecto
    ```

2. **Ingresar a la carpeta del proyecto**
    
    ```bash
    cd nombre-del-proyecto

2. **Instalar React-Router-Dom**
    
    ```bash
    npm install react-router-dom
    ```

3. **Ejecutar el proyecto en modo desarrollo**
    
    ```bash
    npm start
    ```

---

# 📍 Segundo paso:
##  Instalación y verificación de las dependencias a usar.

**Bootstrap**
```bash
npm install bootstrap
```
**SweetAlert2**
```bash
npm install SweetAlert2
```
**React-Router**
```bash
npm install react-router-dom
```
**Bootstrap Icons**
```bash
npm install bootstrap-icons
```
**FireBase**
```bash
npm install firebase
npm install react-firebase
npm install -g firebase-tools
```
**React Icons**
```bash
npm install react-icons
```

---

## 🛠️ Tecnologías Utilizadas

| Tecnología              | Logo                                                                 | Descripción                                                                                   |
|------------------------|----------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| **HTML5**              | ![HTML5](https://img.icons8.com/color/48/html-5--v1.png)              | Lenguaje de marcado usado para estructurar las páginas web.                                  |
| **CSS3**               | ![CSS3](https://img.icons8.com/color/48/css3.png)                     | Hojas de estilo para personalizar la apariencia de la web.                                   |
| **Bootstrap 5**        | ![Bootstrap](https://img.icons8.com/color/48/bootstrap.png)           | Framework CSS para facilitar el diseño responsive y atractivo.                               |
| **JavaScript**         | ![JS](https://img.icons8.com/color/48/javascript--v1.png)             | Lenguaje de programación para la lógica y la interactividad en la web.                       |
| **React**              | ![React](https://img.icons8.com/color/48/react-native.png)            | Biblioteca de JavaScript para construir interfaces de usuario basadas en componentes.        |
| **Create React App**   | <img src="https://th.bing.com/th/id/R.2bee11a830bacc5ae9006df56b20c33a?rik=nXUBy4boCTrW8w&pid=ImgRaw&r=0" width="40"/>     | Herramienta oficial para crear proyectos React con configuración inicial lista para usar.    |
| **SweetAlert2**        | <img src="https://tse1.explicit.bing.net/th/id/OIP.sbHWbfQY-VMmVDzT71z8vgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" width="40"/>   | Librería JS para mostrar alertas modernas, elegantes y perso nalizadas. |
| **FireBase**        | <img src="https://firebase.google.com/static/images/brand-guidelines/logo-vertical.png?hl=es-419" width="40"/>   | Servicio de DataBase, autenticación y demás herramientas para soporte de datos. |

---

## 📁 Estructura del Proyecto (Actualizada)

```plaintext
/

├── public/
│   └── ... (Archivos inalterados: favicon.ico, index.html, etc.)
├── src/
│   ├── Page                  # Contiene las vistas principales de la aplicación
│   │   ├── AuxiliarPage
│   │   │   ├── AuxiliarPage.css
│   │   │   └── AuxiliarPage.jsx
│   │   ├── DashboardPage
│   │   │   ├── ComponentsDashboard
│   │   │   │   ├── DashboardContent
│   │   │   │   │   ├── DashboardContent.css
│   │   │   │   │   └── DashboardContent.jsx
│   │   │   │   ├── DashboardFooter
│   │   │   │   │   ├── DashboardFooter.css
│   │   │   │   │   └── DashboardFooter.jsx
│   │   │   │   └── DashboardNavbar
│   │   │   │       ├── Inventario         
│   │   │   │       │   ├── AddProducts.jsx
│   │   │   │       │   ├── Inventario.css
│   │   │   │       │   ├── Inventario.jsx
│   │   │   │       │   └── MovimientoInventario.jsx
│   │   │   │       └── NavDropdown
│   │   │   │           ├── ProfilePage.jsx
│   │   │   │           ├── DashboardNavbar.css
│   │   │   │           └── DashboardNavbar.jsx
│   │   │   ├── DashboardLayout.css
│   │   │   └── DashboardLayout.jsx
│   │   ├── ForgetPage
│   │   │   ├── ForgetPage.css
│   │   │   └── ForgetPage.jsx
│   │   ├── LoginPage
│   │   │   ├── LoginPage.css
│   │   │   └── LoginPage.jsx
│   │   ├── RegisterPage
│   │   │   ├── RegisterPage.css
│   │   │   └── RegisterPage.jsx
│   │   └── ResetPasswordPage
│   │       ├── ResetPasswordPage.css
│   │       └── ResetPasswordPage.jsx
│   │   
│   ├── Components             # Componentes Reutilizables
│   │   ├── NotFoundPages.jsx
│   │   ├── ProtectedRoute.js
│   │   └── Spinner.jsx
│   │   
│   ├── App.css 
│   ├── App.js                
│   └── index.js
└── README.md
---

## 📅 Avance del Proyecto

| Nº | Fecha | Descripción / Entregable |
|:---:|:-------------:|:---|
| 1 | 2025-08-12 | Inicialización del proyecto con **Create React App** y desarrollo de la funcionalidad inicial de **`LoginPage`**. |
| 2 | 2025-08-15 | Configuración del **`README`** y creación de la interfaz principal del login junto con un contador en **`PLAYGROUND`**. |
| 3 | 2025-08-19 | Se inicia el desarrollo de la app: **Login, Registro y Recuperación**. Se agregan funciones de *hook* al **`PLAYGROUND`**. Se corrigen rutas. |
| 4 | 2025-08-20 | Se establecen las **bases de los estilos** para la página de inicio (Login). Se realizan ajustes de la navegación con **React Route Dom**. |
| 5 | 2025-08-21 | Aplicación de **estilos con Bootstrap** y CSS para los módulos trabajados. |
| 6 | 2025-08-22 | Finalización de la **configuración y estética del Login** (Bootstrap/CSS). Se hace la **implementación de alertas** con **SweetAlert**. |
| 7 | 2025-08-25 | **Integración y configuración de Firebase**. Creación de usuario en Firebase y relación con el proyecto. Finalización del login y sus extensiones. |
| 8 | 2025-08-26 | **Vinculación del navegador con el Dashboard**. Ajuste de la app con **Firebase y autenticador funcional**. Se trabaja en el funcionamiento del Dashboard. |
| 9 | 2025-08-28 | Corrección de *bug* para el **`toggle` de contraseña**. Se agrega el componente de **Ruta Protegida**. Instalación y configuración final de Bootstrap y SweetAlert2. |
| 10 | 2025-08-29 | Configuración de la **protección de rutas** y partición del Dashboard en componentes. |
| 11 | 2025-09-02 | *Debugs* de **usuarios fantasmas y seguridad para rutas protegidas**. Se empieza la personalización del contenido. |
| 12 | 2025-09-07 | Implementación de **`Layout` (plantilla)** para optimizar recursos. Se agrega **nombre de usuario al `Navbar`** y validaciones. |
| 13 | 2025-09-22 | Creación del componente **Lista de Usuarios**. Funcionalidad para **modificar estados** y opciones de **borrado/actualización**. |
| 14 | 2025-09-23 | **Validaciones para el modal y la tabla de usuarios**. Cambio de variables para usuarios registrados con Google. |
| 15 | 2025-09-25 | Se resuelve *bug* de la **ruta protegida** para los componentes que requieren **rol de Administrador**. |
| 16 | 2025-09-26 | Se establecen **propiedades de CSS** para el *layout* en el contenido. Se solucionan *bugs* de la **ruta protegida** para alertas de SweetAlert. |
| 17 | 2025-09-27 | Creación del componente de **Inventario**. Primeras validaciones para **agregar productos** y menú de edición para la tabla. |
| 18 | 2025-09-29 | **Optimización del componente de Inventario**. Aplicación de **estilo CSS** y corrección de *bugs* en el **despliegue del `Dropdown`** de acciones en la tabla. |

> **Nota:** Ir actualizando la tabla con cada cambio o entregable.

---     