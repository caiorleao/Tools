import * as React from "react";
const initialCardData = {
    name: '',
    number: '',
    cvv: '',
    expDate: '',
    brand: 'Not Specified',
    brandImg: 'https://github.com/caiorleao/Tools/blob/Master/src/imgs/generic.svg'
};

function PaymentMethodForm(props) {
    const [cardData, setCardData] = React.useState(initialCardData);

    function getBrand(number){
        var cardBrands = [
            { regex: /^4[0-9]{12}(?:[0-9]{3})?$/, name: "Visa", img: 'https://github.com/caiorleao/Tools/blob/Master/src/imgs/visa.svg'},
            { regex: /^5[1-5][0-9]{14}$/, name: "MasterCard", img: 'https://github.com/caiorleao/Tools/blob/Master/src/imgs/mastercard.svg'},
            { regex: /^3[47][0-9]{13}$/, name: "American Express", img: 'https://github.com/caiorleao/Tools/blob/Master/src/imgs/amex.svg'},
            { regex: /^(6011|65|64[4-9])\d{12}|(62[0-9]{14})$/, name: "Discover", img: 'https://github.com/caiorleao/Tools/blob/Master/src/imgs/discover.svg'},
            { regex: /^(50|5[6-9]|5[0-5])[0-9]{10,17}$/, name: "Maestro", img: 'https://github.com/caiorleao/Tools/blob/Master/src/imgs/maestro.svg'},
            { regex: /^(30|36|38|39)[0-9]{12}$/, name: "Diners Club", img: 'https://github.com/caiorleao/Tools/blob/Master/src/imgs/diners.svg'},
            { regex: /^35[0-9]{14}$/, name: "JCB", img: 'https://github.com/caiorleao/Tools/blob/Master/src/imgs/jcb.svg'}
        ];
    
        // Optimized loop using `find` to find the first match
        var foundBrand = cardBrands.find(function(brand) {
            return brand.regex.test(number);
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
        getBrand(value)
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
                <form className="card" action="/processar_pagamento" method="post">
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
                        </div>
                        <div className="form-group">
                            <label htmlFor="card-number">Card number</label>
                            <input
                                type="text"
                                id="card-number"
                                className="card-number"
                                onChange={(e) => handleChange({ target: { name: 'number', value: formatCardNumber(e.target.value) } })}
                                value={formatCardNumber(cardData.number)}
                                maxlength="19"
                                placeholder="4020 3528 1319 03266"
                                name="number"
                            />
                            {/* Display error message if pattern is not matched */}
                            <span className="error-message" style={{ color: 'red' }} hidden={!cardData.number.match(/\d{16}/)}>Invalid card number</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="card-date">Expiration date</label>
                            <input
                                type="text"
                                id="card-date"
                                className="card-date"
                                onChange={(e) => handleChange({ target: { name: 'expDate', value: formatExpDate(e.target.value) } })}
                                value={formatExpDate(cardData.expDate)}
                                maxlength="5"
                                placeholder="01/25"
                                name="expDate"
                            />
                            {/* Display error message if pattern is not matched */}
                            <span className="error-message" style={{ color: 'red' }} hidden={!cardData.expDate.match(/\d{4}/)}>Invalid expiration date</span>
                            <label htmlFor="security-code">Security code</label>
                            <input
                                type="text"
                                id="security-code"
                                className="security-code"
                                onChange={(e) => handleChange({ target: { name: 'cvv', value: formatCvv(e.target.value) } })}
                                value={formatCvv(cardData.cvv)}
                                maxlength="4"
                                placeholder="777"
                                name="cvv" 
                            />
                            {/* Display error message if pattern is not matched */}
                            <span className="error-message" style={{ color: 'red' }} hidden={!cardData.cvv.match(/\d{3}/)}>Invalid CVV</span>
                        </div>
                        <input type="submit" placeholder="Save" name="submit" className="submit" />
                    </div>
                </form>
            </div>
        </>
    );
}

export default PaymentMethodForm;
