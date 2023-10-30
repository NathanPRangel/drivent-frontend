import React from 'react';
import styled from 'styled-components';
import html2pdf from 'html2pdf.js';
import { Typography } from "@mui/material";
import "../../../assets/styles/style.css?inline";
import image from "../../../assets/images/image 2.png";
import { useContext, useEffect } from 'react';
import UserContext from '../../../contexts/UserContext';
import EventInfoContext from '../../../contexts/EventInfoContext';
import useGetTicket from "../../../hooks/api/useGetTicket";
import useEnrollment from '../../../hooks/api/useEnrollment';
import useActivity from '../../../hooks/api/useActivity';
import ErrorMessage from "../../../components/Dashboard/ErrorMessage";

const CertificateButton = styled.button`
    width: 175px;
    height: 37px;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0px 2px 10px 0px #00000040;
    border: none;
    background-color: #E0E0E0;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: center;
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
    margin-bottom: 18px;
`;

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

const CertificateContent = styled.div`
  text-align: center;
  padding: 20px;
  border: 2px solid #333;
  border-radius: 5px;
  margin-bottom: 20px;

  h1 {
    color: #333;
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    color: #555;
    font-size: 16px;
  }
`;

const Certificate = () => {

  const { getUserTicket } = useGetTicket();
  const { getEnrollment } = useEnrollment();
  const { getActivitiesByUser } = useActivity();
  const { nome, setNome, cpf, setCPF, modalidade, setModalidade, atividades, setAtividades } = useContext(UserContext);
  const { eventInfo } = useContext(EventInfoContext);

  useEffect(() => {
    async function data() {
      try {
        const userTicket = await getUserTicket();
        const enrollment = await getEnrollment();
        const activities = await getActivitiesByUser();
        console.log(activities.length > 5, "atividades");
        let word = userTicket.TicketType.name.split(" ");
        let firstWord = word[0].charAt(0).toLowerCase() + word[0].slice(1);
        setModalidade(firstWord);
        setNome(enrollment.name);
        setCPF(enrollment.cpf);
        setAtividades(activities);
      } catch (err) {
        console.log(err)
      }
    }
    data()
  }, [])

  const today = new Date();
  //const oneDayAfterEvent = new Date(eventInfo.startsAt);
  const oneDayAfterEvent = new Date(eventInfo.endsAt);
  oneDayAfterEvent.setDate(oneDayAfterEvent.getDate() + 1);

  const isCertificateAvailable = today >= oneDayAfterEvent;

  function formatarCPF(cpf) {
    if (cpf.length !== 11) {
      return cpf;
    } else {

      return (
        cpf.substring(0, 3) +
        '.' +
        cpf.substring(3, 6) +
        '.' +
        cpf.substring(6, 9) +
        '-' +
        cpf.substring(9, 11)
      );
    }
  }

  const cpfFormatado = formatarCPF(cpf);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  const dataInicialFormatada = formatDate(eventInfo.startsAt);
  const dataFinalFormatada = formatDate(eventInfo.endsAt);

  const generatePDF = () => {
    const opt = {
      margin: 0,
      filename: 'certificate.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };

    const content = `
    <div class="container">

        <div class="style"></div>

        <div style="flex: 1; text-align: center;">
            <h1 class="certificate-title">CERTIFICADO</h1>
            <p class="certificate-text">Certificamos, para todos os devidos fins, de que a(o):</p>
            <p class="certificate-name">${nome}</p>
            <p class="certificate-description">Com documento ${cpfFormatado} participou do evento ${eventInfo.title}, de forma ${modalidade}, entre os dias ${dataInicialFormatada} e ${dataFinalFormatada}.</p>
            <img src="${image}" class="image" />
        </div>
        
    </div>
    `;

    html2pdf().from(content).set(opt).save();
  };

  return (
    <>
    <StyledTypography variant="h4">Certificado</StyledTypography>
  
    {isCertificateAvailable && (
      <>
        {modalidade === "presencial" && atividades.length < 5 ? (
          <ErrorMessage>Você não fez o mínimo de atividades exigidas para ganhar o certificado!</ErrorMessage>
        ) : (
          <>
            <Information>Clique no botão abaixo para gerar seu certificado de participação.</Information>
            <CertificateButton onClick={generatePDF}>GERAR CERTIFICADO</CertificateButton>
          </>
        )}
      </>
    )}
  
    {!isCertificateAvailable && (
      <ErrorMessage>O certificado estará disponível apenas 1 dia após a realização do evento.</ErrorMessage>
    )}
  </>
  
  );
};

export default Certificate;