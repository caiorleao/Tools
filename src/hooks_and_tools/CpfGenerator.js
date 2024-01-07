function generateRandomNumber() {
    return (Math.floor(Math.random() * 999)).toString().padStart(3, '0');
}

function calculateDigit(n1, n2, n3, n4) {
    const numbers = n1.split("").concat(n2.split(""), n3.split(""));

    if (n4 !== undefined) {
        numbers[9] = n4;
    }

    const inicial = n4 !== undefined ? 11 : 10;

    const sum = numbers.reduce((acumulador, numero, j) => {
        return acumulador + parseInt(numero) * (inicial - j);
    }, 0);


    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
}

function generateCpf() {
    const num1 = generateRandomNumber();
    const num2 = generateRandomNumber();
    const num3 = generateRandomNumber();

    const dig1 = calculateDigit(num1, num2, num3);
    const dig2 = calculateDigit(num1, num2, num3, dig1);

    return (`${num1}.${num2}.${num3}-${dig1}${dig2}`);
}

export default generateCpf;

