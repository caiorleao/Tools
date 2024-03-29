import * as React from "react";
import generateCnpj from "../hooks_and_tools/CnpjGenerator";
import CopyBtn from './CopyButton';

function Cpnj() {
  
  const [cnpj, setCnpj] = React.useState(() => generateCnpj());

  const handleGenCnpj = () => {
    setCnpj(generateCnpj());
  };

  React.useEffect(() => {
    setCnpj(generateCnpj());
  }, []);
 

  return (
    <>
      <h2 className="hightlight" id="cnpj">{cnpj}</h2>
      <div className="actions">
        <button onClick={handleGenCnpj}>Gerar CNPJ</button>
        <CopyBtn elem="cnpj"/>
      </div>
    </>
  );
}

const MemoizedCpnj = React.memo(Cpnj);

export default MemoizedCpnj;
