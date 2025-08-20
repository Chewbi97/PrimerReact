import { useState } from "react";
import { Link } from "react-router-dom";

function useStatecontador() {
    
    const [contador, setContador] = useState(0);
    function aumentar() {
        setContador(contador + 1);
    }
    function disminuir() {
        setContador(contador - 1);
    }


    return (
        <div>
            <h2>VALOR DEL CONTADOR = {contador}</h2>
            <button onClick={aumentar}>Aumentar</button>
            <button onClick={disminuir}>Disminuir</button>
            <Link to={"/HooksGral"}>
                <button>IR A HOOKS GENERAL</button>
            </Link>
        </div>

       
    )
        ;
}

export default useStatecontador;