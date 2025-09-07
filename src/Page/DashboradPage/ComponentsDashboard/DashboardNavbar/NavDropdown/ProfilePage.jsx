import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ProfileUser(){
    return (
    <div className="Perfil de Usuario">
        <h1>hola</h1>
        
            <Link to="/dashboard">
            <button>atras</button>
            </Link>
        
    </div>
)};


export default ProfileUser;