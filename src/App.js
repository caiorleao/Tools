import * as React from "react";
import cpf from './components/Cpf';
import cnpj from './components/Cpnj';
import card from './components/Card';


function App() {
  const CpfComponent = cpf
  const CnpjComponent = cnpj
  const CardComponent = card

  const [tool, setTool] = React.useState('')



  // Função para lidar com a mudança na opção selecionada
  const handleSelectChange = (event) => {
    setTool(event.target.id);
    console.log('teste')
    
  };

  const renderComponent = () => {
    switch (tool) {
      case 'cpf':
        return <CpfComponent elem="tool"/>;
      case 'cnpj':
        return <CnpjComponent elem="tool"/>;
      case 'card':
        return <CardComponent elem="tool"/>;
      default:
        return null;
    }
  };
  return (
  <>
    <div className="header">
        <div onClick={handleSelectChange} id="cpf">CPF</div>
        <div onClick={handleSelectChange} id="cnpj">CNPJ</div>
        <div onClick={handleSelectChange} id="card">Cartão</div>
    </div>
    <div className="app generator">
      {renderComponent()}
    </div>
  </>
    
  );
}

export default App;
