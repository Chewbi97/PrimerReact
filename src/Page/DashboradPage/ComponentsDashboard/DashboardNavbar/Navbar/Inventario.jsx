import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Inventory(){
    return (
    <div className="inventory">
        <h1>Inventario</h1>
        
            <Link to="/dashboard">
            <button>atras</button>
            </Link>
        
    </div>
)};


export default Inventory;