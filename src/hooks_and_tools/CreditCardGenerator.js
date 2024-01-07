// creditCardGenerator.js
function generateCreditCard() {
    const prefix = '4';
    const cardNumber = prefix + generateRandomDigits(15);
    const expirationDate = generateRandomMonth() + '/' + generateRandomYear(2022, 2030);
    const cvv = generateRandomDigits(3);
  
    const cardNumberWithLuhn = cardNumber + calculateLuhnDigit(cardNumber);
  
    return {
      number: cardNumberWithLuhn,
      expiration: expirationDate,
      cvv: cvv,
    };
  }
  
  function generateRandomDigits(amount) {
    let digits = '';
    for (let i = 0; i < amount; i++) {
      digits += Math.floor(Math.random() * 10);
    }
    return digits;
  }
  
  function generateRandomMonth() {
    return padLeft(Math.floor(Math.random() * 12) + 1, 2);
  }
  
  function generateRandomYear(min, max) {
    return padLeft(Math.floor(Math.random() * (max - min + 1)) + min, 4);
  }
  
  function padLeft(value, size) {
    let valueString = value.toString();
    while (valueString.length < size) {
      valueString = '0' + valueString;
    }
    return valueString;
  }
  
  function calculateLuhnDigit(number) {
    let sum = 0;
    let alternate = false;
  
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);
  
      if (alternate) {
        digit *= 2;
        digit = digit > 9 ? digit - 9 : digit;
      }
  
      sum += digit;
      alternate = !alternate;
    }
  
    const luhnDigit = (10 - (sum % 10)) % 10;
    return luhnDigit.toString();
  }
  
  export default generateCreditCard;
  