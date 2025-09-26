import React from "react";
import { Container } from "react-bootstrap";
import DashboardNavbar from "./ComponentsDashboard/DashboardNavbar/DashboardNavbar"
import DashboardFooter from "./ComponentsDashboard/DashboardFooter/DashboardFooter"
import { Outlet } from "react-router-dom";
import "./../DashboradPage/DashboardLayout.css"   

function DashboardLayout() {

    return (
        <div className="main-layout">
            <DashboardNavbar />
            <main className="content">
                <Outlet /> 
            </main>
            <DashboardFooter />
        </div>
    );
}

export default DashboardLayout;