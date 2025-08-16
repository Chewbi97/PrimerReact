import { useState } from "react";

function useStatecontador(){

    const [contador, setContador] = useState(0);
    function aumentar(){
            setContador(contador+1);
    }
    function disminuir(){
            setContador(contador-1);
    }

    return(
        <div>
            <h2>Valor del contador = {contador}</h2>
            <button onClick={aumentar}>Aumentar</button>
            <button onClick={disminuir}>Disminuir</button>
        </div>
    )
    ;
}

export default useStatecontador;