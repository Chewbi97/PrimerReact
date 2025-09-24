import React from "react";
import { Container } from "react-bootstrap";
import DashboardNavbar from "./ComponentsDashboard/DashboardNavbar/DashboardNavbar"
import DashboardFooter from "./ComponentsDashboard/DashboardFooter/DashboardFooter"
import { Outlet } from "react-router-dom";

function DashboardLayout() {

    return (
        <div className="main-layout">
            <DashboardNavbar />
            <main className="content">
                <Outlet /> {/* Renderiza la ruta asociada */}
            </main>
            <DashboardFooter />
        </div>
    );
}

export default DashboardLayout;