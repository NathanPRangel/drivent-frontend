import { Button, Typography } from "@mui/material";
import styled from 'styled-components';
import ErrorMessage from "./ErrorMessage";
import useEnrollment from "../../hooks/api/useEnrollment";
import { useState } from "react";
import useTicket from "../../hooks/api/useTicket";
import { toast } from 'react-toastify';
import { getUserTicket } from "../../services/ticketApi";


export default function Payment(props) {
  const { ticketReserved, setTicketReserved, refresh, setRefresh } = props
  const { enrollment, enrollmentError } = useEnrollment();

  const { createTicket } = useTicket();

  const [type, setType] = useState("presencial");
  const [hotel, setHotel] = useState("Sem Hotel");
  const [disabled, setDisabled] = useState(false);

  async function bookticket() {

    if (type === "presencial" && hotel === "Com Hotel") {
      try {
        await createTicket(1);
        toast('Ingresso reservado com sucesso!');
        setDisabled(true);
        setTicketReserved(true)
        //navigate('/sign-in');
      } catch (error) {
        toast('Não foi possível reservar o ingresso!');
        setDisabled(true);
      }
    } else if (type === "presencial" && hotel === "Sem Hotel") {
      try {
        await createTicket(2);
        toast('Ingresso reservado com sucesso!');
        setDisabled(true);
        setTicketReserved(true)
        //navigate('/sign-in');
      } catch (error) {
        toast('Não foi possível reservar o ingresso!');
      }

    } else if (type === "online") {
      try {
        await createTicket(3);
        toast('Ingresso reservado com sucesso!');
        setDisabled(true);
        setTicketReserved(true)
        //navigate('/sign-in');
      } catch (error) {
        toast('Não foi possível reservar o ingresso!');
      }

    }
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {enrollmentError ? (
        <ErrorMessage>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</ErrorMessage>
      ) : (
        <>
          <Information>Primeiro, escolha sua modalidade de ingresso</Information>

          <ButtonContainer>

            <StyledButton disabled={type === "presencial"} selected={type === "presencial"} onClick={() => {
              setType("presencial");
            }}>
              <Ticket>Presencial</Ticket>
              <Price>R$ 250</Price>

            </StyledButton>

            <StyledButton disabled={type === "online"} selected={type === "online"} onClick={() => {
              setType("online");
            }}>

              <Ticket>Online</Ticket>
              <Price>R$ 100</Price>

            </StyledButton>

          </ButtonContainer>

          {type === "presencial" ?

            <ContainerPresencial>

              <Information>Ótimo! Agora escolha sua modalidade de hospedagem</Information>

              <ButtonContainer>

                <StyledButton disabled={hotel === "Sem Hotel"} selected={hotel === "Sem Hotel"} onClick={() => {
                  setHotel("Sem Hotel");
                }}>
                  <Ticket>Sem Hotel</Ticket>
                  <Price>+ R$ 0</Price>

                </StyledButton>

                <StyledButton disabled={hotel === "Com Hotel"} selected={hotel === "Com Hotel"} onClick={() => {
                  setHotel("Com Hotel");
                }}>

                  <Ticket>Com Hotel</Ticket>
                  <Price>+ R$ 350</Price>

                </StyledButton>

              </ButtonContainer>

              {type === "presencial" && hotel === "Com Hotel" && (
                <Information>Fechado! O total ficou em R$ 600. Agora é só confirmar:</Information>
              )}

              {type === "presencial" && hotel === "Sem Hotel" && (
                <Information>Fechado! O total ficou em R$ 250. Agora é só confirmar:</Information>
              )}

              <NewButton1 onClick={bookticket} disabled={disabled}>RESERVAR INGRESSO</NewButton1>

            </ContainerPresencial>

            :

            <ContainerOnline>

              <Information>Fechado! O total ficou em R$ 100. Agora é só confirmar:</Information>

              <NewButton onClick={bookticket} disabled={disabled}>RESERVAR INGRESSO</NewButton>

            </ContainerOnline>

          }
        </>
      )}


    </>
  );
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

const ButtonContainer = styled.div`
  width: 305px;
  height:145px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 18px;
  margin-bottom:40px;
  gap: 15px;
`;
const StyledButton = styled.button`
  background-color: ${(props) => props.selected ? "#FFEED2" : "#ffff"}!important;
  width: 145px;
  height: 145px;
  border-radius: 20px;
  border: 1px solid #CECECE;
  gap:5px;
`;

const Ticket = styled.h1`
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  color: #454545;

`;

const Price = styled.p`
font-family: Roboto;
font-size: 14px;
font-weight: 400;
line-height: 16px;
letter-spacing: 0em;
text-align: center;
color: #898989;
  
`;

const ContainerPresencial = styled.div`
  
`;

const ContainerOnline = styled.div`
  
`;

const NewButton = styled.button`
  width: 162px;
  height: 37px;
  border-radius: 4px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: #000000;
  background-color: #E0E0E0;
  box-shadow: 0px 2px 10px 0px #00000040;
  border: none;
  margin-top: 18px;
`;

const NewButton1 = styled.button`
  width: 162px;
  height: 37px;
  border-radius: 4px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  color: #000000;
  background-color: #E0E0E0;
  box-shadow: 0px 2px 10px 0px #00000040;
  border: none;
  margin-top: 18px;
`;