function generateCreditCard(brand) {

  const brandPrefixes = {
    'visa': '4',
    'mastercard': '5',
    'amex': '34',
    'discover': '6',
    'maestro': '50',
    'diners club': '38',
    'jcb': '35',
  };

  let prefix = '';

  if (brand) {
    const lowercaseBrand = brand.toLowerCase();
    prefix = brandPrefixes[lowercaseBrand] || '';
  } else {
    const availablePrefixes = Object.values(brandPrefixes);
    prefix = availablePrefixes[Math.floor(Math.random() * availablePrefixes.length)];
  }

  if (!prefix) {
    console.log('Unsupported card brand');
  }

  const cardNumber = prefix + generateRandomDigits(14);
  const expirationDate = `${generateRandomMonth()}/${generateRandomYear(new Date().getFullYear(), 2030)}`;
  const cvv = generateRandomDigits(3);

  const cardNumberWithLuhn = cardNumber + calculateLuhnDigit(cardNumber);

  const formattedCardNumber = [cardNumberWithLuhn.slice(0, 4), cardNumberWithLuhn.slice(4, 8), cardNumberWithLuhn.slice(8, 12), cardNumberWithLuhn.slice(12)].join(' ');

  return {
    number: formattedCardNumber,
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
    let digit = +number[i];

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
