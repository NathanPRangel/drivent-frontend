import { useState } from "react";
import Card from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import styled from "styled-components";
import { toast } from "react-toastify";
import usePayment from "../hooks/api/usePayment";

export default function PaymentCard(props) {
    const { ticketId, paymentFinished, setPaymentFinished, ticketPaid, setTicketPaid } = props

    const { processPayment } = usePayment()

    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }

    async function finishPayment(event) {
        event.preventDefault();
        let issuer = 'Unknown'
        if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(state.number)) {
            issuer = 'Visa'
        } else if (/^5[1-5][0-9]{14}$/.test(state.number)) {
            issuer = 'MasterCard'
        } else if (/^3[47][0-9]{13}$/.test(state.number)) {
            issuer = 'American Express'
        } else if (/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(state.number)) {
            issuer = 'Discover'
        } else if (/^(?:2131|1800|35\d{3})\d{11}$/.test(state.number)) {
            issuer = 'JCB'
        }
        try {
            const info = {
                ticketId,
                cardData: {
                    issuer,
                    number: state.number,
                    name: state.name,
                    expirationDate: state.expiry,
                    cvv: state.cvc
                }
            }
            await processPayment(info)
            toast('Pagamento realizado com sucesso!');
            setTicketPaid(true);
        } catch (err) {
            console.log(err)
            toast('Não foi possível realizar o pagamento')
        }
    }

    return (
        <PaymentContainer>
            <Card
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
            />
            <PaymentForm onSubmit={finishPayment}>
                <PaymentInput
                    required
                    type="number"
                    name="number"
                    placeholder="Card Number"
                    value={state.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <p>E.g.: 49.., 53..., 36..., 37...</p>
                <PaymentInput
                    required
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={state.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <div>
                    <PaymentInput
                        required
                        type="text"
                        width='60%'
                        placeholder="Valid Thru"
                        name="expiry"
                        value={state.expiry}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <PaymentInput
                        required
                        type="number"
                        width='30%'
                        name="cvc"
                        placeholder="CVC"
                        value={state.cvc}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </div>
                <button type='submit'>FINALIZAR PAGAMENTO</button>
            </PaymentForm>
        </PaymentContainer>
    )
}

const PaymentContainer = styled.div`
    width: 80%;
    height: 225px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    img {
        height: 90%;
        margin-right: 20px;
    }
`

const PaymentForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    border-radius: 5px;
    position: relative;
    margin-left: 20px;
    p {
        font-family: Roboto;
        font-size: 14px;
        font-weight: 400;
        line-height: 17px;
        color: #898989;
        margin-bottom: 5px;
    }
    div {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 50px;
        justify-content: space-between;
        align-items: center;
    }
    button {
        width: 182px;
        height: 37px;
        border-radius: 4px;
        font-family: Roboto;
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        text-align: center;
        color: #000000;
        background-color: #E0E0E0;
        box-shadow: 0px 2px 10px 0px #00000040;
        border: none;
        margin-top: 18px;
        position: absolute;
        bottom: -70px;
        left: -310px;
    }
`

const PaymentInput = styled.input`
    font-size: 20px;
    width: ${(props) => props.width ? props.width : '100%'};
    border-radius: 5px;
    outline: none;
    border: 1px solid #c2c0c0;
    height: 42px;
    color: #8E8E8E;
    padding: 10px;
    :focus {
        border: 2px solid #040202;
        //background-color: blueviolet;
    }
`