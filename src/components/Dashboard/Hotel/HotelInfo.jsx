import styled from 'styled-components';
import useHotels from '../../../hooks/api/useHotels'
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ErrorMessage from '../ErrorMessage';
import useHotelRooms from '../../../hooks/api/useHotelRooms';
import { BsPerson, BsPersonFill } from 'react-icons/bs'
import useTicket from '../../../hooks/api/useTicket';
import RoomBtn from './RoomBtn';

export default function Hotel() {
  const { userTicket } = useTicket();
  const { hotels, hotelError } = useHotels();
  const [selectedHotel, setSelectedHotel] = useState();
  const { hotelWithRooms, hotelWithRoomsLoading, hotelWithRoomsError, getHotelWithRooms } = useHotelRooms(selectedHotel);
  const [selectedRoom, setSelectedRoom] = useState();

  useEffect(() => {
    if(selectedHotel) {
      getHotelWithRooms();
    }

  }, [selectedHotel])

  return (
    <>
      <StyledTypography variant='h4'>Escolha de hotel e quarto</StyledTypography>
      {
        userTicket && (!userTicket.TicketType.includesHotel || userTicket.TicketType.isRemote) ? 
          <ErrorMessage>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</ErrorMessage>
        : hotelError ?
          <ErrorMessage>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</ErrorMessage>
        :
          hotels ? 
            <>        
              <Information>Primeiro, escolha seu hotel</Information>
              <HotelContainer>
                { hotels.map(hotel => (
                    <HotelButton 
                      key={hotel.id}
                      disabled={selectedHotel === hotel.id}
                      onClick={() => {
                        setSelectedHotel(hotel.id);
                        () => getHotelWithRooms(hotel.id);
                      } 
                    }
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

              { selectedHotel ? 
                <>
                  <Information>Ótima pedida! Agora escolha seu quarto</Information>
                    { hotelWithRooms ? 
                        <HotelContainer>
                          { 
                            hotelWithRooms.Rooms.map(room => (
                              <RoomBtn 
                                key={room.id}
                                selectedRoom={selectedRoom}
                                setSelectedRoom={setSelectedRoom}
                                room={room}
                              />
                            ))
                          }
                        </HotelContainer>
                      : <></>
                    }
                </>
                : <></>
              }
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

const RoomButton = styled.button`
  width: 190px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 11px;

  border-radius: 10px;
  border: 1px solid #CECECE;
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
