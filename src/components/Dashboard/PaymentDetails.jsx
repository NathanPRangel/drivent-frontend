import { Typography } from "@mui/material";
import styled from 'styled-components';
import check from '../../assets/images/circle-check-fill.png'
import { useState } from "react";
import PaymentCard from "../Card";

export default function PaymentDetails(props) {
    const { ticketPaid, setTicketPaid, ticketTypeName, ticketPrice, ticketId, ticketStatus } = props
    const [paymentFinished, setPaymentFinished] = useState(false)

    return (
        <>
            <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
            <Information>Ingresso escolhido</Information>
            <Ticket>
                <h1>
                    {ticketTypeName}
                </h1>
                <h2>
                    R$ {ticketPrice}
                </h2>
            </Ticket>
            {ticketStatus === 'PAID'
                ?
                (
                    <>
                        <Information>Pagamento</Information>
                        <PaymentConfirmationContainer>
                            <img src={check} />
                            <div>
                                <h1>Pagamento confirmado!</h1>
                                <p>Prossiga para escolha de hospedagem e atividades</p>
                            </div>
                        </PaymentConfirmationContainer>
                    </>
                )
                :
                (
                    <>
                        <Information>Pagamento</Information>
                        <PaymentCard
                            ticketId={ticketId}
                            paymentFinished={paymentFinished}
                            setPaymentFinished={setPaymentFinished}
                            ticketPaid={ticketPaid}
                            setTicketPaid={setTicketPaid}
                        />

                    </>
                )}
        </>
    )
}

const StyledTypography = styled(Typography)`
    margin-bottom: 20px!important;
    font-family: Roboto;
    font-size: 34px;
    font-weight: 400;
    line-height: 40px;
    letter-spacing: 0em;
    text-align: left;
    color: #000000;
`;

const Information = styled.div`
    font-family: Roboto;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #8E8E8E;
`;

const Ticket = styled.div`
    width: 290px;
    height: 108px;
    background-color: #FFEED2;
    border-radius: 20px;
    margin: 12px 0px 20px 0px;
    padding: 33px 15px 33px 15px;
    h1 {
        font-family: Roboto;
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        text-align: center;
        color: #000000;
        margin-bottom: 8px;
    }
    h2 {
        font-family: Roboto;
        font-size: 14px;
        font-weight: 400;
        line-height: 17px;
        text-align: center;
        color: #898989;
    }
`

const PaymentContainer = styled.div`
    width: 700px;
    height: 225px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    img {
        height: 90%;
        margin-right: 20px;
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
const PaymentForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    border-radius: 5px;
    position: relative;
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
        left: -323px;
    }
`
const PaymentConfirmationContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 15px;
    img {
        width: 44px;
    }
    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin-left: 10px;
        h1 {
            font-family: Roboto;
            font-weight: 700;
            font-size: 16px;
            line-height: 19px;
            color: #454545
        }
        p {
            font-family: Roboto;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            color: #454545;
        }
    }
`