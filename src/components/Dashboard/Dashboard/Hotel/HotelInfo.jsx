import styled from 'styled-components';
import useHotels from '../../../hooks/api/useHotels'
import { Typography } from '@mui/material';
import { useState } from 'react';
import ErrorMessage from '../ErrorMessage';

export default function Hotel() {
  const { hotels, hotelError } = useHotels();
  const [selectedHotel, setSelectedHotel] = useState();

  return (
    <>
      <StyledTypography variant='h4'>Escolha de hotel e quarto</StyledTypography>
      {
        hotelError ? 
        <ErrorMessage>Ocorreu um erro!</ErrorMessage>
        :
          hotels ? 
            <>        
              <Information>Primeiro, escolha seu hotel</Information>
              <HotelContainer>
                { hotels.map(hotel => (
                    <HotelButton 
                      key={hotel.id}
                      disabled={selectedHotel === hotel.id}
                      onClick={() => setSelectedHotel(hotel.id)}
                    >
                      <img src={hotel.image} alt={hotel.name} />
                      <Name>{hotel.name}</Name>
                      <Details>
                        <div>
                          <Title>Tipos de acomodação:</Title>
                          <Data>{hotel.accommodations}</Data>
                        </div>
                        <div>
                          <Title>Vagas Disponíveis:</Title>
                          <Data>{hotel.capacityAvailable}</Data>
                        </div>
                      </Details>
                    </HotelButton>
                  ))
                }
              </HotelContainer>
            </>
        : <></>
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const Information = styled.div`
  color: #8E8E8E;
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const HotelContainer = styled.div`
  margin-top: 18px;
  margin-bottom:40px;
  display: flex;
  gap: 19px;
  flex-wrap: wrap;
`;

const HotelButton = styled.button`
  width: 196px;
  height: 264px;
  padding: 16px 14px;
  border: none;
  outline: none;
  border-radius: 10px;

  background-color: #EBEBEB;
  
  &:disabled {
    background-color: #FFEED2;
  };

  color: #343434;
  font-family: Roboto;
  font-style: normal;
  line-height: normal;
  font-weight: 400 !important;

  text-align: start;
  
  img {
    width: 100%;
    height: 109px;
    border-radius: 5px;
  }
`;

const Name = styled.h1`
  font-size: 20px;
  margin: 10px 0px;
`;

const Title = styled.h2`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 2px;
  `;

const Data = styled.p`
  font-size: 12px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
