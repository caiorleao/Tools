import * as React from "react";
import generateCpf from '../hooks_and_tools/CpfGenerator';
import CopyBtn from './CopyButton';

function Cpf() {

    const [cpf, setCpf] = React.useState(generateCpf());

    function handleGenCpf(){
        setCpf(generateCpf())
    }

    return (
        <>
            <h2 className="hightlight" id='cpf'>{cpf}</h2>
            <div className="actions">
                <button onClick={handleGenCpf}>Gerar CPF</button>
                <CopyBtn elem="cpf"/>
            </div>
        </>
    );
}

export default Cpf;
