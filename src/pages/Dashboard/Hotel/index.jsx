import { useEffect, useState } from 'react';
import useTicket from '../../../hooks/api/useTicket';
import useBooking from '../../../hooks/api/useBooking';
import useHotelRooms from '../../../hooks/api/useHotelRooms';
import useHotels from '../../../hooks/api/useHotels';
import BookingSummary from '../../../components/Dashboard/Hotel/BookingSummary';
import ErrorMessage from '../../../components/Dashboard/ErrorMessage';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import HotelBtn from '../../../components/Dashboard/Hotel/HotelBtn';
import RoomBtn from '../../../components/Dashboard/Hotel/RoomBtn';
import { toast } from 'react-toastify';
import usePutBooking from '../../../hooks/api/usePutBooking';

export default function Hotel() {
  const { userTicket } = useTicket();
  const [selectedHotel, setSelectedHotel] = useState();
  const [selectedRoom, setSelectedRoom] = useState();
  const [bookingId, setBookingId] = useState();
  const [changingBooking, setChangingBooking] = useState();

  const { userBooking, getUserBooking, bookRoom, bookRoomLoading, bookRoomError, postBookRoom } = useBooking(selectedRoom);
  const { hotels, hotelError } = useHotels();
  const { hotelWithRooms, hotelWithRoomsLoading, hotelWithRoomsError, getHotelWithRooms } = useHotelRooms(selectedHotel);
  const { bookRoomUpdated, putBookRoom } = usePutBooking(bookingId, selectedRoom);

  useEffect(() => {
    if (selectedHotel) {
      getHotelWithRooms();
    }

    if (userBooking) {
      setSelectedRoom(userBooking?.Room.id);
    }

  }, [selectedHotel, bookRoom, bookRoomError])

  return (
    <>
      <StyledTypography variant='h4'>Escolha de hotel e quarto</StyledTypography>
      {
        (userBooking && !changingBooking) ?
          <BookingSummary
            userBooking={userBooking}
            setChangingBooking={setChangingBooking}
            setSelectedRoom={setSelectedRoom}
            setSelectedHotel={setSelectedHotel}
            setBookingId={setBookingId}
          />
          :
          userTicket && (!userTicket.TicketType.includesHotel || userTicket.TicketType.isRemote) ?
            <ErrorMessage>Sua modalidade de ingresso não inclui hospedagem Prossiga para a escolha de atividades</ErrorMessage>
            :
            hotelError ?
              <ErrorMessage>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</ErrorMessage>
              :
              hotels ?
                <>
                  <HotelContainer>
                    {
                      hotels.map(hotel => (
                        <HotelBtn
                          key={hotel.id}
                          hotel={hotel}
                          selectedHotel={selectedHotel}
                          setSelectedHotel={setSelectedHotel}
                        />
                      ))
                    }
                  </HotelContainer>

                  {
                    selectedHotel ?
                      <>
                        <Information>Ótima pedida! Agora escolha seu quarto</Information>
                        {
                          hotelWithRooms ?
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

                  {
                    selectedRoom ?
                      <ActionBtn
                        disabled={bookRoomLoading}
                        onClick={async () => {
                          try {
                            await (changingBooking ? putBookRoom() : postBookRoom());
                            await getUserBooking();
                            setChangingBooking(false);
                            toast('Reserva realizada com sucesso!');
                          } catch (error) {
                            toast('Você já possui uma reserva neste quarto!');
                          }
                        }}
                      >
                        RESERVAR QUARTO
                      </ActionBtn>
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

export const Information = styled.div`
  color: #8E8E8E;
  font-family: Roboto;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const HotelContainer = styled.div`
  margin-top: 18px;
  margin-bottom:40px;
  display: flex;
  gap: 19px;
  flex-wrap: wrap;
`;

export const Name = styled.h1`
  font-size: 20px;
  font-weight: 400;
  margin: 10px 0px;
`;

export const Title = styled.h2`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 2px;
  `;

export const Data = styled.p`
  font-size: 12px;
  font-weight: 400;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ActionBtn = styled.button`
  width: 182px;
  height: 37px;
  border-radius: 4px;
  border: none;
  background-color: #E0E0E0;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  
  color: #000;
  text-align: center;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  };
`;