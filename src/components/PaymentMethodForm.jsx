import * as React from "react";
const initialCardData = {
    name: '',
    number: '',
    cvv: '',
    expDate: '',
    brand: 'Not Specified',
    brandImg: process.env.PUBLIC_URL + '/imgs/generic.png'
};

function PaymentMethodForm(props) {
    const [cardData, setCardData] = React.useState(initialCardData);

    function validateFormFields(inputs) {
        return Object.values(inputs).some(value => value == null || value === '');
    }
    function getBrand(number) {
        var cardBrands = [


            { regex: /^4[0-9]{12}(?:[0-9]{3})?$/, name: "Visa", img: process.env.PUBLIC_URL + '/imgs/visa.png' },
            { regex: /^5[1-5][0-9]{14}$/, name: "MasterCard", img: process.env.PUBLIC_URL + '/imgs/mastercard.png' },
            { regex: /^3[47][0-9]{13}$/, name: "American Express", img: process.env.PUBLIC_URL + '/imgs/amex.png' },
            { regex: /^(6011|65|64[4-9])\d{12}|(62[0-9]{14})$/, name: "Discover", img: process.env.PUBLIC_URL + '/imgs/discover.png' },
            { regex: /^(50|5[6-9]|5[0-5])[0-9]{10,17}$/, name: "Maestro", img: process.env.PUBLIC_URL + '/imgs/maestro.png' },
            { regex: /^(30|36|38|39)[0-9]{12}$/, name: "Diners Club", img: process.env.PUBLIC_URL + '/imgs/diners.png' },
            { regex: /^35[0-9]{14}$/, name: "JCB", img: process.env.PUBLIC_URL + '/imgs/jcb.png' }
        ]

        // Optimized loop using `find` to find the first match
        var foundBrand = cardBrands.find(function (brand) {
            return brand.regex.test(number.replace(/\s/g, ''));
        });

        return foundBrand ? setCardData({
            ...cardData,
            'brand': foundBrand.name,
            'brandImg': foundBrand.img
        }) : "Card brand not identified";
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setCardData({
            ...cardData,
            [name]: value
        });
    }

    function formatCardNumber(value) {
        return value.replace(/\D/g, '').replace(/....(?!$)/g, '$& ');
    }

    function formatExpDate(value) {
        return value.replace(/\D/g, '').replace(/..(?!$)/g, '$&/');
    }

    function formatCvv(value) {
        return value.replace(/\D/g, '').slice(0, 4);
    }
    return (
        <>
            <h1>Payment Method Form</h1>
            <div className="creditCard">
                <form className="card" method="post">
                    <div className="card-left-side">
                        <div className="card-icon">
                            <img src={cardData.brandImg} alt={cardData.brand} />
                        </div>
                        <div className="card-total clear row">
                            <label>Total</label>
                            <p className="total">$437.00</p>
                        </div>
                    </div>
                    <div className="card-right-side">
                        <div className="form-group">
                            <label htmlFor="card-name-holder">Name</label>
                            <input
                                type="text"
                                id="card-name-holder"
                                className="name-holder"
                                onChange={handleChange}
                                value={cardData.name}
                                placeholder="John Doe"
                                name="name"
                            />
                            <span className="error-message" style={{ color: 'red' }} hidden={validateFormFields(cardData)}>Invalid card holder name</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="card-number">Card number</label>
                            <input
                                type="text"
                                id="card-number"
                                className="card-number"
                                onChange={(e) => handleChange({ target: { name: 'number', value: formatCardNumber(e.target.value) } })}
                                onBlur={(e) => getBrand(e.target.value)}
                                value={formatCardNumber(cardData.number)}
                                maxLength="19"
                                placeholder="4020 3528 1319 03266"
                                name="number"
                            />
                            {/* Display error message if pattern is not matched */}
                            <span className="error-message" style={{ color: 'red' }} hidden={validateFormFields(cardData)}>Invalid card number</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="card-date">Expiration date</label>
                            <input
                                type="text"
                                id="card-date"
                                className="card-date"
                                onChange={(e) => handleChange({ target: { name: 'expDate', value: formatExpDate(e.target.value) } })}
                                value={formatExpDate(cardData.expDate)}
                                maxLength="5"
                                placeholder="01/25"
                                name="expDate"
                            />
                            {/* Display error message if pattern is not matched */}
                            <span className="error-message" style={{ color: 'red' }} hidden={validateFormFields(cardData)}>Invalid expiration date</span>
                            <label htmlFor="security-code">Security code</label>
                            <input
                                type="text"
                                id="security-code"
                                className="security-code"
                                onChange={(e) => handleChange({ target: { name: 'cvv', value: formatCvv(e.target.value) } })}
                                value={formatCvv(cardData.cvv)}
                                maxLength="4"
                                placeholder="777"
                                name="cvv"
                            />
                            {/* Display error message if pattern is not matched */}
                            <span className="error-message" style={{ color: 'red' }} hidden={validateFormFields(cardData)}>Invalid CVV</span>
                        </div>
                        <input type="submit" placeholder="Save" name="submit" className="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}

export default PaymentMethodForm;
