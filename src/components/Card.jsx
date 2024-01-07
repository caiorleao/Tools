import * as React from "react";
import generateCreditCard from '../hooks_and_tools/CreditCardGenerator';
import CopyBtn from './CopyButton';

function Card() {
  const [creditCard, setCreditCard] = React.useState(generateCreditCard());

  const handleGenerateNewCard = () => {
    setCreditCard(generateCreditCard());
  };
  return (
    <>
      <div className="cardData">
        <h2 id="card" className="hightlight">{creditCard.number}</h2>
        <p id="expiration">Expiration Date:<span className="hightlight">{creditCard.expiration}</span></p>
        <p id="cvv">CVV:<span className="hightlight">{creditCard.cvv}</span></p>
      </div>
      <div className="actions">
        <button onClick={handleGenerateNewCard} id="card">Gerar Cartão</button>
        <CopyBtn elem="card" />
      </div>
    </>
  );
}

export default Card;
