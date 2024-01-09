import * as React from "react";
import Cpf from './components/Cpf';
import Cnpj from './components/Cpnj';
import Card from './components/Card';
import PaymentForm from './components/PaymentMethodForm'

function App() {
  const CpfComponent = React.memo(Cpf);
  const CnpjComponent = React.memo(Cnpj);
  const CardComponent = React.memo(Card);

  const [tool, setTool] = React.useState('')

  // Função para lidar com a mudança na opção selecionada
  const handleSelectChange = (event) => {
    setTool(event.target.id);
  };

  const renderComponent = () => {
    switch (tool) {
      case 'cpf':
        return <div className="app generator"><CpfComponent elem="tool"/></div>;
      case 'cnpj':
        return <div className="app generator"><CnpjComponent elem="tool" /></div>;
      case 'card':
        return <div className="app generator"><CardComponent elem="tool" /></div>;
      case 'paymentForm':
        return <PaymentForm elem="tool" />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="header">
        <div onClick={handleSelectChange} id="cpf">CPF</div>
        <div onClick={handleSelectChange} id="cnpj">CNPJ</div>
        <div onClick={handleSelectChange} id="card">Credit Card</div>
        <div onClick={handleSelectChange} id="paymentForm">Form</div>
      </div>
      {renderComponent()}
    </>

  );
}

export default App;
